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
      selectedQuantity: 0
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
  }  
});

export default store;
