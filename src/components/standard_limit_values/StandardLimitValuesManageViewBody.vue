<template>
  <div v-if="isPageDataLoaded">
    <h1>Standaard grenswaarden beheren</h1>
    <br />

    <StandardLimitValuesDetailsBody
      v-for="standardLimitValue in standardLimitValues"
      :key="standardLimitValue"
      :standardLimitValue="standardLimitValue"
      :updateLimitValue="updateLimitValue"
    />
  </div>
</template>

<script>
import StandardLimitValuesDetailsBody from '@/components/standard_limit_values/StandardLimitValuesDetailsBody.vue'

export default {
  components: { StandardLimitValuesDetailsBody },
  data() {
    return {
      isPageDataLoaded: false,
      standardLimitValues: [],
    }
  },
  methods: {
    /**
     *  Update the standard limit value
     * @param standardLimitValues
     * @param badUpperLimit
     * @param goodUpperLimit
     * @param goodLowerLimit
     * @param badLowerLimit
     */
    async updateLimitValue(
      standardLimitValues,
      badUpperLimit,
      goodUpperLimit,
      goodLowerLimit,
      badLowerLimit,
    ) {
      const standardLimitValueToUpdate = this.standardLimitValues.find(
        (g) => g.type === standardLimitValues.type,
      )

      standardLimitValueToUpdate.slechtboven = badUpperLimit
      standardLimitValueToUpdate.goedboven = goodUpperLimit
      standardLimitValueToUpdate.goedonder = goodLowerLimit
      standardLimitValueToUpdate.slechtonder = badLowerLimit

      // Update standard limit values API call
      try {
        await fetch('https://schoolapi.adwinzijderveld.nl/api/standaard-grenswaarden', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(standardLimitValueToUpdate),
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  async mounted() {
    // API calls for all data
    const newStandardLimitValuesArray = []

    // GET standard limit values
    const standardLimitValuesResponse = await fetch(
      'https://schoolapi.adwinzijderveld.nl/api/standaard-grenswaarden',
    )
    newStandardLimitValuesArray.push(...(await standardLimitValuesResponse.json()))

    this.standardLimitValues = newStandardLimitValuesArray

    this.isPageDataLoaded = true
  },
}
</script>
