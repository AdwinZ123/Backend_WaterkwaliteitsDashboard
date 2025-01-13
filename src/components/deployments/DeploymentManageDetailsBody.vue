<template>
  <details>
    <summary class="text-subtitle-1">
      <strong
        >{{ buoy.naam }} | {{ getFormattedDate(deployment.plaatsingsdatum) }} t/m
        {{ getFormattedDate(deployment.ophaaldatum) }} | {{ deployment.locatie }}</strong
      >
    </summary>

    <br />

    <ConfigurationDetailsBody
      v-for="configuration in deployment.configuraties"
      :key="configuration"
      :configuration="configuration"
      :updateLimitValue="updateLimitValue"
    />
    <hr />
  </details>
</template>

<script>
import { getFormattedDate } from '@/helper'
import ConfigurationDetailsBody from '@/components/configurations/ConfigurationDetailsBody.vue'

export default {
  props: ['buoy', 'deployment', 'updateLimitValue'],
  components: { ConfigurationDetailsBody },
  methods: {
    getFormattedDate,
  },
}
</script>
