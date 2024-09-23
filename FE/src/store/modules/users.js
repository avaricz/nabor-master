import axios from 'axios';

const state = {
    users: []
};

const getters = {
    getUsers: (state) => state.users
};

const actions = {
    fetchUsers({ commit }) {
        axios.get('http://localhost:3001/api/users').then(res => {
            commit('SET_USERS', res.data)
        })
        .catch(error => {
            console.error('Error fetching users:', error)
        })
    }
};

const mutations = {
    SET_USERS: (state, data) => state.users = data,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
