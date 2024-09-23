import axios from 'axios';

const state = {
  sampleData: [],
  snackbar: {
    show: false,
    message: '',
    color:''
  }
};

const getters = {
  getOrders: (state) => state.sampleData,
  snackbar: (state) => state.snackbar.show,
  snackbarData: (state) => state.snackbar,
};

const actions = {
  // Fetch orders
  fetchOrders({ commit }) {
    axios.get('http://localhost:3001/api/orders').then(res => {
      commit('SET_ORDERS', res.data)
    })
    .catch(error => {
      console.error('Error fetching orders:', error)
      commit('SHOW_SNACKBAR', { message: 'Failed to fetch orders', color: '#ff0000' });
    })
  },

  // Create new order
  createOrder({ dispatch, commit }, payload) {
    axios.post('http://localhost:3001/api/orders', payload).then(res => {
      commit('SHOW_SNACKBAR', { message: 'Created', color: '#00ff00' });
      dispatch('fetchOrders')
    })
    .catch(error => {
      console.error('Error creating order:', error);
      commit('SHOW_SNACKBAR', { message: 'Failed to create order', color: '#ff0000' });
    });
  },

  // Update order status
  updateOrderStatus({ dispatch, commit }, payload) {
    axios.patch(`http://localhost:3001/api/orders/${payload.id}`, {
      state: payload.state
    }).then((res) => {
      commit('SHOW_SNACKBAR', { message: 'Updated', color: '#00ff00' });
      dispatch('fetchOrders')
    })
    .catch(error => {
      console.error('Error updating order status:', error);
      commit('SHOW_SNACKBAR', { message: 'Failed to update order', color: '#ff0000' });
    });
  }
};

const mutations = {
  SET_ORDERS: (state, data) => state.sampleData = data,
  SHOW_SNACKBAR: (state, { message, color }) =>  {
    state.snackbar.show = true
    state.snackbar.message = message
    state.snackbar.color = color
    console.log(state.snackbar.show)

    setTimeout(() => {
      state.snackbar.show = false
      state.snackbar.message = ''
      state.snackbar.color = ''
    }, 2000)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
