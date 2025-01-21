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
      locations: [],
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
    const newLocationsArray = []

    // GET measurements
    const measurementsResponse = await fetch('https://schoolapi.adwinzijderveld.nl/api/metingen')
    const newMeasurements = await measurementsResponse.json()
    newMeasurements.forEach((measurement) => {
      newMeasurementsArray.push({
        deveui: measurement.deveui,
        tijdstempel: measurement.tijdstempel,
        waarde: JSON.parse(measurement.waarde),
      })
    })
    console.log(newMeasurementsArray)

    // GET buoys
    const buoysResponse = await fetch('https://schoolapi.adwinzijderveld.nl/api/boeien')
    newBuoysArray.push(...(await buoysResponse.json()))

    // GET deployments
    const deploymentsResponse = await fetch('https://schoolapi.adwinzijderveld.nl/api/deployments')
    newDeploymentsArray.push(...(await deploymentsResponse.json()))

    //GET locaties
    const locationsResponse = await fetch('https://schoolapi.adwinzijderveld.nl/api/locaties')
    newLocationsArray.push(...(await locationsResponse.json()))

    this.measurements = newMeasurementsArray
    this.buoys = newBuoysArray
    this.deployments = newDeploymentsArray
    this.locations = newLocationsArray

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
