/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { md3 } from 'vuetify/blueprints'

// Composables
import { createVuetify } from 'vuetify'

export default createVuetify({
  blueprint: md3,
  components: {
    VDatePicker,
  },
})


