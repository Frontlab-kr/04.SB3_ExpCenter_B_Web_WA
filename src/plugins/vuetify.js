import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { ko } from 'vuetify/locale'

import customKo from '../locales/ko.json'
import { VTreeview } from 'vuetify/labs/VTreeview'
import { VStepperVertical } from 'vuetify/labs/VStepperVertical'

export default createVuetify({
  components: {
    VTreeview,
    VStepperVertical,
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        colors: {
          primary: "#246beb",
          secondary: "#003675", 
          gray: "#f0f0f0", 
          danger: "#eb003b", 
          warning: "#ffb724",
          success: "#008a1e",
          information: "#2768ff",
        },
      },
    },
  },
  locale: {
    locale: 'ko',
    messages: { ko: { ...ko, ...customKo } },
  },
})
