<template>
    <v-dialog v-model="shouldBeVisible" persistent max-width="600px">
        <v-card>
        <v-card-title>
            <span class="text-h5">Vytvořit novou objednávku</span>
        </v-card-title>

        <v-card-text>
            <v-form ref="form" v-model="formValid" lazy-validation>

                <v-select
                    v-model="order.customerId"
                    label="Zákazník"
                    :items="users"
                    item-title="name"
                    item-value="id"
                    required
                ></v-select>

                <v-select
                    v-model="order.items"
                    label="Produkty"
                    :items="products"
                    multiple
                    chips
                    item-title="name"
                    return-object
                ></v-select>

            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">Zavřít</v-btn>
            <v-btn  color="primary" @click="createOrder">
            Vytvořit
            </v-btn>
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
});

const emit = defineEmits(['close', 'submit']);

const order = ref({
customerId: '',
items: [],
state: 'pending',
});

const formValid = ref(false);

// Products - Mělo by být taháno z API
const products = ref([
{ id: 101, product: 'Laptop', name: 'Gaming Laptop', price: 1200 },
{ id: 102, product: 'Mouse', name: 'Wireless Mouse', price: 50 },
{ id: 103, product: 'Smartphone', name: 'Latest Smartphone', price: 800 },
{ id: 104, product: 'Tablet', name: 'High-Resolution Tablet', price: 300 },
{ id: 105, product: 'Keyboard', name: 'Mechanical Keyboard', price: 100 }
]);

const users = computed(() => store.getters['users/getUsers'])

const close = () => {
    emit('close');
};

const createOrder = () => {
    store.dispatch('orders/createOrder',  order.value )
    close(); 
};

const shouldBeVisible = computed({
get() { return props.show },
set() { emit('close') },
})
</script>
