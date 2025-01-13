<template>
  <div>
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
      standardLimitValues: [
        {
          type: 'zuurstof',
          slechtboven: 30.3,
          goedboven: 25.0,
          goedonder: 20.5,
          slechtonder: 18.4,
        },
        {
          type: 'temperatuur',
          slechtboven: 30.3,
          goedboven: 25.0,
          goedonder: 20.5,
          slechtonder: 18.4,
        },
        {
          type: 'troebelheid',
          slechtboven: 30.3,
          goedboven: 25.0,
          goedonder: 20.5,
          slechtonder: 18.4,
        },
        {
          type: 'elektrische_geleiding',
          slechtboven: 30.3,
          goedboven: 25.0,
          goedonder: 20.5,
          slechtonder: 18.4,
        },
        {
          type: 'pH',
          slechtboven: 30.3,
          goedboven: 25.0,
          goedonder: 20.5,
          slechtonder: 18.4,
        },
      ],
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
    },
  },
}
</script>
