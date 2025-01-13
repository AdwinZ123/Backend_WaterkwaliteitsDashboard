<template>
  <v-btn density="default" rounded="xl" variant="flat" color="grey" @click="onActivate"
    >Bewerken</v-btn
  >

  <!-- Boei bewerken -->
  <v-dialog v-model="isDialogActive" persistent class="w-50 h-100">
    <v-card title="Boei bewerken">
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
          <p class="text-subtitle-1">{{ buoy.deveui }}</p>
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
import { required } from '@/helper'

export default {
  props: ['buoy', 'updateBuoyName'],
  data() {
    return {
      form: false,
      name: null,
      isLoading: false,
      isDialogActive: false,
    }
  },
  methods: {
    onActivate() {
      this.name = this.buoy.naam

      this.isDialogActive = true
    },
    onSubmit() {
      if (!this.form) return

      this.isLoading = true

      this.updateBuoyName(this.buoy.deveui, this.name)

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
