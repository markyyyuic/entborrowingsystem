import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      formData: {
        id: '',
        name: '',
        role: '',
        yearSection: ''
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
    }
  },
  actions: {
    updateFormData({ commit }, formData) {
      commit('updateFormData', formData);
    },
    // Define other actions if needed
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
