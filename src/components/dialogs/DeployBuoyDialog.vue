<template>
  <v-btn density="default" rounded="xl" variant="flat" color="grey" @click="onActivate"
    >Plaatsen</v-btn
  >

  <!-- Boei plaatsen -->
  <v-dialog v-model="isDialogActive" persistent class="w-50 h-100">
    <v-card title="Boei plaatsen">
      <v-sheet class="pa-12" rounded>
        <v-form v-model="form">
          <p class="text-h6">Naam</p>
          <p class="text-subtitle-1">{{ buoy.naam }}</p>

          <p class="text-h6">Apparaat id</p>
          <p class="text-subtitle-1">{{ buoy.deveui }}</p>

          <p class="text-h6">Locatie</p>
          <div id="layout">
            <div id="sidebar">
              Longitude: {{ location.lng.toFixed(4) }} | Latitude: {{ location.lat.toFixed(4) }} |
              Zoom: {{ location.zoom.toFixed(2) }}
              |
              <template v-if="location.bearing">
                Bearing: {{ location.bearing.toFixed(2) }} |
              </template>
              <template v-if="location.pitch"> Pitch: {{ location.pitch.toFixed(2) }} | </template>
            </div>
            <MapLocationPicker v-model="location" />
          </div>

          <p class="text-h6">Sensoren</p>
          <v-row dense no-gutters>
            <v-select
              v-model="selectedItem"
              :items="sensorTypes"
              :readonly="isLoading"
              label="Selecteer type"
              item-title="naam"
              item-value="type"
            ></v-select>
            &nbsp;&nbsp;
            <v-btn
              text="Nieuwe toevoegen"
              density="default"
              rounded="xl"
              variant="flat"
              color="grey"
              :loading="isLoading"
              @click="onSensorToevoegen"
            ></v-btn>
          </v-row>

          <p v-if="sensorOptions.length === 0">Voeg een nieuwe sensor toe</p>
          <div v-for="sensor in sensorOptions" :key="sensor">
            <v-switch
              :label="sensor.naam"
              v-model="sensor.enabled"
              hide-details
              color="success"
            ></v-switch>
          </div>
        </v-form>
      </v-sheet>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Annuleer"
          density="default"
          rounded="xl"
          variant="flat"
          color="grey"
          @click="onClose"
        ></v-btn>
        <v-btn
          :disabled="!form"
          :loading="isLoading"
          text="Plaatsen"
          density="default"
          rounded="xl"
          variant="flat"
          color="grey"
          @click="onSubmit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getCurrentDateTimeString, required, getSensorTypeInfo } from '@/helper'
import MapLocationPicker from '@/components/maps/MapLocationPicker.vue'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  components: { MapLocationPicker },
  props: ['buoy', 'addDeployment'],
  data() {
    return {
      location: {
        lng: 23.988634,
        lat: -31.554709,
        bearing: 0,
        pitch: 0,
        zoom: 9,
      },
      form: false,
      isLoading: false,
      isDialogActive: false,
      selectedItem: null,
      standardLimitValues: [],
      sensorTypes: [],
      sensorOptions: [],
      availableSensors: [
        { id: 11, type: 'pH' },
        { id: 12, type: 'troebelheid' },
        { id: 13, type: 'temperatuur' },
      ],
    }
  },
  methods: {
    onSensorToevoegen() {
      if (this.selectedItem === null) {
        return
      }

      this.sensorOptions.push({
        id: null,
        type: this.selectedItem,
        enabled: true,
        naam: getSensorTypeInfo(this.selectedItem).displayName,
      })

      this.selectedItem = null
    },
    onActivate() {
      this.sensorOptions = []
      this.location = {
        lng: 23.988634,
        lat: -31.554709,
        bearing: 0,
        pitch: 0,
        zoom: 9,
      }

      this.availableSensors.forEach((sensor) => {
        const sensorInfo = getSensorTypeInfo(sensor.type)

        this.sensorOptions.push({
          id: sensor.id,
          type: sensor.type,
          enabled: false,
          naam: sensorInfo.displayName,
        })
      })

      this.isDialogActive = true
    },
    onSubmit() {
      if (!this.form) return

      const selectedSensors = this.sensorOptions.filter((sensor) => sensor.enabled === true)
      if (selectedSensors.length === 0) {
        this.form = false
        return
      }

      this.isLoading = true

      const selectedDeveui = this.buoy.deveui
      const currentDateTimeString = getCurrentDateTimeString()

      const newDeployment = {
        deveui: selectedDeveui,
        plaatsingsdatum: currentDateTimeString,
        ophaaldatum: null,
        locatie: this.location.lng + ',' + this.location.lat,
        configuraties: [],
      }

      selectedSensors.forEach((sensor, i) => {
        let id = sensor.id
        if (id == null) {
          id = 999 - i
        }

        //TODO create sensor API call
        // POST https://schoolapi.adwinzijderveld.nl/api/sensoren {"type": 'mijn waarde'}

        const selectedStandardLimitValue = this.standardLimitValues.find(
          (limitValue) => limitValue.type === sensor.type,
        )

        const configuration = {
          deveui: selectedDeveui,
          plaatsingsdatum: currentDateTimeString,
          id: id,
          sensor: {
            id: id,
            type: sensor.type,
          },
          grenswaarden: {
            deveui: selectedDeveui,
            plaatsingsdatum: currentDateTimeString,
            id: id,
            slechtboven: selectedStandardLimitValue.slechtboven,
            goedboven: selectedStandardLimitValue.goedboven,
            goedonder: selectedStandardLimitValue.goedonder,
            slechtonder: selectedStandardLimitValue.slechtonder,
          },
        }

        newDeployment.configuraties.push(configuration)
      })

      this.addDeployment(newDeployment)
      this.onClose()
    },
    onClose() {
      this.isLoading = false
      this.isDialogActive = false
    },
    required,
  },
  async mounted() {
    // API calls for all data
    const newStandardLimitValuesArray = []

    // GET standard limit values
    const standardLimitValuesResponse = await fetch(
      'https://schoolapi.adwinzijderveld.nl/api/standaard-grenswaarden',
    )
    const newStandardLimitValues = await standardLimitValuesResponse.json()
    newStandardLimitValues.forEach((standardLimitValue) =>
      newStandardLimitValuesArray.push(standardLimitValue),
    )

    //TODO GET beschikbare sensoren API call
    // https://schoolapi.adwinzijderveld.nl/api/beschikbare-sensoren

    this.standardLimitValues = newStandardLimitValuesArray

    this.standardLimitValues.forEach((limitValue) => {
      const sensorInfo = getSensorTypeInfo(limitValue.type)

      this.sensorTypes.push({
        naam: sensorInfo.displayName,
        type: limitValue.type,
      })
    })
  },
}
</script>
