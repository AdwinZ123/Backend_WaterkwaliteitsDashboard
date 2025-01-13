<template>
  <v-btn
    density="default"
    rounded="xl"
    variant="flat"
    color="grey"
    size="x-small"
    @click="onActivate"
    >{{ buttonText }}</v-btn
  >

  <!-- Update  -->
  <v-dialog v-model="isDialogActive" persistent class="w-50 h-100">
    <v-card :title="cardTitle">
      <v-sheet class="pa-12" rounded>
        <v-form v-model="form">
          <p class="text-h6">Type</p>
          <p class="text-subtitle-1">{{ sensorInfo.displayName }}</p>

          <p v-if="id !== null" class="text-h6">Id</p>
          <p v-if="id !== null" class="text-subtitle-1">{{ id }}</p>
          <!-- <br /> -->

          <p class="text-h6">Bovengrens 2</p>
          <v-text-field
            v-model="badUpperLimit"
            :readonly="isLoading"
            :rules="[required]"
            class="mb-2"
            placeholder="Vul de bovengrens 2 in"
            clearable
          ></v-text-field>

          <p class="text-h6">Bovengrens 1</p>
          <v-text-field
            v-model="goodUpperLimit"
            :readonly="isLoading"
            :rules="[required]"
            class="mb-2"
            placeholder="Vul de bovengrens 1 in"
            clearable
          ></v-text-field>

          <p class="text-h6">Ondergrens 1</p>
          <v-text-field
            v-model="goodLowerLimit"
            :readonly="isLoading"
            :rules="[required]"
            class="mb-2"
            placeholder="Vul de ondergrens 1 in"
            clearable
          ></v-text-field>

          <p class="text-h6">Ondergrens 2</p>
          <v-text-field
            v-model="badLowerLimit"
            :readonly="isLoading"
            :rules="[required]"
            class="mb-2"
            placeholder="Vul de ondergrens 2 in"
            clearable
          ></v-text-field>
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
          text="Bewerken"
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
import { required, getSensorTypeInfo } from '@/helper'

export default {
  props: ['standardLimitValue', 'updateLimitValue', 'sensorInfo', 'buttonText', 'cardTitle', 'id'],
  data() {
    return {
      isDialogActive: false,
      form: false,
      isLoading: false,
      badUpperLimit: null,
      goodUpperLimit: null,
      goodLowerLimit: null,
      badLowerLimit: null,
    }
  },
  methods: {
    getSensorTypeInfo,
    required,
    /**
     * Activate the update dialog
     */
    onActivate() {
      // Set all default form values
      this.badUpperLimit = this.standardLimitValue.slechtboven
      this.goodUpperLimit = this.standardLimitValue.goedboven
      this.goodLowerLimit = this.standardLimitValue.goedonder
      this.badLowerLimit = this.standardLimitValue.slechtonder

      // Activate the dialog
      this.isDialogActive = true
    },
    /**
     * The update form has been sumbitted
     */
    onSubmit() {
      // Form validation
      if (!this.form) return

      // Set sumbit button to loading and form fields to readonly
      this.isLoading = true

      // Update the limit values
      this.updateLimitValue(
        this.standardLimitValue,
        this.badUpperLimit,
        this.goodUpperLimit,
        this.goodLowerLimit,
        this.badLowerLimit,
      )

      // Close the dialog
      this.onClose()
    },
    /**
     * Close the dialog
     */
    onClose() {
      this.isLoading = false
      this.isDialogActive = false
    },
  },
}
</script>
