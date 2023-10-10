<template>
    <v-card class="application-thumbnail" align-center>
        <v-col>        
            <v-btn class="ma-4" color="primary" @click="openAppDialog">
                <v-icon left>mdi-plus</v-icon>
            </v-btn>
        </v-col>
    </v-card>
</template>

<script lang="ts">
export default {
    methods: {
        openAppDialog() {
            console.log('AddItem > openDialog');
            this.$emit("add-application", true);
        },
    },
};
</script>

<style scoped>
.application-thumbnail {
    cursor: pointer;
    width: 200px;
    margin: 10px;
}
</style>
