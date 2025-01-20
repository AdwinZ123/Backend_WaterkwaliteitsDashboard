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
    updateLimitValue(
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

      //TODO update API call
    },
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

    this.standardLimitValues = newStandardLimitValuesArray

    this.isPageDataLoaded = true
  },
}
</script>
