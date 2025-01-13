<template>
  <div v-if="isPageDataLoaded">
    <v-row dense no-gutters>
      <h1>Boeien beheren</h1>
      &nbsp;&nbsp;&nbsp;
      <CreateBuoyDialog :addBuoy="addBuoy" />
    </v-row>
    <br />

    <BuoyDetailsBody
      v-for="buoy in buoys"
      :key="buoy.deveui"
      :buoy="buoy"
      :deployments="deployments.filter((d) => d.deveui === buoy.deveui)"
      :updateBuoyName="updateBuoyName"
      :updateDeploymentPickUpDate="updateDeploymentPickUpDate"
      :addDeployment="addDeployment"
      :replaceBuoy="replaceBuoy"
      :updateLimitValue="updateLimitValue"
    />
  </div>
</template>

<script>
import { getCurrentDateTimeString } from '@/helper'
import BuoyDetailsBody from '@/components/buoys/BuoyDetailsBody.vue'
import CreateBuoyDialog from '@/components/dialogs/CreateBuoyDialog.vue'

export default {
  components: { BuoyDetailsBody, CreateBuoyDialog },
  data() {
    return {
      isPageDataLoaded: false,
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
      ],
    }
  },
  methods: {
    addBuoy(buoy) {
      this.buoys.push(buoy)
    },
    updateLimitValue(configuration, badUpperLimit, goodUpperLimit, goodLowerLimit, badLowerLimit) {
      const deployment = this.deployments.find(
        (d) =>
          d.deveui === configuration.deveui && d.plaatsingsdatum === configuration.plaatsingsdatum,
      )
      const configurationToUpdate = deployment.configuraties.find(
        (c) =>
          c.id === configuration.id &&
          c.deveui === configuration.deveui &&
          c.plaatsingsdatum === configuration.plaatsingsdatum,
      )

      configurationToUpdate.grenswaarden.slechtboven = badUpperLimit
      configurationToUpdate.grenswaarden.goedboven = goodUpperLimit
      configurationToUpdate.grenswaarden.goedonder = goodLowerLimit
      configurationToUpdate.grenswaarden.slechtonder = badLowerLimit
    },
    replaceBuoy(deveuiOldBuoy, deveuiNewBuoy) {
      const currentDeployment = this.deployments.filter(
        (d) => d.deveui === deveuiOldBuoy && d.ophaaldatum === null,
      )[0]

      const currentDateTimeString = getCurrentDateTimeString()

      const newDeployment = {
        deveui: deveuiNewBuoy,
        plaatsingsdatum: currentDateTimeString,
        ophaaldatum: null,
        locatie: currentDeployment.locatie,
        configuraties: [],
      }

      currentDeployment.configuraties.forEach((config) => {
        const newConfiguration = {
          deveui: deveuiNewBuoy,
          plaatsingsdatum: currentDateTimeString,
          id: config.id,
          sensor: {
            id: config.id,
            type: config.sensor.type,
          },
          grenswaarden: {
            deveui: deveuiNewBuoy,
            plaatsingsdatum: currentDateTimeString,
            id: config.id,
            slechtboven: config.grenswaarden.slechtboven,
            goedboven: config.grenswaarden.goedboven,
            goedonder: config.grenswaarden.goedonder,
            slechtonder: config.grenswaarden.slechtonder,
          },
        }

        newDeployment.configuraties.push(newConfiguration)
      })

      this.addDeployment(newDeployment)
      this.updateDeploymentPickUpDate(deveuiOldBuoy)
    },
    updateBuoyName(deveui, newName) {
      this.buoys.find((b) => b.deveui === deveui).naam = newName
    },
    addDeployment(newDeployment) {
      this.deployments.unshift(newDeployment)
    },
    updateDeploymentPickUpDate(deveui) {
      this.deployments.find((d) => d.deveui === deveui && d.ophaaldatum === null).ophaaldatum =
        getCurrentDateTimeString()
    },
  },
  mounted() {
    this.isPageDataLoaded = true
  },
}
</script>
