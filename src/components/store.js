import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      formData: {
        user_id: '',
        user_name: '',
        user_type: '',
        year_section: ''
      },
      selectedItems: [],
      selectedQuantity: 0,
      loggedInAdmin: null // Add loggedInAdmin property to store admin data
    };
  },
  mutations: {
    updateFormData(state, newFormData) {
      state.formData = newFormData;
    },
    resetSelectedItems(state, newSelectedItem) {
      state.selectedItems = [newSelectedItem];
    },
    setSelectedQuantity(state, quantity) {
      state.selectedQuantity = quantity;
    },
    addItemToSelectedItems(state, newItem) {
      state.selectedItems.push(newItem);
      console.log('Selected items:', state.selectedItems);
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
    resetFormData(state) {
      state.formData = {
        user_id: '',
        user_name: '',
        user_type: '',
        year_section: ''
      };
    },
    // Define mutation to set loggedInAdmin
    setLoggedInAdmin(state, adminData) {
      state.loggedInAdmin = adminData;
    }
  },
  actions: {
    updateFormData({ commit }, formData) {
      commit('updateFormData', formData);
    },
    resetFormData({ commit }) {
      commit('resetFormData');
    },
    // Add action to clear selected items
    clearSelectedItems({ commit }) {
      commit('clearSelectedItems');
    }
  },
  getters: {
    getFormData(state) {
      return state.formData;
    },
    getSelectedItems(state) {
      return state.selectedItems;
    },
    getSelectedQuantity(state) {
      return state.selectedQuantity;
    },
    // Add getter for loggedInAdmin
    getLoggedInAdmin(state) {
      return state.loggedInAdmin;
    }
  }  
});

export default store;
