<template>
  <div>
    <h1 class="title-xxlarge">Frequently Asked Questions</h1>

    <div style="border-top: 1px solid var(--primary-70);"></div>
    <div v-for="(item, i) in zInfo" :key="i">
      <div style="border-bottom: 1px solid var(--primary-70); border-left: 1px solid var(--primary-70); border-right: 1px solid var(--primary-70);" >
        <div class="d-flex pa-2 secondary-color" style="background-color:var(--secondary-5); ">
          <div class="center_all pl-4  font-bold" style="height: 40px;" @click="open_info(item)" @keyup.enter="open_info(item)" tabindex="0" role="button" title="enter키를 누르시면 해당 질문에 대한 상세한 정보를 표시하거나 숨기기">{{item.title}}</div>
          <v-spacer></v-spacer>
          <v-btn v-if="item.isOpen" size="small" variant="plain" icon @click="open_info(item)" title="해당 질문에 대한 상세한 정보를 표시"><v-icon aria-hidden="true"><v-icon aria-hidden="true">mdi-chevron-up</v-icon></v-icon></v-btn>
          <v-btn v-else             size="small" variant="plain" icon @click="open_info(item)" title="해당 질문에 대한 상세한 정보를 숨기기"><v-icon aria-hidden="true"><v-icon aria-hidden="true">mdi-chevron-down</v-icon></v-icon></v-btn>
        </div>

        <div v-if="item.isOpen" class=" pa-4 pl-7" style="border-top: 1px solid var(--primary-70);" v-html="item.contents">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zInfo: [
        {idx: 1, title: "Q1. How can I use the Experience Center?", contents: `<div>Advance reservations are required and can be made on the website. Reservations are available up to 3 months in advance.</div><div>For inquiries, call (02)-2027-4100</div>`, isOpen: false },
        {idx: 2, title: "Q2. Is there an admission fee for the Experience Center?", contents: `<div>Admission is free.</div>`, isOpen: false },
        {idx: 3, title: "Q3. On which days is the Experience Center open?", contents: `<div>It is open from Tuesday to Friday on weekdays, as well as on weekends and public holidays.</div><div><span style="font-weight: 700">※ Closed on January 1st, Lunar New Year, and Chuseok day.</span></div>`, isOpen: false },
        {idx: 4, title: "Q4. From what age is it possible to participate in the Disaster Safety Experience, Basic First Aid Training, 119 Tour with Firefighters, and Fire Facility Training?", contents: `<div>The Disaster Safety Experience, Basic First Aid Training, and 119 Tour with Firefighters are available for elementary school students and older. For elementary school students, a guardian must also reserve and accompany them for the experience. Fire Facility Training is available for middle school students and older.</div>`, isOpen: false },
        {idx: 5, title: "Q5. Is there anything for children under 7?", contents: `<div>Children born between 2018 and 2019 can participate in the Children's Safety Experience.</div><div>A guardian must accompany them, and online reservations are required.</div><div>The Fire History Museum within the Boramae Safety Experience Center can be visited freely without a reservation.</div>`, isOpen: false },
        {idx: 6, title: "Q6. How do I make a reservation?", contents: `<div>Visit the Boramae Safety Experience Center website, go to the 'Reservation' section at the top, and you can view the availability for each date. Select your preferred date and time, then enter the participant list (including guardians).</div><div>(Reservations are available up to 3 months in advance.)</div>`, isOpen: false },
        {idx: 7, title: "Q7. How are experiences conducted for individuals with disabilities?", contents: `<div>Individuals with disabilities can also participate if they make a reservation. However, certain experiences may be limited depending on the nature of the disability.</div><div>Please note that participants need to have at least the mental and cognitive development level of an elementary school student for safety reasons, and one safety instructor must accompany each disabled individual. When making reservations, please include the instructor in the participant count.</div><div>Contact us via the bulletin board or phone before making a reservation, and we will respond sincerely to your inquiries.</div>`, isOpen: false },
        {idx: 8, title: "Q8. Do I need to make a reservation for the Fire History Museum?", contents: `<div>You can enter the museum freely without a reservation between 10:00 AM and 4:30 PM.</div>`, isOpen: false },
        {idx: 9, title: "Q9. What is the difference between the Disaster Experience and the Professional Experience?", contents: `<div>ㆍDisaster Experience: Includes earthquake, typhoon, fire, and traffic accident experiences.</div><div>ㆍProfessional Experience: Includes first aid (basic and advanced) and fire facility training. Basic first aid covers CPR and AED training, while advanced first aid, required by law, covers CPR, AED, and CPR for infants and young children.</div><div>Fire Facility Training is a specialized course focusing on fire theory and the management and operation of various fire facilities.</div>`, isOpen: false },
        {idx: 10, title: "Q10. Do I need to make separate reservations for the Disaster Experience and Professional Experience?", contents: `<div>You can experience both by making consecutive reservations.</div><div>Separate schedules are shown during the reservation process, so please check and follow accordingly.</div>`, isOpen: false },
        {idx: 11, title: "Q11. Where can I check and cancel my reservation?", contents: `<div>On the website, go to 'Reservations' and click on <Check/Change/Cancel Reservation>. Enter the participant's name and phone number (ID number) used during the reservation.</div><div>(Search using the name and number entered at the time of reservation.) Changes and cancellations can be made until the day before the experience.</div>`, isOpen: false },
        {idx: 12, title: "Q12. How can I print a certificate of experience?", contents: `<div>Go to 'Reservations' on the website, then click on 'Print Certificate'. Enter the name and phone number (ID number) used during the reservation, and you can print the certificate on the same day of the experience. (It cannot be printed before the experience.)</div>`, isOpen: false },
        {idx: 13, title: "Q13. Is photography allowed inside the Boramae Safety Experience Center?", contents: `<div>Photography is allowed in each experience room. However, using tripods, flashes, and commercial photography is not permitted.</div><div>If you wish to use photos of the center for commercial purposes, prior permission is required.</div>`, isOpen: false },
        {idx: 14, title: "Q14. Is there a nearby subway station to the Boramae Safety Experience Center?", contents: `<div>You can exit from Exit 2 of Boramae Park Station on the Sillim Line and walk for about 7 minutes, or exit from Exit 4 of Shindaebang Station on Line 2 and walk for about 15 minutes. As the center is located within the park, vehicles are not allowed to enter.</div><div>(※ Plan ahead for a leisurely walk in the park!)</div>`, isOpen: false },
        {idx: 15, title: "Q15. How do I park?", contents: `<div>Vehicles cannot enter the park, so please use the Boramae Park public parking lot near the West Gate of Boramae Park. Parking fees are the visitor's responsibility.</div><div style="margin-top: 15px;">Boramae Park Management Office: 02)2181-1181~8, 2181-1191~5</div>`, isOpen: false },
        {idx: 16, title: "Q16. Are meals or food sold inside the Experience Center?", contents: `<div>Food and drinks are not allowed or sold inside the Experience Center.</div>`, isOpen: false },
        {idx: 17, title: "Q17. When is night experience available?", contents: `<div>Currently, night experiences are not available.</div><div>If they become available in the future, we will notify you.</div>`, isOpen: false },
        {idx: 18, title: "Q18. I can’t see photos well on the Experience Center website.", contents: `<div>1. In Internet Explorer, go to Tools > Compatibility View Settings.</div><div><img src='/boramae/contents/faq/faq_img_01.jpg' style="margin-top: 50px;"></div><div>2. In the Add this website field, type seoul.go.kr and click the Add button.</div><div><img src='/boramae/contents/faq/faq_img_02.jpg' style="margin-top: 50px;"/></div><div>3. Once seoul.go.kr is added to the list of sites in Compatibility View, click Close to exit.</div>`, isOpen: false },
      ],
    };
  },

  components:{
  },


  mounted() {
  },


  beforeUnmount(){
  },

  methods : {
    open_info(item){
      item.isOpen = !item.isOpen;
    }
  },
};
</script>
