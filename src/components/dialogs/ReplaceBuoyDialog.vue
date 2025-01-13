<template>
  <v-btn density="default" rounded="xl" variant="flat" color="grey" @click="onActivate"
    >Vervangen</v-btn
  >

  <!-- Boei vervangen -->
  <v-dialog v-model="isDialogActive" persistent class="w-50 h-100">
    <v-card title="Boei vervangen">
      <v-sheet class="pa-12" rounded>
        <v-form v-model="form">
          <p class="text-h6">Naam</p>
          <p class="text-subtitle-1">{{ buoy.naam }}</p>

          <p class="text-h6">Apparaat id</p>
          <p class="text-subtitle-1">{{ buoy.deveui }}</p>

          <p class="text-h6">Nieuwe boei</p>
          <v-select
            v-model="selectedBuoy"
            :items="availableBuoys"
            label="Selecteer nieuwe boei"
            item-title="naam"
            item-value="deveui"
            :readonly="isLoading"
            :rules="[required]"
          ></v-select>
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
          text="Vervangen"
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
  props: ['buoy', 'replaceBuoy'],
  data() {
    return {
      form: false,
      isLoading: false,
      isDialogActive: false,
      availableBuoys: [
        {
          naam: 'Betere boei',
          deveui: 'AF-01-HB-39-JI',
        },
      ],
      selectedBuoy: null,
    }
  },
  methods: {
    onActivate() {
      this.selectedBuoy = null

      if (this.availableBuoys.length >= 1) {
        this.selectedBuoy = this.availableBuoys[0]
      }

      this.isDialogActive = true
    },
    onSubmit() {
      if (!this.form) return

      this.isLoading = true

      this.replaceBuoy(this.buoy.deveui, this.selectedBuoy.deveui)

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
