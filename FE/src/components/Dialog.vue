<template>
  <v-dialog v-model="shouldBeVisible" persistent :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title>
        <span>Upravit objednávku</span>
      </v-card-title>
      <v-card-text>
        <v-select label="Status" :items="states" v-model="newStatus"></v-select>
      </v-card-text>
      <v-card-actions class="mx-1">
        <v-spacer></v-spacer>
        <v-btn @click="emit('close')">Zavřít</v-btn>
        <v-btn @click="updateStatus" color="success" variant="tonal">Upravit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({
  show: Boolean,
  orderForEdit: Number
})

const states = [
  { title: 'Vyřizuje se', value: 'pending' },
  { title: 'Posláno', value: 'shipped' },
  { title: 'Doručeno', value: 'delivered' },
  { title: 'Zrušeno', value: 'canceled' }
];

const emit = defineEmits(['close', 'update'])

const newStatus = ref(null)

const updateStatus = () => {
  if (newStatus) {
    store.dispatch('orders/updateOrderStatus', { id: props.orderForEdit, state: newStatus.value })
    emit('close')
  }
}

const shouldBeVisible = computed({
  get() { return props.show },
  set() { emit('close') },
})

</script>
