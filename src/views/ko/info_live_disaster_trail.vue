<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040404') }}</h1>

    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </button>
    </div>

    <div class="bg-gap-2"></div>
    <div v-if="tab == 0">
      <h2 class="title-xlarge">응급구조함</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">운영방식</p>
            <ul>
              <li>
                응급상황 발생시 휴대폰으로 연락
                <ul>
                  <li>도봉소방서 상황실 : 02) 954-3119</li>
                  <li>도봉산관리사무소 : 02) 954-2566</li>
                </ul>
              </li>
              <div class="bg-gap-3"></div>
              <li>전화수보시 인적사항 및 사용약품 기재 후 비밀번호 알림</li>
              <li>시민이 직접 약품사용후 열쇠 잠금</li>
              <li>산악구조대 및 관리사무소 안전요원 익일 현장확인 후 약품보충</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">비치약품</p>
            탄력붕대, 밴드에이드, 에어스프레이, 반창고, 포비돈(소독약), 알콜솜, 드레싱 패드 등
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">도봉산 내 응급구조함 설치 위치(전체)</p>
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_trail_01_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">도봉산구급함 설치장소 : 7개소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 거북샘 부근</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-11호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 마당바위 부근</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-12호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 신선대 하단(케이블카 터)</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-13호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 보문능선(산불감시카메라)</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-14호</li>
                  </ul>
                </div>
              </div>
              
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 도봉주능선(헬기장 부근)</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-15호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_07.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 우이능선(삼거리 부근)</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-16호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_01_08.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 다락능선(은석암 부근)</li>
                    <li>관리주체 : 도봉산관리사무소, 도봉소방서</li>
                    <li>관리번호 : 84-17호</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <h2 class="title-xlarge">응급구조함</h2>
      <div class="bg-body">

        <ul>
          <li>
            <p class="font-bold">운영방식</p>
            <ul>
              <li>
                응급상황 발생시 휴대폰으로 연락
                <ul>
                  <li>도봉소방서 상황실 : 02) 954-3119</li>
                  <li>도봉산관리사무소 : 02) 954-2566</li>
                </ul>
              </li>
              <div class="bg-gap-3"></div>
              <li>전화수보시 인적사항 및 사용약품 기재 후 비밀번호 알림</li>
              <li>시민이 직접 약품사용후 열쇠 잠금</li>
              <li>산악구조대 및 관리사무소 안전요원 익일 현장확인 후 약품보충</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">비치약품</p>
            탄력붕대, 밴드에이드, 에어스프레이, 반창고, 포비돈(소독약), 알콜솜, 드레싱 패드 등
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">삼각산(북한산) 내 응급구조함 설치 위치(전체)</p>
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_trail_02_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">삼각산(북한산)구급함 설치장소 : 3개소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_02_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 위문</li>
                    <li>관리주체 : 국립공원관리공단 북한산사무소</li>
                    <li>관리번호 : 2008-1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_02_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 북한산대피소</li>
                    <li>관리주체 : 국립공원관리공단 북한산사무소</li>
                    <li>관리번호 : 2008-2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_02_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 대동문</li>
                    <li>관리주체 : 국립공원관리공단 북한산사무소</li>
                    <li>관리번호 : 2008-3</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 2">
      <h2 class="title-xlarge">응급구조함</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">운영방식</p>
            <ul>
              <li>
                응급상황 발생시 휴대폰으로 연락
                <ul>
                  <li>노원구청(공원녹지과) : 02) 2116-3951</li>
                  <li>특수구조대 : 02) 3706-1282</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">비치약품</p>
            탄력붕대, 밴드에이드, 에어스프레이, 반창고, 포비돈(소독약), 알콜솜, 드레싱 패드 등
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">수락산 내 응급구조함 설치 위치(전체)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_03_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">수락산 구급함 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_03_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 수락산 귀임봉 헬기장 부근</li>
                    <li>관리주체 : 노원소방서 대응관리과(구조구급팀)</li>
                    <li>관리번호 : 6호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_03_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 수락산 용굴암 부근</li>
                    <li>관리주체 : 노원소방서 대응관리과(구조구급팀)</li>
                    <li>관리번호 : 8호</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">수락산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_03_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 수락산 탱크바위 부근</li>
                    <li>표지판명 : E25</li>
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
        <ul><li>안전지도 원본은 [뉴스,소식 - 공지사항 580번 글]에 업로드 되어 있습니다.</li></ul>
      </div>
    </div>


    <div v-if="tab == 4">
      <h2 class="title-xlarge">응급구조함</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">운영방식</p>
            <ul>
              <li>
                응급상황 발생시 휴대폰으로 연락
                <ul>
                  <li>노원구청(공원녹지과) : 02) 2116-3951</li>
                  <li>특수구조대 : 02) 3706-1282</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">비치약품</p>
            탄력붕대, 밴드에이드, 에어스프레이, 반창고, 포비돈(소독약), 알콜솜, 드레싱 패드 등
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">불암산 내 응급구조함 설치 위치(전체)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_05_01.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">불암산 구급함 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_05_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 불암산 봉화대 헬기장 부근</li>
                    <li>관리주체 : 노원소방서 대응관리과(구조구급팀)</li>
                    <li>관리번호 : 7호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_05_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 불암산 폭포약수터 부근</li>
                    <li>관리주체 : 노원소방서 대응관리과(구조구급팀)</li>
                    <li>관리번호 : 8호</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">불암산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_05_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 불암산 영신바위 부근</li>
                    <li>표지판명 : F9</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 5">
      <h2 class="title-xlarge">응급구조함</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">운영방식</p>
            <ul>
              <li>
                응급상황 발생시 휴대폰으로 연락
                <ul>
                  <li>서초구청(공원녹지과) : 02) 2155-6867</li>
                  <li>육군8637부대 : 02) 570-6396</li>
                  <li>서초경찰서 : 02) 533-0315</li>
                  <li>청계산 녹지초소 : 02) 570-6709</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">비치약품</p>
            탄력붕대, 밴드에이드, 에어스프레이, 반창고, 포비돈(소독약), 알콜솜, 드레싱 패드 등
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">우면산 내 응급구조함 설치 위치(전체)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_06_01.gif" alt="" style="width: 600px;">
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">우면산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 우면산</li>
                    <li>표지판명 : D1 약수터길 전망대</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 우면산</li>
                    <li>표지판명 : D2 대성약수</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 우면산</li>
                    <li>표지판명 : D3 덕우암 약수</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 우면산</li>
                    <li>표지판명 : D4 위점약수</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_06_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 우면산</li>
                    <li>표지판명 : D5 범바위 약수</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 6">
      <h2 class="title-xlarge">응급구조함</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">운영방식</p>
            <ul>
              <li>
                응급상황 발생시 휴대폰으로 연락
                <ul>
                  <li>서초구청(공원녹지과) : 02) 2155-6867</li>
                  <li>육군8637부대 : 02) 570-6396</li>
                  <li>서초경찰서 : 02) 533-0315</li>
                  <li>청계산 녹지초소 : 02) 570-6709</li>
                </ul>
              </li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">비치약품</p>
            탄력붕대, 밴드에이드, 에어스프레이, 반창고, 포비돈(소독약), 알콜솜, 드레싱 패드 등
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">청계산 내 응급구조함 설치 위치(전체)</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_07_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">청계산 구급함 설치장소</p>

            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산 원터골 쉼터</li>
                    <li>관리주체 : 서초구청 공원녹지과</li>
                    <li>관리번호 : 41호</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산 청계골 약수터</li>
                    <li>관리주체 : 서초구청 공원녹지과</li>
                    <li>관리번호 : 42호</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">청계산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_11.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C1 매봉</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_12.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C2 옥녀봉</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_13.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C3 바람약수터</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_14.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C4 옥녀봉 약수터 갈림길</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_15.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C5 원터 약수</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_16.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C6 매봉 사거리</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_17.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C7 매봉 사거리</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_18.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C8 옛골 옻나무</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_19.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C9 청계골 약수터</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_20.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C10 관현사거리</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_21.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C11 매봉입구</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_22.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C12 원터골 정자</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_23.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C13 기도원 입구</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_24.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C14 경남사 입구</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_07_25.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 청계산</li>
                    <li>표지판명 : C15 관현사 입구</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 7">
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">대모산 산악안내표지판 설치장소</p>

            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 궁마을 등산로</li>
                    <li>표지판명 : Ｉ1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 넙적바위</li>
                    <li>표지판명 : Ｉ2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 성지약수터</li>
                    <li>표지판명 : Ｉ3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 대모산 정상</li>
                    <li>표지판명 : Ｉ4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 소방통신 중계탑</li>
                    <li>표지판명 : Ｉ5</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_08_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 대천약수터</li>
                    <li>표지판명 : Ｉ6</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 8">
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">구룡산 산악안내표지판 설치장소</p>

            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 천의약수터 갈림길</li>
                    <li>표지판명 : J1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 개암약수터 삼거리</li>
                    <li>표지판명 : J2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 구룡산 정상</li>
                    <li>표지판명 : J3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_09_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 구룡약수터 갈림길</li>
                    <li>표지판명 : J4</li>
                  </ul>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 9">
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">아차산 산악사고 위치표시 안내도</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_10_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">아차산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 대성암 입구</li>
                    <li>표지판명 : H1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 용마산 제2헬기장</li>
                    <li>표지판명 : H3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 제2헬기장과 제3헬기장 사이</li>
                    <li>표지판명 : H-3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 삼각점 정상</li>
                    <li>표지판명 : H-4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : H17지점과 삼각점 정상 아래</li>
                    <li>표지판명 : H4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_06.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 영화사 뒤 등산로 상 철탑</li>
                    <li>표지판명 : H5</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_07.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 긴고랑길 4부능선 청룡약수터</li>
                    <li>표지판명 : H7</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_08.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 용마산 팔각정 100~150m 아래</li>
                    <li>표지판명 : H8</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_09.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : SK아파트 뒤 용마약수터길 등산로 1.5Km지점</li>
                    <li>표지판명 : H9</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_10.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : SK아파트 뒤 용마약수터길 등산로 1.5Km지점</li>
                    <li>표지판명 : H-9</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_11.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 용마산 제3헬기장</li>
                    <li>표지판명 : H10</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_12.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 긴고랑길 3부능선 긴고랑 약수터</li>
                    <li>표지판명 : H12</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_13.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 4보루 쉼터</li>
                    <li>표지판명 : H14</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_14.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 대원외고 뒤 철탑</li>
                    <li>표지판명 : H15</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_15.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 2보루 위 철탑</li>
                    <li>표지판명 : H16</li>
                  </ul>
                </div>
              </div>
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_10_16.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 용마산 팔각정 ~ 삼각점 정상 방향 중간</li>
                    <li>표지판명 : H17</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 10">
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">안산 산악사고 위치표시 안내도</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_11_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">안산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 봉수대</li>
                    <li>표지판명 : B1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 백암약수터</li>
                    <li>표지판명 : B2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 안천약수터</li>
                    <li>표지판명 : B3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_11_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 무악정</li>
                    <li>표지판명 : B4</li>
                  </ul>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 11">
      <h2 class="title-xlarge">산악안내표지판</h2>
      <div class="bg-body">
        <ul>
          <li>
            <p class="font-bold">인왕산 산악사고 위치표시 안내도</p>
            <div class="text-center mt-2">
              <img src="/boramae/contents/image/info_live_disaster_trail_12_00.gif" alt="" style="width: 600px;">
            </div>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            <p class="font-bold">인왕산 산악안내표지판 설치장소</p>
            <div class="d-flex flex-wrap text-center">
              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_01.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 병풍바위 뒤</li>
                    <li>표지판명 : A1</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_02.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 인왕산 정상</li>
                    <li>표지판명 : A2</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_03.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 인왕천 정상 삼거리</li>
                    <li>표지판명 : A3</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_04.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 좌측성곽 입구</li>
                    <li>표지판명 : A4</li>
                  </ul>
                </div>
              </div>

              <div class="text-center pa-1 mb-4" style="width : 270px;">
                <img src="/boramae/contents/image/info_live_disaster_trail_12_05.jpg" alt="" style="width: 97%;">
                <div class="links-small text-left">
                  <ul>
                    <li>설치장소 : 정상좌측 능선길</li>
                    <li>표지판명 : A5</li>
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
        {value : 0, name : "도봉산"},
        {value : 1, name : "삼각산(북한산)"},
        {value : 2, name : "수락산"},
        {value : 3, name : "관악산"},
        {value : 4, name : "불암산"},
        {value : 5, name : "우면산"},
        {value : 6, name : "청계산"},
        {value : 7, name : "대모산"},
        {value : 8, name : "구룡산"},
        {value : 9, name : "아차산"},
        {value : 10, name : "안산"},
        {value : 11, name : "인왕산"},
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