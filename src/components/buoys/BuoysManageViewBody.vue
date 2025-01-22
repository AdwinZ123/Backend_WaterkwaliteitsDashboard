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
      buoys: [],
      deployments: [],
    }
  },
  methods: {
    async addBuoy(buoy) {
      this.buoys.push(buoy)

      // Create buoy API call
      try {
        await fetch('https://schoolapi.adwinzijderveld.nl/api/boeien', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(buoy),
        })
      } catch (error) {
        console.error(error)
      }
    },
    async updateLimitValue(
      configuration,
      badUpperLimit,
      goodUpperLimit,
      goodLowerLimit,
      badLowerLimit,
    ) {
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

      configurationToUpdate.grenswaarden.slechtboven = parseFloat(badUpperLimit)
      configurationToUpdate.grenswaarden.goedboven = parseFloat(goodUpperLimit)
      configurationToUpdate.grenswaarden.goedonder = parseFloat(goodLowerLimit)
      configurationToUpdate.grenswaarden.slechtonder = parseFloat(badLowerLimit)

      // Update limit values API call
      try {
        await fetch('https://schoolapi.adwinzijderveld.nl/api/grenswaarden', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(configurationToUpdate.grenswaarden),
        })
      } catch (error) {
        console.error(error)
      }
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

      //TODO update API call
    },
    async addDeployment(newDeployment) {
      this.deployments.unshift(newDeployment)

      // Create deployment API call
      try {
        await fetch('https://schoolapi.adwinzijderveld.nl/api/deployments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDeployment),
        })
      } catch (error) {
        console.error(error)
      }
    },
    updateDeploymentPickUpDate(deveui) {
      this.deployments.find((d) => d.deveui === deveui && d.ophaaldatum === null).ophaaldatum =
        getCurrentDateTimeString()

      //TODO update API call
    },
  },
  async mounted() {
    // API calls for all data
    const newBuoysArray = []
    const newDeploymentsArray = []

    // GET buoys
    const buoysResponse = await fetch('https://schoolapi.adwinzijderveld.nl/api/boeien')
    newBuoysArray.push(...(await buoysResponse.json()))

    // GET deployments
    const deploymentsResponse = await fetch('https://schoolapi.adwinzijderveld.nl/api/deployments')
    newDeploymentsArray.push(...(await deploymentsResponse.json()))

    this.buoys = newBuoysArray
    this.deployments = newDeploymentsArray

    this.isPageDataLoaded = true
  },
}
</script>
