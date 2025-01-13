<template>
  <details v-if="isPageDataLoaded">
    <summary class="text-h6">
      <strong>{{ buoy.naam }} | {{ buoy.deveui }}</strong>
    </summary>
    <UpdateBuoyDialog :buoy="buoy" :updateBuoyName="updateBuoyName" />&nbsp;
    <DeployBuoyDialog v-if="!isActive" :buoy="buoy" :addDeployment="addDeployment" />&nbsp;
    <v-btn
      density="default"
      rounded="xl"
      variant="flat"
      color="grey"
      v-if="isActive"
      @click="onPickUpClick"
      >Ophalen</v-btn
    >&nbsp;
    <ReplaceBuoyDialog v-if="isActive" :buoy="buoy" :replaceBuoy="replaceBuoy" />

    <v-container>
      <DeploymentManageDetailsBody
        v-for="deployment in deployments"
        :key="deployment"
        :buoy="buoy"
        :deployment="deployment"
        :updateLimitValue="updateLimitValue"
      />
    </v-container>
    <hr />
  </details>
</template>

<script>
import { required } from '@/helper'
import DeploymentManageDetailsBody from '@/components/deployments/DeploymentManageDetailsBody.vue'
import DeployBuoyDialog from '@/components/dialogs/DeployBuoyDialog.vue'
import ReplaceBuoyDialog from '@/components/dialogs/ReplaceBuoyDialog.vue'
import UpdateBuoyDialog from '@/components/dialogs/UpdateBuoyDialog.vue'

export default {
  components: {
    DeploymentManageDetailsBody,
    DeployBuoyDialog,
    ReplaceBuoyDialog,
    UpdateBuoyDialog,
  },
  props: [
    'buoy',
    'deployments',
    'updateBuoyName',
    'updateDeploymentPickUpDate',
    'addDeployment',
    'replaceBuoy',
    'updateLimitValue',
  ],
  data() {
    return {
      isActive: false,
      isPageDataLoaded: false,
    }
  },
  methods: {
    onPickUpClick() {
      this.updateDeploymentPickUpDate(this.buoy.deveui)

      this.checkIsActive()
    },
    required,
    checkIsActive() {
      if (this.deployments === null || this.deployments.length == 0) {
        return false
      }

      const activeDeployments = this.deployments.filter((d) => d.ophaaldatum === null)

      this.isActive = activeDeployments.length >= 1
    },
  },
  mounted() {
    this.checkIsActive()

    this.isPageDataLoaded = true
  },
  beforeUpdate() {
    this.checkIsActive()
  },
}
</script>

<style scoped>
#layout {
  flex: 1;
  display: flex;
  position: relative;
}
#sidebar {
  background-color: rgb(35 55 75 / 90%);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
}
</style>
