<template>
  <v-container>
    <Snackbar :snackbar="snackbar" @close="showSnack = false" :data="snackbarData"/>
    <Dialog :show="showDialog" :order-for-edit="orderId" @close="closeDialog"></Dialog>
    <Form :show="showForm" @close="showForm = false"></Form>

    <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="create">Přidat</v-btn>
        </v-toolbar>
      </template>

      <template #item.id="{ item }">
        {{ item.id }}
      </template>
      <template #item.items="{ item }">
        <div v-for="product in item.items">
          {{ product.name }}  {{ product.price }} kč
        </div>
      </template>

      <template #item.customerId="{ item }">
        {{ customer(item.customerId) }}
      </template>

      <template #item.state="{ item }">
        {{ states[item.state] }}
      </template>

      <template #item.action="{ item }">
        <v-btn size="x-small" @click="edit(item.id)">Upravit</v-btn>
      </template> 
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Dialog from './Dialog.vue';
import Snackbar from './Snackbar.vue';
import Form from './Form.vue'

const store = useStore()
const showDialog = ref(false)
//const showSnack = ref(true)
const showForm = ref(false);
const snackbar = computed (() => store.getters['orders/snackbar'])
const snackbarData = computed (() => store.getters['orders/snackbarData'])

// Define table headers
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'items' },
  { text: 'Customer', value: 'customerId' },
  { text: 'State', value: 'state' },
  { text: '', value: 'action' },
];

const states = {
  pending: 'Vyřizuje se',
  shipped: 'Posláno',
  delivered: 'Doručeno',
  canceled: 'Zrušeno',
}
const orderId = ref(null)

// Random data for the table
const items = computed(() => store.getters['orders/getOrders'])
const users = computed(() => store.getters['users/getUsers'])

// Customer name
const customer = (id) => {
  const user = users.value.find(user => user.id === id)
  return user ? user.name : ''
}

const create = () => {
  showForm.value = true
}

const edit = (id) => {
  orderId.value = id
  showDialog.value = true;
}

const closeDialog = () => {
  orderId.value = null
  showDialog.value = false
}

</script>

<style scoped>
.v-data-table {
  max-width: 800px;
  margin: 0 auto;
}
</style>
