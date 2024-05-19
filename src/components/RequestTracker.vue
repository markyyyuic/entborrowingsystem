<template>

    <img src="src\assets\loginlogo.png" alt="">
    <!-- Dialog for More Information -->
    <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }">
        <template #header>
            <div class="dialogHeader">
                <span>Request Information</span>
            </div>
        </template>
        <div v-if="selectedCustomer" class="p-grid">
            <!-- Display tracker data -->
            <div class="info">
                <span class="infoTitle"> Name: </span> {{ selectedCustomer.name }}
            </div>
            <div class="info">
                <span class="infoTitle"> Item Name: </span> {{ selectedCustomer.item_name }}
            </div>
            <div class="info">
                <span class="infoTitle"> Date: </span> {{ selectedCustomer.date }}
            </div>
            <div class="info">
                <span class="infoTitle"> Status: </span>
                <span :style="{ color: getStatusColor(selectedCustomer.status) }">{{ selectedCustomer.status }}</span>
            </div>
        </div>
    </Dialog>

    <!-- DataTable -->
    <div class="page-container">
        <div class="requestTracker-container">
            <div class="container">
                <div class="header1">
                    Search for your borrowing ticket to <br>check the status of your item request.
                </div>
                <div class="header2">
                    Enter your Tracking ID to see detailed information about your request.
                </div>

                <div class="searchbar-container">
                    <IconField iconPosition="right">
                        <InputIcon class="pi pi-search"></InputIcon>
                        <InputText v-model="searchTerm" placeholder="Enter your Tracking ID (*******)"
                            style="width: 100%; border-radius: 8px;" />
                    </IconField>
                </div>

                <div v-if="filteredCustomers.length > 0 && searchTerm" class="trackerTable">
                    <DataTable :value="filteredCustomers" :loading="loading">
                        <Column field="tracking_id" header="Ticket ID" style="min-width: 12rem"></Column>
                        <Column field="name" header="Name" style="min-width: 12rem"></Column>
                        <Column field="item_name" header="Item" style="min-width: 12rem"></Column>
                        <Column field="date" header="Date" style="min-width: 12rem"></Column>
                        <Column field="action" header="Action" style="min-width: 12rem">
                            <template #body="{ data }">
                                <Button class="actionButton" icon="pi pi-bars" @click="showDetails(data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const visible = ref(false);
const selectedCustomer = ref(null);
const searchTerm = ref('');
const customers = ref([]);
const filteredCustomers = ref([]);
const loading = ref(true);

const fetchCustomers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/track/get_trackerlist');
        customers.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};

const showDetails = (data) => {
    selectedCustomer.value = data;
    visible.value = true;
};

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'orange';
        case 'declined':
            return 'red';
        case 'approved':
            return '#68E539';
        default:
            return 'black';
    }
};

onMounted(() => {
    fetchCustomers();
});

watch(searchTerm, (newTerm) => {
    if (newTerm) {
        filteredCustomers.value = customers.value.filter(customer => customer.tracking_id == newTerm);
    } else {
        filteredCustomers.value = [];
    }
});
</script>


<style scoped>
* {
    font-family: 'Inter', sans-serif;
    font-style: 15px;
}

.page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Full height of the viewport */
}

.container {
    text-align: center;
}

.header1 {
    color: #E81652;
    font-weight: 700;
    font-size: 23px;
    line-height: 1.25;
    margin-bottom: 10px;
}

.header2 {
    color: #959595;
    font-weight: 600;
    font-size: 15px;
    line-height: 1.25;
    margin-bottom: 15px;
}

.trackerTable {
    margin-top: 20px;
}

.actionButton {
    border-radius: 5px;
    background-color: #676767;
    border: none;
}

.dialogHeader {
    font-weight: 700;
}

.infoTitle {
    font-weight: 600;
}

img{
    position: fixed;
    left: 42%;
    top: 25px;
}
</style>