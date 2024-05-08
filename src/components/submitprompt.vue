<template>
    <div class="sub-prompt">
        <div v-if="loading" class="loading-spinner"></div>
        <h1 v-else>Request Submitted Successfully</h1>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.sub-prompt {
    position: fixed;
    height: 15%;
    width: 50%;
    background: rgb(170, 52, 52);
    top: 37%;
    left: 25%;
    text-align: center;
    border-radius: 6px;
}

.sub-prompt h1 {
    color: white;
    margin-top: 40px;
    font-size: 25px;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
}

.loading-spinner {
    position: relative;
    border: 4px solid #f3f1f1;
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin-top: 60px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
