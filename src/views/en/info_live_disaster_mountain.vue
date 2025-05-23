<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040403') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div :title="(item.value == tab?'선택됨':'')" v-for="(item, i) in zTab" :key="i" :class="(item.value == tab ? 'sel_box_btn' : 'nor_box_btn') + ' center_all'"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </div>
    </div>

    <div v-if="tab == 0">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">The Basics of Hiking is Walking</h2>
      <div class="bg-body">
        The most fundamental aspect of hiking is walking. Above all, those who are new to hiking should first learn how to walk comfortably to gradually progress to more specialized areas (such as climbing or ice climbing). Learning how to walk in the mountains is the foundation of hiking. Professional climbing is essentially an extension of walking, and techniques for rock climbing and ice climbing are just variations of walking on rocks or ice. Walking in the mountains starts on flat ground and gradually increases in elevation, then comes back down, involving a repetitive movement. While daily life usually involves walking on flat surfaces, hiking requires vertical movement on more inclined and rugged terrain. Therefore, to enjoy walking comfortably, you need to master basic techniques, appropriate training, and scientific knowledge.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">The Difficulty of Walking in the Mountains</h2>
      <div class="bg-body">
        Walking in the mountains is significantly different from walking on flat terrain in terms of exercise intensity. When walking at 6 km/h on flat ground, the heart rate is approximately 100 beats per minute (the average heart rate for adults is around 70 beats per minute, and the respiratory rate is 16-20 breaths per minute), and the body’s oxygen consumption is about 4 times higher than at rest. On the other hand, when climbing a slope in the mountains (carrying a backpack of about 9 kg), the oxygen demand is about 8.8 times higher, and descending the slope requires about 5.7 times more oxygen. Thus, compared to fast walking on flat ground, descending is not easy. Walking in the mountains is challenging both when ascending and descending.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Proper Walking Technique</h2>
      <div class="bg-layer-2">
        When starting hiking, everyone gets out of breath and may experience muscle soreness in their legs while climbing. However, as the saying goes, "you can't expect to be full on the first meal," you need to have patience and gradually build up your training until your walking posture stabilizes and becomes proficient.
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Start with short distances and gradually increase to longer ones.</p>
            All exercises use the principle of load. To improve strength and endurance, you need to increase resistance to your body. Since muscle strength can be strengthened through repeated training, you should start with easy terrains and gradually increase the amount of exercise and speed to enhance your body’s adaptability over time. Although the first day of hiking may strain the heart, lungs, and muscles, as you adapt to this state, the strenuous walking exercise will become enjoyable.
          </li>
          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Balance and rhythm are necessary.</p>
            For beginners starting hiking, it is advisable to walk for 30 minutes and rest for 5 minutes. Beginners often try to speed up and widen their steps in a hurry, which is incorrect. Increasing speed excessively can lead to quick fatigue. The ideal step length is about 75 cm and a pace of 115 steps per minute for adults. It is better to maintain balance and a steady rhythm while walking.
          </li>
          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Basic Walking Posture</p>
            Relax your shoulders and lean your upper body slightly forward, raising your knees only a little while walking. When stepping on the ground, use the entire sole of your foot instead of just the toes or heels for stability. When walking on a slope, swing your arms rhythmically in coordination with your steps instead of swinging them widely. Do not carry anything in your hands if possible, and adjust your breathing naturally to match your steps, keeping the inhalation and exhalation intervals equal. Avoid deep breathing if you are already out of breath, as it may cause dizziness due to excessive oxygen intake. Maintain a steady pace and distribute your energy as follows: 30% for ascending, 30% for descending, and keep the remaining 40% as reserve energy.
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">How to Choose Hiking Boots</h2>
      <div class="bg-layer-2">
        Walking is the most common activity during hiking. To walk well, your feet need to be comfortable, and to ensure that, you need to wear suitable hiking boots. Therefore, the first thing to prepare when starting hiking is a good pair of hiking boots, and it is one of the most crucial pieces of hiking equipment. According to research, when standing, 50% of body weight is distributed to the heel, 17% to the big toe, and the remaining 33% is spread across the other toes.
        <div class="bg-gap-3"></div>
        Comfortable hiking boots should fit well around the area where the toes begin and a little in front of the heel. Koreans often have thicker skin, so if the boots are too tight, it can cause blood circulation issues and make the feet easily fatigued. Therefore, it is better to choose boots that are suitable for Korean foot shapes. Additionally, choose boots with a structure or material that allows sweat to escape, so your feet stay comfortable during the hike and reduce fatigue. The boots should also prevent rain or snow from getting in and should be warm enough to prevent frostbite in winter.
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Types and Uses of Hiking Boots</p>
            In the past, many people didn’t even consider having different hiking boots for each season. Nowadays, hikers purchase boots suited to the season and purpose. If you have multiple pairs of hiking boots, wear light and breathable ones in summer, warm and waterproof ones in winter, sandals for valley climbs, and ridge-climbing boots for rock ridges. This approach will provide the greatest comfort.
          </li>
        </ul>
      </div>

      <div class="bg-gap-2"></div>
      <table class="nor_table">
        <caption class="sr-only">Types and Uses of Hiking Boots table</caption>
        <tbody>
          <tr>
            <th scope="row">Lightweight Hiking Boots</th>
            <td>Suitable for climbing nearby mountains in spring, summer, and autumn or for hikes lasting about one or two days. (Available in leather or nylon fabric.)</td>
          </tr>
          <tr>
            <th scope="row">Four-Season Hiking Boots</th>
            <td>Four-season boots are usually bulky and heavy as they need to be worn in winter as well. If possible, it is better to buy separate boots for spring, summer, and autumn, and a separate pair for winter.</td>
          </tr>
          <tr>
            <th scope="row">Winter Hiking Boots</th>
            <td>In winter, if you are climbing nearby mountains without snow, four-season boots might be sufficient. Winter boots must be excellent in insulation, waterproofing, and durability. They are usually bulkier and heavier than four-season boots, making them harder to walk in without sufficient strength. Leather boots, while heavier and less comfortable than plastic boots, offer better walking comfort.</td>
          </tr>
          <tr>
            <th scope="row">Ridge Climbing Boots</th>
            <td>For climbing rocky ridges, ridge climbing boots are more effective than standard hiking boots. The soles are rugged, preventing slips on dirt paths and providing a firm grip on rocks. These boots are light and comfortable enough for general mountain paths and are also used for rock climbing.</td>
          </tr>
        </tbody>
      </table>

      <div class="bg-body">
        It's not advisable to buy expensive hiking boots from famous brands without understanding their functionality and importance. It is better to purchase boots from companies that specialize in making hiking boots with extensive experience.
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>How to Buy Hiking Boots
            <ul>
              <li>Size
                <ul>
                  <li>When walking, the foot moves forward, and friction can occur at the toe area. To reduce this friction, hiking boots should be 5-10 mm larger than your regular shoes. Since everyone's foot shape is different, even if you have the same size, it’s better to choose boots 10 mm larger if you have thick socks, a high instep, wide feet, or a lot of foot flesh.</li>
                  <li>Even if the size matches, it's best to try on the boots indoors before purchasing. If your foot shape is unique, choose boots with extra room and adjust the fit with socks or insoles. Feet change when sitting versus standing, so try on boots in the evening. Size them with hiking socks on and the laces loosened, ensuring there is enough space for a finger behind the heel. Walk around with the laces tightened and check if the width, instep height, toe ends, or ankles touch, or if the heel lifts. (Boots should wrap the instep comfortably and not be too loose or wide for your feet.)</li>
                </ul>
              </li>

              <div class="bg-gap-2"></div>
              <li>Weight
                <ul>
                  <li>For beginners, it's advisable to start with lightweight hiking boots and gradually move to heavier boots as you become more accustomed to hiking and build leg strength. Boots with a hard and thick sole reduce foot fatigue when carrying heavy loads.</li>
                </ul>
              </li>

              <div class="bg-gap-2"></div>
              <li>How to Wear
                <ul>
                  <li>For hiking, it's better to wear functional socks rather than cotton socks, and in winter, layering with wool socks is recommended. (Cotton socks absorb sweat well but can become damp as they don't release sweat effectively.)</li>
                </ul>
              </li>

              <div class="bg-gap-2"></div>
              <li>
                Flexible Shoe Selection
                <ul>
                  <li>When buying boots, choose ones that flex at the big toe area when lifting the heel and ensure they do not press on the instep.</li>
                </ul>
              </li>

              <div class="bg-gap-2"></div>
              <li>Basic Boot Maintenance
                <ul>
                  <li>Before and after use, check all parts of the boots, including decorations (D-Ring Hook) and laces, to avoid discomfort in future hikes.</li>
                  <li>After hiking, remove dirt with a soft cloth or brush and store the boots. Avoid washing the upper part with water. If the boots get wet, dry them in a well-ventilated, shaded area to prevent deformation. Gore-Tex membranes can be damaged by sharp objects, sand, small stones, or long toenails, and damaged membranes will not perform their waterproofing function. Keep the inside clean to prevent membrane damage.</li>
                  <li>When the boots are wet or after washing, avoid using artificial heat sources like stoves or heaters as they can deform the boots and reduce their lifespan. Dry them in a well-ventilated, shaded area. (It's best not to wash Gore-Tex products if possible.) Avoid drying in direct sunlight to prevent shrinkage or deformation of Gore-Tex or leather. Clean the surface with lukewarm water and a soft sponge, and clean the inside with a wet towel after removing the insoles. Using deodorizing agents like baking soda, tea leaves, or charcoal in breathable pouches can help with odor removal.</li>
                  <li>After use, stuff the boots with newspaper or other materials to maintain their shape and store them with the laces tied. (If they don't dry well, use a fan for ventilation.) Apply waterproof spray or cleaner 2-3 times and finish by brushing with a soft brush. Use a rubber cleaner to remove stains if needed. Proper maintenance will keep your boots functional for a long time.</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">What to Do During Lightning</h2>

      <div class="bg-body">
        <ul>
          <li>
            Definition of Lightning
            <ul>
              <li>Lightning is an electrical discharge phenomenon occurring between clouds and the ground, commonly known as a thunderbolt or ground discharge.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            How It Occurs
            <ul>
              <li>Lightning occurs when heavy rain increases the humidity between the cloud and the ground, enhancing conductivity and causing discharge. It is more likely to happen when there is a significant temperature difference between the upper and lower layers of the atmosphere in spring and autumn. On sunny days, the lower air layer gets heated, making the atmosphere unstable and leading to the formation of cumulonimbus clouds.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            Dangers of Lightning
            <ul>
              <li>Lightning usually has a power of 40,000 to 50,000 amperes but can reach up to several hundred thousand amperes. The temperature can be up to 30,000°C, which is five times the temperature of the sun's surface (a 50,000-ampere lightning strike has enough energy to power 7,000 100W light bulbs for 8 hours).</li>
              <li>Objects protruding upwards, such as umbrellas or trees, can attract lightning, regardless of whether they are metal or non-metal.</li>
              <li>A person standing upright is a good conductor of electricity from head to toe, making them a likely path for lightning currents.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            Safety Measures During Lightning
            <ul>
              <li>When on flat ground or on a mountain, crouch as low as possible and seek shelter in a depression or cave.</li>
              <li>Avoid tall trees or any tall objects in open fields.</li>
              <li>Place long objects like fishing rods, golf clubs, and umbrellas on the ground and lower your posture.</li>
              <li>Stay away from transmission towers or utility poles.</li>
              <li>If you are in a car, close the windows, turn off the engine, and retract the radio antenna.</li>
              <li>When lightning strikes your home, be cautious as current can flow through TV antennas or electrical wires.</li>
              <li>Inside the house, unplug telephones and electrical appliances and maintain a distance of more than 1 meter from lights and electrical devices.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">How to Report an Emergency to 119</h2>

      <div class="bg-body">
        <ul>
          <li>To request emergency rescue, call 119.</li>
          <li>When speaking on the phone, stay calm and speak slowly and clearly.</li>
          <li>When connected to 119, provide the following information to the operator:</li>
          <li>Provide the location of the injured person:
            <ul>
              <li>For accidents occurring during hiking, it is effective to provide the number of the nearby mountain guide sign.</li>
              <li>If you cannot see the mountain guide sign, ask nearby hikers for help.</li>
              <div class="text-center pa-3" style="width: 100%;">
                <img src="/boramae/contents/image/info_live_disaster_mountain_01.jpg" alt="Mountain guide sign with location number and name" style="width: 500px;">
              </div>
              <li>When describing the accident location, use terms like E24 or 31-04 to specify the point.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>Clearly describe the details of the accident and the extent of the injuries.</li>
          <li>Provide your phone number and name, as continuous updates about the injured person will be needed.</li>
          <li>Since it takes time for the 119 rescue team to arrive, keep the injured person calm by talking to them and maintain their warmth while waiting for the rescue team.</li>
          <li>In the event of a rescue situation, moving downhill on your own can make things more difficult. It is better to stay in place and wait for the rescue team to arrive.</li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 4">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">First Aid for Hiking Emergencies</h2>
      <div class="bg-layer-2">
        Fractures that commonly occur during hiking may not be a major issue, but secondary damage such as infections can be problematic. Improper treatment can lead to shock or death. Additionally, mishandling fractures can result in incomplete fractures becoming complete fractures, or partial disabilities becoming complete disabilities, so caution is necessary.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Fractures</h2>

      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Symptoms</p>
            Simple fractures: The broken area may feel numb, painful, and swollen. The fractured part may become deformed, and the body part below the fracture may be immobile. (Note that the damaged area can still be moved as the bone may not be completely broken.) Compound fractures: In addition to the symptoms of simple fractures, the broken bone may pierce the skin, leading to wounds and severe bleeding. If there is a wound at the fracture site, it is considered a compound fracture.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">First Aid Precautions</p>
            Ensure no further damage occurs. The most important treatment for simple fractures is to prevent them from becoming compound fractures. It is advisable to request professional emergency medical personnel on-site for treatment if possible.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">First Aid</p>
            Avoid touching the injured area or moving the patient unnecessarily. (Prevent the broken bone from damaging nerves, blood vessels, muscles, or piercing the skin to cause a compound fracture.) Take measures to prevent further shock and ensure that the fractured area remains immobile before transportation.
            <div class="bg-gap-3"></div>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center" style="width: 210px;">
                <img src="/boramae/contents/image/info_live_disaster_mountain_02.jpg" alt="Wrapping a bandage around the hand, first wrap the area excluding the thumb and cross it up to the wrist." style="width: 97%;">
                <div>Hand Wrapping: Method 1</div>
              </div>
              <div class="text-center" style="width: 210px;">
                <img src="/boramae/contents/image/info_live_disaster_mountain_03.jpg" alt="Wrap from the wrist up, crossing it over to the back of the hand." style="width: 97%;">
                <div>Hand Wrapping: Method 2</div>
              </div>
              <div class="text-center" style="width: 210px;">
                <img src="/boramae/contents/image/info_live_disaster_mountain_04.jpg" alt="Wrap around elbows or knees, starting from the joint and going up and down." style="width: 97%;">
                <div>Elbow or Knee Wrapping</div>
              </div>
              <div class="text-center" style="width: 210px;">
                <img src="/boramae/contents/image/info_live_disaster_mountain_05.jpg" alt="Wrap from the top of the foot and cross towards the ankle." style="width: 97%;">
                <div>Ankle Wrapping</div>
              </div>
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Splint Usage</p>
            <ul>
              <li>The splint should be long enough to extend beyond both joints above and below the fracture.</li>
              <li>The splint should be wide enough for the injured body part.</li>
              <li>Use a soft material on the inside to avoid skin damage and ensure the splint is firm and stable.</li>
              <li>Sometimes, makeshift splints like rolled newspapers, magazines, blankets, or pillows are used to immobilize the patient.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">General Principles for Transporting Fracture Patients</p>
            <ul>
              <li>Always apply a splint before transporting.</li>
              <li>Do not attempt to realign broken bones.</li>
              <li>Ensure all necessary materials are prepared before applying the splint.</li>
              <li>If possible, do not move the injured person.</li>
              <li>Provide first aid for shock.</li>
              <li>If there is no time to apply a splint or if immediate transport is needed, use one hand to support the upper part of the fracture and the other hand to support the lower part, as much as possible.</li>
              <li>If needed, transport the patient carefully to avoid additional injury.</li>
              <li>There is no need to rush to apply a splint before quickly transporting the patient to a doctor or hospital (do not hurry).</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Essential First Aid Supplies and Tools for Hiking</p>
            <div class="bg-gap-3"></div>
            <table class="nor_table_center">
              <caption class="sr-only">Essential First Aid Supplies and Tools for Hiking table</caption>
              <thead>
                <tr>
                  <th scope="col">Day Trip</th>
                  <th scope="col">Multi-day Trip</th>
                  <th scope="col">Rock Climbing/Ascents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Disposable Bandages</td>
                  <td>Medicines for Day Trips</td>
                  <td>Bandage (3 inches)</td>
                </tr>
                <tr>
                  <td>Aspirin</td>
                  <td>Digestive Medicine</td>
                  <td>Disposable Bandages</td>
                </tr>
                <tr>
                  <td>Antibiotic Ointment</td>
                  <td>Anti-diarrheal Medicine</td>
                  <td>Gauze Bandage</td>
                </tr>
                <tr>
                  <td>Hydrogen Peroxide (Disinfectant)</td>
                  <td>Painkillers</td>
                  <td>Elastic Bandage (2, 3 inches)</td>
                </tr>
                <tr>
                  <td>Bandages</td>
                  <td>Table Salt</td>
                  <td>Triangle Bandage</td>
                </tr>
                <tr>
                  <td>Gauze Bandage</td>
                  <td>Cold Medicine</td>
                  <td>Thermometer</td>
                </tr>
                <tr>
                  <td>Elastic Bandage</td>
                  <td>Mercurochrome</td>
                  <td>Disposable Gloves</td>
                </tr>
                <tr>
                  <td>Triangle Bandage</td>
                  <td>Alcohol Disinfectant</td>
                  <td>Multipurpose Knife</td>
                </tr>
                <tr>
                  <td>Multipurpose Knife</td>
                  <td>Iodine Disinfectant</td>
                  <td>Emergency Light</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Tourniquet</td>
                  <td>Sleeping Bag (Sleeping Bag Cover)</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Muscle Massage Lotion</td>
                  <td>Auxiliary Rope (20M)</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Antihistamines</td>
                  <td>Knife, Scissors, Tweezers, Saw, etc.</td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab : 0,
      zTab : [
        {value : 0, name : "Walking During Hiking"},
        {value : 1, name : "Hiking Boot Information"},
        {value : 2, name : "Guidelines for Thunderstorms"},
        {value : 3, name : "How to Report to 119"},
        {value : 4, name : "First Aid Guidelines for Hiking"},
      ]
    };
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount(){
  },

  methods : {    
    moveTab(currentIndex, direction) {
      let newIndex = currentIndex + direction;
      if (newIndex < 0) {
        newIndex = this.zTab.length - 1; // 처음에서 왼쪽 누르면 마지막으로 이동
      } else if (newIndex >= this.zTab.length) {
        newIndex = 0; // 마지막에서 오른쪽 누르면 처음으로 이동
      }

      const newTab = this.zTab[newIndex];
      this.goTab(newTab);

      // 이동한 탭에 focus 적용
      this.$nextTick(() => {
        this.$el.querySelectorAll("[role='tab']")[newIndex].focus();
      });
    },

    goTab(data) {
      // Web에서 하드코딩된 페이지 중 콘텐츠에서 Tab 누를 때 접속 로그 쌓기
      this.$store.commit('SetEnterContent', {
        cPath : this.$route.path,
        iIndex : data.value,
      });
      this.tab = data.value;
    },
  },
};
</script>