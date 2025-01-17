<template>
  <!-- Overlay met loading symbool -->
  <v-overlay :value="!isPageDataLoaded">
    <v-progress-circular indeterminate size="70" color="primary" />
  </v-overlay>

  <!-- Sidebar filter menu -->
  <v-navigation-drawer v-if="isPageDataLoaded" location="right" permanent class="w-auto">
    <!-- Boei selecteren -->
    <v-container>
      <h3>Boeien</h3>
      <v-select
        v-model="selectedItem"
        :items="buoys"
        label="Selecteer een boei"
        item-title="naam"
        item-value="deveui"
        v-on:update:model-value="onSelectChange"
      ></v-select>
      <br />

      <!-- Locatie selecteren -->
      <h3>Locaties</h3>
      <MapLocationViewer :locations="locations" :onSelectLocationChange="onSelectLocationChange" />
    </v-container>
  </v-navigation-drawer>

  <!-- Main body -->
  <v-container v-if="isPageDataLoaded" class="overflow-x-auto">
    <div v-if="showSelectedBuoyInfo">
      <h1>{{ selectedBuoy.naam }}</h1>
      <p>Apparaat ID: {{ selectedBuoy.deveui }}</p>

      <br />

      <h2>Plaatsingen</h2>
      <DeploymentViewBody
        v-for="(deployment, index) in selectedDeployments"
        :key="index"
        :buoy="selectedBuoy"
        :deployment="deployment"
        :measurements="measurements"
      />
    </div>
    <div v-else>
      <h1>Locatie {{ selectedLocation.locatie }}</h1>
      <LocationViewBody
        :deployments="selectedDeployments"
        :measurements="measurements"
        :buoys="buoys"
      />
    </div>
  </v-container>
</template>

<script>
import LocationViewBody from '@/components/locations/LocationViewBody.vue'
import DeploymentViewBody from '@/components/deployments/DeploymentViewBody.vue'
import MapLocationViewer from '@/components/maps/MapLocationViewer.vue'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  components: { DeploymentViewBody, MapLocationViewer, LocationViewBody },
  data() {
    return {
      showSelectedBuoyInfo: true,
      isPageDataLoaded: false,
      selectedItem: null,
      selectedBuoy: null,
      selectedDeployments: [],
      buoys: [],
      deployments: [],
      measurements: [],
      locations: [
        {
          locatie: '23.14587,-31.36589',
          statusColor: 'green',
        },
        {
          locatie: '22.14587,-30.36589',
          statusColor: 'orange',
        },
      ],
      selectedLocation: null,
    }
  },
  methods: {
    onSelectLocationChange(locatie) {
      this.showSelectedBuoyInfo = false
      this.selectedItem = null
      this.selectedBuoy = null

      this.selectedLocation = locatie
      this.selectedDeployments = this.deployments.filter(
        (deployment) => deployment.locatie === this.selectedLocation.locatie,
      )
    },
    onSelectChange() {
      this.selectedBuoy = this.buoys.filter((boei) => boei.deveui === this.selectedItem)[0]
      this.selectedDeployments = this.deployments.filter(
        (deployment) => deployment.deveui === this.selectedItem,
      )

      this.showSelectedBuoyInfo = true
    },
  },
  async mounted() {
    // API calls for all data
    const newMeasurementsArray = []
    const newBuoysArray = []
    const newDeploymentsArray = []

    // GET measurements
    const measurementsResponse = await fetch('http://20.56.155.132:5000/api/metingen')
    const newMeasurements = await measurementsResponse.json()
    newMeasurements.forEach((measurement) => {
      newMeasurementsArray.push({
        deveui: measurement.deveui,
        tijdstempel: measurement.tijdstempel,
        waarde: JSON.parse(measurement.waarde),
      })
    })

    // GET buoys
    const buoysResponse = await fetch('http://20.56.155.132:5000/api/boeien')
    const newBuoys = await buoysResponse.json()
    newBuoys.forEach((buoy) => newBuoysArray.push(buoy))

    // GET deployments
    const deploymentsResponse = await fetch('http://20.56.155.132:5000/api/deployments')
    const newDeployments = await deploymentsResponse.json()
    newDeployments.forEach((deployment) => newDeploymentsArray.push(deployment))

    this.measurements = newMeasurementsArray
    this.buoys = newBuoysArray
    this.deployments = newDeploymentsArray

    //TODO GET locaties API call

    // Selecteer het eerste item bij het laden van de component
    if (this.buoys.length > 0) {
      this.selectedItem = this.buoys[0].deveui
      this.selectedBuoy = this.buoys[0]

      this.selectedDeployments = this.deployments.filter(
        (deployment) => deployment.deveui === this.selectedItem,
      )
    }

    this.isPageDataLoaded = true
  },
}
</script>
