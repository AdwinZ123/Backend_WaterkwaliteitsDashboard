<template>
  <v-card class="h-screen overflow-y-auto">
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="boeien">Boeien</v-tab>
      <v-tab value="standaard_grenswaarden">Standaard grenswaarden</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="boeien">
          <BuoysManageViewBody />
        </v-tabs-window-item>

        <v-tabs-window-item value="standaard_grenswaarden">
          <StandardLimitValuesManageViewBody />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
import BuoysManageViewBody from '@/components/buoys/BuoysManageViewBody.vue'
import StandardLimitValuesManageViewBody from '@/components/standard_limit_values/StandardLimitValuesManageViewBody.vue'

export default {
  components: { BuoysManageViewBody, StandardLimitValuesManageViewBody },
  data() {
    return {
      tab: null,
    }
  },
}
</script>
