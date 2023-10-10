<template>
    <v-card class="application-thumbnail" @click="editApplication">
        <v-card-title>{{ application.name }}</v-card-title>
        <v-card-subtitle>{{ application.date }}</v-card-subtitle>
        <v-card-text>{{ application.type }}</v-card-text>
    </v-card>
</template>

<script lang="ts">
import {PropType } from 'vue';
import Application from '@/type/application.type';

export default {
  props: {
    application:{
      type: Object as PropType<Application>,
      required: true,
    },
  },
  methods: {
    editApplication() {
      console.log('AppItem > Edit');
      this.$emit('edit', this.application.id);
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
