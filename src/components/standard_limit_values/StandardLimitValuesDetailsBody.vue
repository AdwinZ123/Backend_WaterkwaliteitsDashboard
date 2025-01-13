<template>
  <details v-if="isPageDataLoaded">
    <summary class="text-subtitle-1">
      <strong><v-icon :icon="sensorInfo.icon" /> {{ sensorInfo.displayName }}</strong>
    </summary>
    <v-container>
      <UpdateLimitValuesDialog
        :standardLimitValue="standardLimitValue"
        :updateLimitValue="updateLimitValue"
        :sensorInfo="sensorInfo"
        buttonText="Bewerken"
        cardTitle="Standaard grenswaarden beheren"
        :id="null"
      />

      <br /><br />
      <p>Bovengrens 2: {{ standardLimitValue.slechtboven }}</p>
      <p>Bovengrens 1: {{ standardLimitValue.goedboven }}</p>
      <p>Ondergrens 1: {{ standardLimitValue.goedonder }}</p>
      <p>Ondergrens 2: {{ standardLimitValue.slechtonder }}</p>
    </v-container>
    <hr />
  </details>
</template>

<script>
import { getSensorTypeInfo } from '@/helper'
import UpdateLimitValuesDialog from '@/components/dialogs/UpdateLimitValuesDialog.vue'

export default {
  components: { UpdateLimitValuesDialog },
  props: ['standardLimitValue', 'updateLimitValue'],
  data() {
    return {
      isPageDataLoaded: false,
      sensorInfo: null,
    }
  },
  methods: {
    getSensorTypeInfo,
  },
  mounted() {
    this.sensorInfo = getSensorTypeInfo(this.standardLimitValue.type)

    this.isPageDataLoaded = true
  },
}
</script>
