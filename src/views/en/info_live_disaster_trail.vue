<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040404') }}</h1>

    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button :title="(item.value == tab?'선택됨':'')" v-for="(item, i) in zTab" :key="i" :class="(item.value == tab ? 'sel_box_btn' : 'nor_box_btn') + ' center_all'"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{ item.name }}
      </button>
    </div>


    <div class="bg-gap-2"></div>
    <div v-if="tab == 0">
      <h2 class="title-xlarge">Emergency Rescue Stations</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Operating Procedure</p>
            <ul>
              <li>
                Contact by phone in case of an emergency
                <ul>
                  <li>Dobong Fire Station Control Room: 02) 954-3119</li>
                  <li>Dobong Mountain Management Office: 02) 954-2566</li>
                </ul>
              </li>
              <div class="bg-gap-3"></div>
              <li>When calling, provide personal information and record the used medicines, then notify the password</li>
              <li>Citizens should lock the key after using the medicine</li>
              <li>Mountain rescue teams and safety officers from the management office will check the site and replenish supplies the next day</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Supplied Medicines</p>
            Elastic bandage, Band-Aids, Air spray, Adhesive bandages, Povidone (disinfectant), Alcohol pads, Dressing pads, etc.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Location of Emergency Rescue Stations in Dobongsan (Overall)</p>
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_trail_01_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Dobongsan First Aid Kit Locations: 7 Places</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Near Geobuksaem</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-11</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Near Madang Rock</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-12</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Bottom of Shinsendae (Cable Car Terminal)</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-13</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Bomun Ridge (Fire Surveillance Camera)</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-14</li>
                  </ul>
                </div>
              </div>
              
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Dobong Ju Ridge (Near Helicopter Landing Site)</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-15</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_07.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Uwi Ridge (Near the Intersection)</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-16</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_08.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Darak Ridge (Near Eunsokam)</li>
                    <li>Managed by: Dobongsan Management Office, Dobong Fire Station</li>
                    <li>Management Number: 84-17</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <h2 class="title-xlarge">Emergency Rescue Stations</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Operating Procedure</p>
            <ul>
              <li>
                Contact by phone in case of an emergency
                <ul>
                  <li>Dobong Fire Station Control Room: 02) 954-3119</li>
                  <li>Dobongsan Management Office: 02) 954-2566</li>
                </ul>
              </li>
              <div class="bg-gap-3"></div>
              <li>When calling, provide personal information and record the used medicines, then notify the password</li>
              <li>Citizens should lock the key after using the medicine</li>
              <li>Mountain rescue teams and safety officers from the management office will check the site and replenish supplies the next day</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Supplied Medicines</p>
            Elastic bandage, Band-Aids, Air spray, Adhesive bandages, Povidone (disinfectant), Alcohol pads, Dressing pads, etc.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Emergency Rescue Stations in Samgaksan (Bukhan Mountain) (Overall)</p>
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_trail_02_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Samgaksan (Bukhan Mountain) First Aid Kit Locations: 3 Places</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_02_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Wimun</li>
                    <li>Managed by: Korea National Park Service Bukhan Mountain Office</li>
                    <li>Management Number: 2008-1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_02_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Bukhan Mountain Shelter</li>
                    <li>Managed by: Korea National Park Service Bukhan Mountain Office</li>
                    <li>Management Number: 2008-2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_02_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Daedongmun</li>
                    <li>Managed by: Korea National Park Service Bukhan Mountain Office</li>
                    <li>Management Number: 2008-3</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 2">
      <h2 class="title-xlarge">Emergency Rescue Stations</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Operating Procedure</p>
            <ul>
              <li>
                Contact by phone in case of an emergency
                <ul>
                  <li>Nowon District Office (Parks and Greenery Department): 02) 2116-3951</li>
                  <li>Special Rescue Team: 02) 3706-1282</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Supplied Medicines</p>
            Elastic bandage, Band-Aids, Air spray, Adhesive bandages, Povidone (disinfectant), Alcohol pads, Dressing pads, etc.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Emergency Rescue Stations in Suraksan (Overall)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_03_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Suraksan First Aid Kit Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_03_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Suraksan Guiimbong Helicopter Pad Area</li>
                    <li>Managed by: Nowon Fire Station Response Management Division (Rescue and First Aid Team)</li>
                    <li>Management Number: 6</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_03_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Suraksan Yonggulam Area</li>
                    <li>Managed by: Nowon Fire Station Response Management Division (Rescue and First Aid Team)</li>
                    <li>Management Number: 8</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Mountain Information Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Suraksan Mountain Information Signage Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_03_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Location: Suraksan Tank Rock Area</li>
                    <li>Sign Name: E25</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="text-center mt-2">
        <div class="cmm-blind-text">
          <p>
            관악산 위치표지판 및 응급구조함 현황
            위치 표지판<br>
            설치지역 : 관악산, 삼성산 일대<br>
            설치현황 : 84개소(K-1호 ~ K-84호)<br>
            시설점검 : 봄, 가을 산악안전 대비 정검기간
          </p>
          <table>
            <caption>설치현황 : 7개소 (21호 ~ 27호)</caption>
            <thead>
              <tr>
                <th scope="col">연번</th>
                <th scope="col">응급구조함번호</th>
                <th scope="col">위치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>21호</td>
                <td>마당바위(군인아파트 출발 1.4km) 산악위치표지판 K8</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>22호</td>
                <td>선유천 약수터(군인아파트 출발 0.55km) 산악위치표지판 K4</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>23호</td>
                <td>곰바위(제2광장 출발 0.8km) 산악위치표지판 K63</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>24호</td>
                <td>연주샘(공학관 출발 0.9km) 산악위치표지판 K31</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>25호</td>
                <td>삼거리(공학관 출발 1.3km) 산악위치표지판 K58</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>26호</td>
                <td>연주대(제2광장 출발 1.3km) 산악위치표지판 K22</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>27호</td>
                <td>국기봉(삼막사정상 출발 0.45km) 산악위치표지판 K48</td>
              </tr>
            </tbody>
          </table>

          <table>
            <caption>비치물품 현황(압박붕대 등 14종 16점</caption>
            <thead>
              <tr>
                <th scope="col">연번</th>
                <th scope="col">비치물품</th>
                <th scope="col">수량</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>압박붕대</td>
                <td>2</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>에어파스</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>반창고</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>마데카솔</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>멘소래담</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>핀셋</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>거즈</td>
                <td>2</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>장갑</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>밴드</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td>포비돈</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">11</th>
                <td>식염수</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">12</th>
                <td>가위</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">13</th>
                <td>부목</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">14</th>
                <td>로프</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
          <p>
            운영방식<br>
            응급상황 발생시 관악소방서 상황실 (02-874-8119)로 연락<br>
            관악소방서 상황실 : 인적사항 및 연락처 기재 후 비밀번호 알림<br>
            응급물품 사용 후 열쇠 잠금<br>
            관악구청 및 의용소방대원 익일 응급물품 보충<br>
            구조대원 봄, 가을 / 의용소방대원 매월 정기점검 실시
          </p>
          <p>
            관악산 안전지도 관리카드
            산 이름 : 관악산, 삼성산<br>
            높이 : 632.2m<br>
            면적 : 19.22km2<br>
          </p>
          <p>
            안전시설물 현황<br>
            주요등산로 : 10, 간이구조구급함 : 7, 위치표시판 : 84, 국가지점번호 : 84, 헬리포트 : 7
          </p>
          <p>인근 소방서(거리)<br>소방서(서초소방서 4.1km 관음사 기준, 금천소방서 4.5km 호압사 기준), 119안전센터(방배119안전센터 1.4km 관음사 기준, 시흥119안전센터 2.8km 호압사 기준)</p>
          <p>
            주요 위험지역등 : 29~32 험한 암릉코스로 위험, 20~23 밧줄을 잡고 올라가는 코스
          </p>
        </div>
        <img src="/boramae/contents/image/info_live_disaster_trail_04_00.png" alt="" style="width: 80%;">
        <img src="/boramae/contents/image/info_live_disaster_trail_04_01.png" alt="" style="width: 80%;">
        <img src="/boramae/contents/image/info_live_disaster_trail_04_02.png" alt="" style="width: 80%; margin-top: -8px; margin-left: -2.5px;">
        <img src="/boramae/contents/image/info_live_disaster_trail_04_03.png" alt="" style="width: 80%;">
        <img src="/boramae/contents/image/info_live_disaster_trail_04_04.png" alt="" style="width: 80%;">
        <img src="/boramae/contents/image/info_live_disaster_trail_04_05.png" alt="" style="width: 80%;">
        <img src="/boramae/contents/image/info_live_disaster_trail_04_06.png" alt="" style="width: 80%; margin-top: -8px; margin-left: 4.5px;">
      </div>
      <div>
        <ul><li>The original safety map is uploaded in [News, Announcements - Post No. 580].</li></ul>
      </div>
    </div>


    <div v-if="tab == 4">
      <h2 class="title-xlarge">Emergency Rescue Stations</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Operating Procedure</p>
            <ul>
              <li>
                In case of an emergency, contact by phone
                <ul>
                  <li>Nowon District Office (Parks and Greenery Division): 02) 2116-3951</li>
                  <li>Special Rescue Team: 02) 3706-1282</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Supplied Items</p>
            Elastic bandages, Band-Aids, Air spray, Bandages, Povidone (disinfectant), Alcohol pads, Dressing pads, etc.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Emergency Rescue Stations Installation Locations on Bulamsan (Overall)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_05_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Bulamsan Rescue Stations Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_05_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Near Bonghwadae Helicopter Pad on Bulamsan</li>
                    <li>Management Authority: Nowon Fire Station Response Management Division (Rescue and First Aid Team)</li>
                    <li>Management Number: 7</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_05_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Near the Waterfall Spring on Bulamsan</li>
                    <li>Management Authority: Nowon Fire Station Response Management Division (Rescue and First Aid Team)</li>
                    <li>Management Number: 8</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Bulamsan Mountain Trail Signage Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_05_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Near Yeongsin Rock on Bulamsan</li>
                    <li>Sign Name: F9</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 5">
      <h2 class="title-xlarge">Emergency Rescue Stations</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Operating Procedure</p>
            <ul>
              <li>
                In case of an emergency, contact by phone
                <ul>
                  <li>Seocho District Office (Parks and Greenery Division): 02) 2155-6867</li>
                  <li>Army 8637 Unit: 02) 570-6396</li>
                  <li>Seocho Police Station: 02) 533-0315</li>
                  <li>Cheonggye Mountain Greenery Post: 02) 570-6709</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Supplied Items</p>
            Elastic bandages, Band-Aids, Air spray, Bandages, Povidone (disinfectant), Alcohol pads, Dressing pads, etc.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Emergency Rescue Stations Installation Locations on Umyeonsan (Overall)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_06_01.gif" alt="" style="width: 600px;">
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Umyeonsan Mountain Trail Signage Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Umyeonsan</li>
                    <li>Sign Name: D1 Yaksureo Viewpoint</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Umyeonsan</li>
                    <li>Sign Name: D2 Daesung Spring</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Umyeonsan</li>
                    <li>Sign Name: D3 Deogwooam Spring</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Umyeonsan</li>
                    <li>Sign Name: D4 Wijeom Spring</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Umyeonsan</li>
                    <li>Sign Name: D5 Beomba Spring</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 6">
      <h2 class="title-xlarge">Emergency Rescue Boxes</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Operating Procedure</p>
            <ul>
              <li>
                Contact via mobile phone in case of an emergency
                <ul>
                  <li>Seocho District Office (Park and Greenery Division): 02) 2155-6867</li>
                  <li>Army 8637 Unit: 02) 570-6396</li>
                  <li>Seocho Police Station: 02) 533-0315</li>
                  <li>Cheonggyesan Greenery Checkpoint: 02) 570-6709</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Contents of Emergency Kit</p>
            Elastic bandages, Band-Aids, Air spray, Plasters, Povidone (disinfectant), Alcohol wipes, Dressing pads, etc.
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Locations of Emergency Rescue Boxes in Cheonggyesan (Overall)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_07_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Cheonggyesan Emergency Kit Installation Locations</p>

            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan Wontergol Rest Area</li>
                    <li>Management Entity: Seocho District Office Park and Greenery Division</li>
                    <li>Management Number: 41</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan Cheonggyegol Spring</li>
                    <li>Management Entity: Seocho District Office Park and Greenery Division</li>
                    <li>Management Number: 42</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Cheonggyesan Mountain Trail Signage Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_11.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C1 Maebong</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_12.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C2 Oknyebong</li>
                  </ul>
                </div>
              </div>
              
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_13.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C3 Baram Spring</li>
                  </ul>
                </div>
              </div>
              
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_14.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C4 Oknyebong Spring Junction</li>
                  </ul>
                </div>
              </div>
              
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_15.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C5 Wonter Spring</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_16.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C6 Maebong Crossroads</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_17.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C7 Maebong Crossroads</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_18.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C8 Old Village Lacquer Tree</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_19.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C9 Cheonggyegol Spring</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_20.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C10 Gwannyeonsa Intersection</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_21.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C11 Maebong Entrance</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_22.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C12 Wontergol Pavilion</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_23.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C13 Prayer Mountain Entrance</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_24.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C14 Gyeongnamsa Entrance</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_25.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheonggyesan</li>
                    <li>Sign Name: C15 Gwannyeonsa Entrance</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <div v-if="tab == 7">
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Dae-mo Mountain Trail Signage Installation Locations</p>

            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Gungma Village Trail</li>
                    <li>Sign Name: I1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Neobjeok Rock</li>
                    <li>Sign Name: I2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Seongji Spring</li>
                    <li>Sign Name: I3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Dae-mo Mountain Summit</li>
                    <li>Sign Name: I4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Fire Communication Relay Tower</li>
                    <li>Sign Name: I5</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Daecheon Spring</li>
                    <li>Sign Name: I6</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 8">
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Guryongsan Trail Signage Installation Locations</p>

            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Cheon-ui Spring Junction</li>
                    <li>Sign Name: J1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Gaemam Spring Three-Way Junction</li>
                    <li>Sign Name: J2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Guryongsan Summit</li>
                    <li>Sign Name: J3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Guryong Spring Junction</li>
                    <li>Sign Name: J4</li>
                  </ul>
                </div>
              </div>
              
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 9">
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Achasan Mountain Accident Location Map</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_10_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Achasan Trail Signage Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Daeseongam Entrance</li>
                    <li>Sign Name: H1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Yongmasan 2nd Helipad</li>
                    <li>Sign Name: H3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Between 2nd and 3rd Helipads</li>
                    <li>Sign Name: H-3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Triangulation Point Summit</li>
                    <li>Sign Name: H-4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Between H17 Point and below Triangulation Point Summit</li>
                    <li>Sign Name: H4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Behind Film Studio Trail Iron Tower</li>
                    <li>Sign Name: H5</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_07.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Ginkgo Trail 4th Ridge Cheongnyong Spring</li>
                    <li>Sign Name: H7</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_08.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: 100-150m Below Yongmasan Pavilion</li>
                    <li>Sign Name: H8</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_09.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: SK Apartments Behind Yongma Spring Road 1.5km Point</li>
                    <li>Sign Name: H9</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_10.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: SK Apartments Behind Yongma Spring Road 1.5km Point</li>
                    <li>Sign Name: H-9</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_11.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Yongmasan 3rd Helipad</li>
                    <li>Sign Name: H10</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_12.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Ginkgo Trail 3rd Ridge Ginkgo Spring</li>
                    <li>Sign Name: H12</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_13.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: 4th Fortress Rest Area</li>
                    <li>Sign Name: H14</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_14.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Behind Daewon Foreign Language High School Iron Tower</li>
                    <li>Sign Name: H15</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_15.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Iron Tower Above 2nd Fortress</li>
                    <li>Sign Name: H16</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_16.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Yongmasan Pavilion to Triangulation Point Summit Midway</li>
                    <li>Sign Name: H17</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 10">
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Ansansan Mountain Accident Location Map</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_11_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Ansansan Trail Signage Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Bongsudae</li>
                    <li>Sign Name: B1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Baegam Spring</li>
                    <li>Sign Name: B2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Ancheon Spring</li>
                    <li>Sign Name: B3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Muwakjeong</li>
                    <li>Sign Name: B4</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 11">
      <h2 class="title-xlarge">Mountain Trail Signage</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">Inwangsan Mountain Accident Location Map</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_12_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">Inwangsan Trail Signage Installation Locations</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Behind Byeongpung Rock</li>
                    <li>Sign Name: A1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Inwangsan Summit</li>
                    <li>Sign Name: A2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Inwangsan Summit Intersection</li>
                    <li>Sign Name: A3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Left Fortress Wall Entrance</li>
                    <li>Sign Name: A4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width: 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>Installation Location: Left Ridge Path of the Summit</li>
                    <li>Sign Name: A5</li>
                  </ul>
                </div>
              </div>

            </div>
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
      { "value": 0, "name": "Dobongsan" },
      { "value": 1, "name": "Samgaksan(Bukhansan)" },
      { "value": 2, "name": "Suraksan" },
      { "value": 3, "name": "Gwanaksan" },
      { "value": 4, "name": "Bulamsan" },
      { "value": 5, "name": "Umyeonsan" },
      { "value": 6, "name": "Cheonggyesan" },
      { "value": 7, "name": "Daemosan" },
      { "value": 8, "name": "Guryongsan" },
      { "value": 9, "name": "Achasan" },
      { "value": 10, "name": "Ansan" },
      { "value": 11, "name": "Inwangsan" }
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