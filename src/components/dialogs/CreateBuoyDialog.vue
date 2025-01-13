<template>
  <v-btn density="default" rounded="xl" variant="flat" color="grey" @click="onActivate"
    >Toevoegen</v-btn
  >

  <v-dialog v-model="isDialogActive" persistent class="w-50 h-100">
    <v-card title="Boei toevoegen">
      <v-sheet class="pa-12" rounded>
        <v-form v-model="form">
          <p class="text-h6">Naam</p>
          <v-text-field
            v-model="name"
            :readonly="isLoading"
            :rules="[required]"
            class="mb-2"
            placeholder="Vul de naam van de boei in"
            clearable
          ></v-text-field>

          <p class="text-h6">Apparaat id</p>
          <v-text-field
            v-model="deveui"
            :readonly="isLoading"
            :rules="[required]"
            placeholder="Vul het apparaat id van de boei in"
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
          text="Aanmaken"
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
import { required } from '@/helper'

export default {
  props: ['addBuoy'],
  data() {
    return {
      form: false,
      isLoading: false,
      name: null,
      deveui: null,
      isDialogActive: false,
    }
  },
  methods: {
    onActivate() {
      // Set all default form values
      this.name = null
      this.deveui = null

      // Activate the dialog
      this.isDialogActive = true
    },
    onSubmit() {
      if (!this.form) return

      this.isLoading = true

      const buoy = {
        naam: this.name,
        deveui: this.deveui,
      }

      this.addBuoy(buoy)

      this.onClose()
    },
    onClose() {
      this.isLoading = false
      this.isDialogActive = false
    },
    required,
  },
}
</script>
