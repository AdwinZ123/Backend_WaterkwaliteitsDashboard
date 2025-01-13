<template>
  <!-- Sidebar filter menu -->
  <v-navigation-drawer location="right" permanent class="w-auto">
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
      buoys: [
        {
          naam: 'Betere boei',
          deveui: 'AF-01-HB-39-JI',
        },
        {
          naam: 'Boei 1',
          deveui: 'GG-99-HB-41-KL',
        },
      ],
      deployments: [
        {
          deveui: 'AF-01-HB-39-JI',
          plaatsingsdatum: '2024-01-01T12:00:00',
          ophaaldatum: '2024-03-01T12:00:00',
          locatie: '23.14587,-31.36589',
          configuraties: [
            {
              deveui: 'AF-01-HB-39-JI',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 1,
              sensor: {
                id: 1,
                type: 'zuurstof',
              },
              grenswaarden: {
                deveui: 'AF-01-HB-39-JI',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 1,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'AF-01-HB-39-JI',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 2,
              sensor: {
                id: 2,
                type: 'temperatuur',
              },
              grenswaarden: {
                deveui: 'AF-01-HB-39-JI',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 2,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'AF-01-HB-39-JI',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 3,
              sensor: {
                id: 3,
                type: 'troebelheid',
              },
              grenswaarden: {
                deveui: 'AF-01-HB-39-JI',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 3,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'AF-01-HB-39-JI',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 4,
              sensor: {
                id: 4,
                type: 'elektrische_geleiding',
              },
              grenswaarden: {
                deveui: 'AF-01-HB-39-JI',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 4,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'AF-01-HB-39-JI',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 5,
              sensor: {
                id: 5,
                type: 'pH',
              },
              grenswaarden: {
                deveui: 'AF-01-HB-39-JI',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 5,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
          ],
        },
        {
          deveui: 'GG-99-HB-41-KL',
          plaatsingsdatum: '2024-01-01T12:00:00',
          ophaaldatum: null,
          locatie: '22.14587,-30.36589',
          configuraties: [
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 6,
              sensor: {
                id: 6,
                type: 'zuurstof',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 6,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 7,
              sensor: {
                id: 7,
                type: 'temperatuur',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 7,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 8,
              sensor: {
                id: 8,
                type: 'troebelheid',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 8,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 9,
              sensor: {
                id: 9,
                type: 'elektrische_geleiding',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 9,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2024-01-01T12:00:00',
              id: 10,
              sensor: {
                id: 10,
                type: 'pH',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2024-01-01T12:00:00',
                id: 10,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
          ],
        },
        {
          deveui: 'GG-99-HB-41-KL',
          plaatsingsdatum: '2023-01-01T12:00:00',
          ophaaldatum: '2023-10-10T12:00:00',
          locatie: '23.14587,-31.36589',
          configuraties: [
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2023-01-01T12:00:00',
              id: 6,
              sensor: {
                id: 6,
                type: 'zuurstof',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2023-01-01T12:00:00',
                id: 6,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2023-01-01T12:00:00',
              id: 7,
              sensor: {
                id: 7,
                type: 'temperatuur',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2023-01-01T12:00:00',
                id: 7,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2023-01-01T12:00:00',
              id: 8,
              sensor: {
                id: 8,
                type: 'troebelheid',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2023-01-01T12:00:00',
                id: 8,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2023-01-01T12:00:00',
              id: 9,
              sensor: {
                id: 9,
                type: 'elektrische_geleiding',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2023-01-01T12:00:00',
                id: 9,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
            {
              deveui: 'GG-99-HB-41-KL',
              plaatsingsdatum: '2023-01-01T12:00:00',
              id: 10,
              sensor: {
                id: 10,
                type: 'pH',
              },
              grenswaarden: {
                deveui: 'GG-99-HB-41-KL',
                plaatsingsdatum: '2023-01-01T12:00:00',
                id: 10,
                slechtboven: 30.3,
                goedboven: 25.0,
                goedonder: 20.5,
                slechtonder: 18.4,
              },
            },
          ],
        },
      ],
      measurements: [
        {
          deveui: 'AF-01-HB-39-JI',
          tijdstempel: '2024-01-10T12:00:00',
          waarde: {
            temperatuur: 24.1,
            pH: 7.6,
            elektrische_geleiding: 500,
            troebelheid: 430,
            zuurstof: 3.4,
          },
        },
        {
          deveui: 'AF-01-HB-39-JI',
          tijdstempel: '2024-02-10T12:00:00',
          waarde: {
            temperatuur: 20.7,
            pH: 6.9,
            elektrische_geleiding: 800,
            troebelheid: 200,
            zuurstof: 1.2,
          },
        },
        {
          deveui: 'AF-01-HB-39-JI',
          tijdstempel: '2024-02-10T18:34:00',
          waarde: {
            temperatuur: 24.1,
            pH: 7.6,
            elektrische_geleiding: 500,
            troebelheid: 430,
            zuurstof: 3.4,
          },
        },
        {
          deveui: 'GG-99-HB-41-KL',
          tijdstempel: '2024-01-10T12:00:00',
          waarde: {
            temperatuur: 24.1,
            pH: 7.6,
            elektrische_geleiding: 500,
            troebelheid: 430,
            zuurstof: 8.4,
          },
        },
        {
          deveui: 'GG-99-HB-41-KL',
          tijdstempel: '2024-02-10T12:00:00',
          waarde: {
            temperatuur: 20.7,
            pH: 6.9,
            elektrische_geleiding: 800,
            troebelheid: 200,
            zuurstof: -1.2,
          },
        },
        {
          deveui: 'GG-99-HB-41-KL',
          tijdstempel: '2024-02-10T18:34:00',
          waarde: {
            temperatuur: 24.1,
            pH: 7.6,
            elektrische_geleiding: 500,
            troebelheid: 430,
            zuurstof: 5,
          },
        },
        {
          deveui: 'GG-99-HB-41-KL',
          tijdstempel: '2023-02-10T18:34:00',
          waarde: {
            temperatuur: 24.1,
            pH: 7.6,
            elektrische_geleiding: 500,
            troebelheid: 430,
            zuurstof: 5,
          },
        },
        {
          deveui: 'GG-99-HB-41-KL',
          tijdstempel: '2023-04-10T18:34:00',
          waarde: {
            temperatuur: 24.1,
            pH: 7.6,
            elektrische_geleiding: 500,
            troebelheid: 430,
            zuurstof: 5,
          },
        },
      ],
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
  mounted() {
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
