<template>
  <div>
    <h1 class="title-xxlarge" style="position: relative; z-index: 10;">{{ $t("menu_0201_이용안내") }}</h1>
    <h2 class="title-xlarge">Operating Hours</h2>
    <div class="bg-gap-2"></div>
    <table class="nor_table">
      <caption class="sr-only">{{ $t("menu_0201_이용안내") }}</caption>
      <tbody>
        <tr>
          <th scope="row" style="min-width: 150px;">Schedule</th>
          <td>Every Tuesday to Friday, weekends, and public holidays <span class="font-weight-bold">※ Closed on New Year’s Day, Lunar New Year, and Chuseok holidays</span></td>
        </tr>
        <tr>
          <th scope="row" style="min-width: 150px;">Group Size</th>
          <td>15-30 people per session <span class="font-weight-bold">※ Varies by activity</span></td>
        </tr>
        <tr>
          <th scope="row" style="min-width: 150px;">Duration</th>
          <td>Disaster Experience: within 100 minutes, Basic First Aid: 60 minutes, Advanced First Aid (Theory): 120 minutes, Advanced First Aid (Practice): 120 minutes, Children’s Safety Experience: 60 minutes, Fire Safety Education: 60 minutes, 119 Tour with Firefighters: within 80 minutes</td>
        </tr>
        <tr>
          <th scope="row" style="min-width: 150px;">Participants</th>
          <td>Disaster Experience (Elementary students and older), Basic First Aid (Elementary students and older), Advanced First Aid (Teachers, educators for children under 13), Children’s Safety Experience (Born in 2018 or 2019), Fire Safety Education (Middle school students and older), 119 Tour with Firefighters (Elementary students and older)</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 text-red-darken-1 title-medium font-bold d-flex align-center">
      <v-icon aria-hidden="true" size="22" class="mr-2">mdi-alert-circle</v-icon>
      Certificates of completion can be printed on the website after 7:00 PM on the day of the experience.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components: {
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods: {
  },
};
</script>