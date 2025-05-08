<template>
  <div class="no-select">
    <v-overlay :z-index="5000" :value="bIng" :opacity="1" :absolute="true" color="#ffffffC0">
      <v-progress-circular indeterminate size="80" color="black"></v-progress-circular>
    </v-overlay>
    <div tabindex="0" id="MapView" style="background:#000000;" @mouseup="onMouseUp" 
          @mousedown="onMouseDown"
         @mousemove="onMouseMove"
         @mouseleave="onMouseLeave" 
         @blur="goFocus(false)" @focus="goFocus(true) " :class="isFocus?'focusBox':'nonfocusBox'">
      <div id="ui" :style="'position:absolute; z-index: 1; width:'+windowWidth+'px; height: '+windowHeight+'px;overflow:hidden;'" >
        <div style="position:absolute; z-index: 2;">
          <div v-for="(item, i) in zUI_POI_View" :key="'POI_'+i">
            <div v-if="!item.isText && cNowFloorId == item.cFloorId" class="poi_ui" :style="'position:absolute; left:'+(item.iUi_x-30).toString()+'px; top: '+(item.iUi_y-80).toString()+'px; '" >
              <button :class="item.isSel?'animated-image':''" style="height:70px;  overflow: hidden; cursor: default;" tabindex="-1" @focus="onFocusId(item.cPOIId)" :ref="'POI_Ref_' + item.cPOIId" :aria-label="item.cNm + ' 열기'" @click="onClickPOI(item.cPOIId)">
                <img :src="'/boramae/poi/poi_'+(item.isSel?'sel':'nor')+'.svg'" alt="" style="width: 60px;  ">
                <img :src="'/boramae/poi/'+item.cType+'.svg'" style="position: relative; left:-1px; top:-67px; width: 36px;" alt="">
              </button>
            </div>
            <div v-if="item.isText && cNowFloorId == item.cFloorId" class="poi_ui no-select" :style="'position:absolute; left:'+(item.iUi_x-15).toString()+'px; top: '+(item.iUi_y-42).toString()+'px;'" aria-hidden="true">
              <div :class="item.isSel?'animated-image':'' + ' mouse-cur'" style="height:30px; width:30px;  overflow: hidden;" >
              </div>
            </div>
          </div>
        </div>
        <svg :width="windowWidth" :height="windowHeight" aria-hidden="true">
          <g v-for="(item, i) in zUI_POI_View" :key="'POS_Text_' + i" >
            <text v-if="cNowFloorId == item.cFloorId" :class="(item.isSel?'animated-image':'')+ ' label_css_ui '" :x="item.iUi_x" :y="item.iUi_y" text-anchor="middle" :id="'map_'+item.cPOIId" @keydown.enter="onPOIClick(item)">{{item.cNm}}</text>
          </g>
        </svg>
      </div>
    </div>
    <!-- <div tabindex="0" id="MapView" style="background:#000000;" @mouseup="onMouseUp" 
          @mousedown="onMouseDown"
         @mousemove="onMouseMove"
         @mouseleave="onMouseLeave" 
         @blur="goFocus(false)" @focus="goFocus(true) " :class="isFocus?'focusBox':'nonfocusBox'">
      <div id="ui" :style="'position:absolute; z-index: 1; width:'+windowWidth+'px; height: '+windowHeight+'px;overflow:hidden;'" >
        <div style="position:absolute; z-index: 2;">
          <div v-for="(item, i) in zUI_POI_View" :key="'POI_'+i">
            <div v-if="!item.isText && cNowFloorId == item.cFloorId" class="poi_ui mouse-cur" :style="'position:absolute; left:'+(item.iUi_x-30).toString()+'px; top: '+(item.iUi_y-80).toString()+'px; '" >
              <button :class="item.isSel?'animated-image':''" style="height:70px;  overflow: hidden;" tabindex="0" @focus="onFocusId(item.cPOIId)" :ref="'POI_Ref_' + item.cPOIId" :aria-label="item.cNm + ' 열기'" @click="onClickPOI(item.cPOIId)">
                <img :src="'/boramae/poi/poi_'+(item.isSel?'sel':'nor')+'.svg'" alt="" style="width: 60px;  ">
                <img :src="'/boramae/poi/'+item.cType+'.svg'" style="position: relative; left:0px; top:-67px; width: 36px;" alt="">
              </button>
            </div>
            <div v-if="item.isText && cNowFloorId == item.cFloorId" class="poi_ui mouse-cur no-select" :style="'position:absolute; left:'+(item.iUi_x-15).toString()+'px; top: '+(item.iUi_y-42).toString()+'px;'" aria-hidden="true">
              <div :class="item.isSel?'animated-image':'' + ' mouse-cur'" style="height:30px; width:30px;  overflow: hidden;" >
              </div>
            </div>
          </div>
        </div>
        <svg :width="windowWidth" :height="windowHeight" aria-hidden="true">
          <g v-for="(item, i) in zUI_POI_View" :key="'POS_Text_' + i" >
            <text v-if="cNowFloorId == item.cFloorId" :class="(item.isSel?'animated-image':'')+ ' label_css_ui mouse-cur'" :x="item.iUi_x" :y="item.iUi_y" text-anchor="middle" :id="'map_'+item.cPOIId" @keydown.enter="onPOIClick(item)">{{item.cNm}}</text>
          </g>
        </svg>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

//이미지 드레그 방지
document.addEventListener('dragstart', function(event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

var fOldWidth = 0;
var fOldHeight = 0;

var container = null;
var scene = null;
var camera = null;

var renderer = null;
var controls = null;

var objMap = null;


var group = null;

export default {
  props: ["windowWidth", "windowHeight"],
  data() {
    return {
      isFocus : false,
      focusId : "",
      isDragging: false,
      startX : 0,
      startY : 0,
      iZoom : 0,
      bIng : true,
      isLoading : false,
      isBuilding : true,
      isInMap : true,
      zUI_TR : [],

      cNowFloorId : "",

      zMap : [],

      zPOI : [],
      zPOIBuffer : [],

      zUI_POI : [],
      zUI_POI_View : [],
      dialog : false,
      cSearch : "",
      zBufferSearchUser : [],
      zBufferSearchPOI : [],
      zBufferSearchTR : [],
      isUpdateWindow : false,

      HomePos : {
        Camera : { x:-0, y:80, z:100},
        // Camera : { x:-50, y:30, z:60},
        Ctrl : { x:0, y:0, z:0},
      },
      //HomePos : {
      //  Camera : { x:-10, y:85, z:80},
      //  Ctrl : { x:0, y:0, z:0},
      //},
    };
  },

  watch: {
  },

  mounted() {
    this.init();
    this.animate();
  },

  beforeUnmount(){
    controls.removeEventListener('change', this.ControlsChange);
  },

  methods: {    
    onClickPOI(id) {
      this.focusId = id;      
      for (let i = 0; i < this.zUI_POI_View.length; i++) {
        this.zUI_POI_View[i].isSel = false;

        if (this.zUI_POI_View[i].cPOIId == this.focusId) {
          this.zUI_POI_View[i].isSel = true;
        }
      }
      this.$emit("onClick", "POI", this.focusId);     
    },
    onFocusBack() {      
      const focusRef = this.$refs['POI_Ref_' + this.focusId];
      if (focusRef && focusRef[0]) {
        this.$nextTick(() => {
          focusRef[0].focus();
        });
      }

    },
    
    onFocusId(id) {
      this.focusId = id;      
    },


    onMouseDown(event) {
      this.isDragging = false;
      this.startX = event.clientX;
      this.startY = event.clientY;
    },
    onMouseMove(event) {
      if (event.buttons === 1) {  // 마우스 왼쪽 버튼이 눌린 상태
        this.isDragging = true;
      }
    },
    onMouseUp(event) {
      if (!this.isDragging) {
        this.onClick(event);
      }
      this.isDragging = false;
    },
    
    onMouseLeave(event) {
      this.isDragging = false;
    },


    panCamera(deltaX, deltaY) {
      const panSpeed = 0.5; // 이동 속도
      const offset = new THREE.Vector3();
      const direction = new THREE.Vector3();

      // 현재 카메라 방향 가져오기
      camera.getWorldDirection(direction);
      direction.crossVectors(camera.up, direction); // 방향 설정

      // 이동량 적용
      offset.copy(direction).multiplyScalar(deltaX * panSpeed);
      controls.target.add(offset);
      camera.position.add(offset);

      offset.copy(camera.up).multiplyScalar(deltaY * panSpeed);
      controls.target.add(offset);
      camera.position.add(offset);
    },

    init() {
      // this.InitHome();
      container = document.getElementById("MapView");

      container.addEventListener("keydown", (event) => {
        const zoomFactor = 1.1; 
        switch (event.key) {
          case "ArrowUp": // 앞으로 이동 (위쪽)
            this.panCamera(0, -1);
            event.preventDefault();    
            break;
          case "ArrowDown": // 뒤로 이동 (아래쪽)
            this.panCamera(0, 1);
            event.preventDefault();    
            break;
          case "ArrowLeft": // 왼쪽 이동 (마우스로 드래그한 것처럼)
            this.panCamera(-1, 0);
            event.preventDefault();    
            break;
          case "ArrowRight": // 오른쪽 이동 (마우스로 드래그한 것처럼)
            this.panCamera(1, 0);
            event.preventDefault();    
            break;
          case "+": // 확대 (휠 스크롤 up과 동일)
            controls.object.position.multiplyScalar(1 / zoomFactor);
            event.preventDefault();    
            break;
          case "-": // 축소 (휠 스크롤 down과 동일)
            controls.object.position.multiplyScalar(zoomFactor);
            event.preventDefault();    
            break;
        }
        controls.update();
      });


      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true; // 그림자 활성화
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);
      renderer.outputEncoding = THREE.sRGBEncoding;

      const pmremGenerator = new THREE.PMREMGenerator( renderer );
      // console.log(pmremGenerator);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x303030);

      scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;

      this.SetupCamera();


      const ambientLight = new THREE.AmbientLight(0xeeeeee); // 은은한 빛
      scene.add(ambientLight);

      this.SetupControls();


      renderer.autoClear = true;
      // this.GetZoom();

      this.resize();
      window.onresize = this.resize.bind(this);

      this.isUpdateWindow = true;
      this.resetTimeOut();

      let g = new THREE.SphereGeometry( 1, 32, 32);
      const material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false, transparent: false } );
      let mesh1 = new THREE.Mesh( g, material );
      mesh1.position.set(0,0,0);
      mesh1.userData.cType = "sel";

      group = new THREE.Group();
			scene.add( group );
    },

    onPOIClick(item) {
      this.$emit("onClick", "POI", item.cPOIId);
    },

    resetTimeOut(){
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.isUpdateWindow = false;
      }, 2000);
    },
     
    ClearDataItem(zData, _scene){
      for (var i = zData.length; i--;) {
        _scene.remove(zData[i]);
        zData.splice(i, 1); 
      }
      zData = [];
    },

    loadObj(path, cFloorId) {      
      const loader = new GLTFLoader();
      // loader.load('/map/gn_1F.gltf',
      loader.load(path,
          (gltf) => {
              const object = gltf.scene;
                object.traverse(function (child) {
                  if (child.isMesh) {
                      child.castShadow = true; // 모델의 각 메쉬에 그림자 활성화
                      child.receiveShadow = true; // 모델의 각 메쉬가 그림자 받기 활성화
                      
                      if (["wall_1","wall_2","wall_3","wall_4","wall_5","wall_6","wall_7","wall_8","wall_9","outline", "outline001", "out_wall"].includes(child.name)) {
                        child.material = new THREE.MeshBasicMaterial({
                            color: '#ffffff',
                        });
                        child.castShadow = true; // 모델의 각 메쉬에 그림자 활성화
                        child.receiveShadow = true; // 모델의 각 메쉬가 그림자 받기 활성화
                        child.material.transparent = true; // 투명도 활성화
                        child.material.opacity = 0.8; // 투명도 설정 (0.0부터 1.0까지)
                        
                        const edges = new THREE.EdgesGeometry(child.geometry);
                        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x444444 }));
                        child.add(line);
                      } else if (child.name === "plan") {
                        child.material = new THREE.MeshStandardMaterial({
                            // color: child.material.color,
                            color: "#707070",
                            metalness: 1,
                            roughness: 1
                        });

                      } else if (["bottom001","bottom002","bottom","bottom_1", "bottom_2","bottom_3", "bottom_4"].includes(child.name)) {
                      // } else if (child.name === "bottom.001") {
                        child.material = new THREE.MeshStandardMaterial({
                            // color: child.material.color,
                            color: "#909090",
                            metalness: 1,
                            roughness: 1
                        });
                        child.castShadow = true; // 모델의 각 메쉬에 그림자 활성화
                        child.receiveShadow = true; // 모델의 각 메쉬가 그림자 받기 활성화
                      } else {
                        child.material = new THREE.MeshStandardMaterial({                        
                          color: child.material.color,
                            metalness: 1,
                            roughness: 1
                        });
                      }
                  }
              });
              objMap = object;

              objMap.userData.cFloorId = cFloorId;
              objMap.scale.set(0.22, 0.22, 0.22);          
              objMap.visible = false;
              
              this.zMap.push(objMap);
              scene.add(objMap);
          },
          undefined,
          (error) => {
              console.error('An error happened', error);
          }
      );
    },

    changeBackgroundColor(fromColor, toColor, duration) {
      // 초기 색상과 목표 색상을 THREE.Color 객체로 생성
      const startColor = new THREE.Color(fromColor);
      const endColor = new THREE.Color(toColor);

      // 초기 색상값을 객체로 저장
      const colorObject = {
        r: startColor.r,
        g: startColor.g,
        b: startColor.b
      };

      // Tween 애니메이션 정의
      new TWEEN.Tween(colorObject)
        .to({
          r: endColor.r,
          g: endColor.g,
          b: endColor.b
        }, duration)
        .onUpdate(() => {
          // 업데이트마다 scene.background를 새로운 색상으로 설정
          scene.background = new THREE.Color(colorObject.r, colorObject.g, colorObject.b);
        })
        .start();
    },

    SetupCamera() {
      camera = new THREE.PerspectiveCamera(30, this.windowWidth / this.windowHeight, 0.1, 2000 );
			camera.position.set( 0, 100, 80 );
      scene.add(camera);  
    },

    SetupLight(...pos) {
      const color = 0xffffff;
      const intensity = 0.00005;
      // const light = new THREE.AmbientLight(color, intensity);
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(...pos);
      scene.add(light);
    },


    animate() {
      this.Reset2DPosition(this.zPOI, this.zPOIBuffer);

      for (let i = 0; i < this.zUI_POI.length; i++) {
        let xy = this.getScreenPositionCSS2(this.zUI_POI[i].position);
        this.zUI_POI[i].userData.iUi_x = xy.x;
        this.zUI_POI[i].userData.iUi_y = xy.y;
      }
      for (let i = 0; i < this.zUI_POI.length; i++) {
        for (let j = 0; j < this.zUI_POI_View.length; j++) {
          if (this.zUI_POI[i].userData.cSer == this.zUI_POI_View[j].cSer && this.zUI_POI[i].userData.cFloorId == this.zUI_POI_View[j].cFloorId) {
            this.zUI_POI_View[j].iUi_x = this.zUI_POI[i].userData.iUi_x;
            this.zUI_POI_View[j].iUi_y = this.zUI_POI[i].userData.iUi_y;
            break;
          }
        }
      }

      TWEEN.update();
      renderer.render(scene, camera);
			
      controls.update();

      if (this.isUpdateWindow) {
       requestAnimationFrame(this.animate);
      }
    },


    goFocus(data) {
      this.isFocus = data;
      this.resize();
    },

    resize() {
      setTimeout(() => {
        if (camera == null) {return}
        let iGap = 0; 
        if (this.isFocus) {
          iGap = 6;
        }

        camera.aspect = this.windowWidth / this.windowHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(this.windowWidth - iGap, this.windowHeight - iGap);

        requestAnimationFrame(this.animate);
        this.$forceUpdate();
      }, 10);

    },

    SetupControls() {
      controls = new OrbitControls( camera, document.getElementById("MapView") );
      
      controls.minDistance = 1;
      controls.maxDistance = 500; 
      controls.maxPolarAngle = Math.PI/2; 

      controls.target.set( 0, 0, 0 );
			controls.update();
			controls.enablePan = true;
			controls.enableDamping = true;
      controls.screenSpacePanning = false;
      controls.dampingFactor = 0.05;
      controls.addEventListener('change', this.ControlsChange);

      controls.update();
    },
   

    fadeObject(object, toOpacity, duration) {
      object.traverse(function (child) {
        if (child.isMesh) {
          const fromOpacity = { opacity: child.material.opacity };
          new TWEEN.Tween(fromOpacity)
            .to({ opacity: toOpacity }, duration)
            .onUpdate(() => {
              child.material.transparent = true;
              child.material.opacity = fromOpacity.opacity;
            })
            .start();
        }
      });
    },

    scaleObjectZ(object, toScaleZ, duration) {
    const fromScaleZ = { z: object.scale.z };

    new TWEEN.Tween(fromScaleZ)
      .to({ z: toScaleZ }, duration)
      .onUpdate(() => {
        object.scale.z = fromScaleZ.z;
      })
      .start();
    },

    iniMap() {
      camera.position.x = 0;
      camera.position.y = 0;
      camera.zoom = 1;
      fOldWidth = 0;
      fOldHeight = 0;
      this.SetResize();
    },

    SetResize() {
      setTimeout(() => {
        if (fOldWidth == this.windowWidth && fOldHeight == this.windowHeight) {
          return;
        }
        fOldWidth = this.windowWidth;
        fOldHeight = this.windowHeight;
        renderer.setSize(this.windowWidth, this.windowHeight);
        var iZoom = camera.zoom;
        camera = new THREE.OrthographicCamera(
          this.windowWidth / -100,
          this.windowWidth / 100,
          this.windowHeight / 100,
          this.windowHeight / -100,
          0.1,
          1000
        );
        camera.position.z = 1;
        camera.zoom = iZoom;
        camera.setViewOffset(
          this.windowWidth,
          this.windowHeight,
          0,
          0, 
          this.windowWidth,
          this.windowHeight,
        );
        controls = new OrbitControls(camera, renderer.domElement);

        controls.zoomSpeed = 1.2; 
        controls.panSpeed = 0.8; 
        controls.minDistance = 5; 
        controls.maxDistance = 100; 
        controls.screenSpacePanning = true; 
      }, 100);
    },

    getScreenPosition(p) {
      var xy = this.toScreenXY(p, camera);
      return xy;
    },
    toScreenXY(v_, camera_) {
      var p = new THREE.Vector3(v_.x, v_.y, v_.z);
      var vector = p.project(camera_);

      vector.x = Math.round((vector.x + 1) / 2 * this.windowWidth);
      vector.y = Math.round(-(vector.y - 1) / 2 * this.windowHeight);

      return { x: vector.x, y: vector.y };
    },

    getScreenPositionNor(p) {
      var xy = this.toScreenXYNor(p, camera);
      return xy;
    },

    toScreenXYNor(v_, camera_) {
      var p = new THREE.Vector3(v_.x, v_.y, v_.z);
      var vector = p.project(camera_);

      vector.x = Math.round((vector.x + 1) / 2 * this.windowWidth) - this.windowWidth / 2 + 15;
      vector.y = -1*(Math.round(-(vector.y - 1) / 2 * this.windowHeight) - this.windowHeight / 2) - 8;
      return { x: vector.x, y: vector.y };
    },

    
    iniMapFloor(zFloor) {
      for (let i = 0; i < zFloor.length; i++) {
        this.loadObj(zFloor[i].cPath, zFloor[i].cFloorId, zFloor.length == i + 1, zFloor[0].cFloorId);
      }
    },

    InitPOI(zPOI) {
      for (let i = 0; i < this.zUI_POI.length; i++) {
        this.zUI_POI.remove(this.zUI_POI[i]);
        this.zUI_POI.splice(i, 1);
      }

      for (let j = 0; j < zPOI.length; j++){
        let g = new THREE.SphereGeometry( 1, 1, 1);
        const material = new THREE.MeshBasicMaterial( { color: 0x333333, wireframe: false, transparent: false } );

        let mesh1 = new THREE.Mesh( g, material );
        mesh1.position.set(parseFloat(zPOI[j].x), 1, zPOI[j].y);
        // mesh1.position.set((parseFloat(zPOI[j].x) - MaxWidth) * fZoom1,1, (MaxHeight - parseFloat(zPOI[j].y)) * fZoom1);

        // mesh1.position.set(0,0,0);
        mesh1.userData.cType = "poi";
        mesh1.userData.cSer = parseInt(j);
        mesh1.userData.iUi_x = -100;
        mesh1.userData.iUi_y = -100;
        mesh1.userData.cNm = zPOI[j].cExpNm;
        mesh1.userData.cType = zPOI[j].cType;
        mesh1.userData.cPOIId = zPOI[j].cPOIId;
        mesh1.userData.cExpCdList = zPOI[j].cExpCdList;
        mesh1.userData.cFloorId = zPOI[j].cFloorId;
        mesh1.userData.isText = zPOI[j].isText;


        mesh1.visible = false;
        scene.add(mesh1);
        this.zUI_POI.push(mesh1);
      }
      
      for (let i = 0; i < this.zUI_POI.length; i++) {
        let a = {
          cType : this.zUI_POI[i].userData.cType,
          cSer : this.zUI_POI[i].userData.cSer,

          iUi_x : this.zUI_POI[i].userData.iUi_x,
          iUi_y : this.zUI_POI[i].userData.iUi_y,
          isText : this.zUI_POI[i].userData.isText,
          cNm : this.zUI_POI[i].userData.cNm,
          cType : this.zUI_POI[i].userData.cType,
          cPOIId : this.zUI_POI[i].userData.cPOIId,
          cExpCdList : this.zUI_POI[i].userData.cExpCdList,
          cFloorId : this.zUI_POI[i].userData.cFloorId,
        }
        this.zUI_POI_View.push(a);
      }

      this.ControlsChange();
    },


    onClick(event){
      const rect = event.target.getBoundingClientRect();

      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      var idx = -1;
      var distance = 999999;
      var sType = "";
      var sData = "";

      var point_width = 60;
      var point_top = 70;
      var point_bottom = 0;

      for (let i = 0; i < this.zUI_POI_View.length; i++) {
        this.zUI_POI_View[i].isSel = false;
      }

      this.ControlsChange();
      for (let i = 0; i < this.zUI_POI.length; i++) {
        if (this.zUI_POI[i].userData.cFloorId == this.cNowFloorId) {
          if ((clientX > this.zUI_POI[i].userData.iUi_x - point_width) && (clientX < this.zUI_POI[i].userData.iUi_x + point_width)){
            if ((clientY > this.zUI_POI[i].userData.iUi_y - point_top) && (clientY < this.zUI_POI[i].userData.iUi_y + point_bottom)){
              let now_dis = this.getDistance(this.zUI_POI[i].userData.iUi_x, this.zUI_POI[i].userData.iUi_y - 40, clientX, clientY);
              if (distance > now_dis){
                distance = now_dis;
                sType = "POI";
                idx = i;
                sData = this.zUI_POI[i].userData.cPOIId;
              }
            }
          }
        }
      }

      if (idx != -1) {
        this.zUI_POI_View[idx].isSel = true;
        this.focusId = this.zUI_POI_View[idx].cPOIId;        
        this.$emit("onClick", sType, sData);
      }
    },

    ControlsChange(){
      if (this.isUpdateWindow) {
        this.resetTimeOut();
      } else {
        this.isUpdateWindow = true;
        requestAnimationFrame(this.animate);
        this.resetTimeOut();
      }
    },

    getScreenPositionCSS2(vertices_){
      return this.toScreenXYCSS(vertices_, camera);
    },

    toScreenXYCSS(v_, camera_) {
      var p = new THREE.Vector3(v_.x, v_.y, v_.z);
      var vector = p.project(camera_);

      vector.x = Math.round((vector.x + 1) / 2 * this.windowWidth);
      vector.y = Math.round(-(vector.y - 1) / 2 * this.windowHeight);

      return { x: vector.x, y: vector.y };
    },

    getDistance( ax, ay, zx, zy ){
      var dis_x = ax - zx;
      var dix_y = ay - zy;
      var dist = Math.sqrt( Math.abs( dis_x * dis_x ) + Math.abs( dix_y * dix_y ) );
      return dist;
    },

    Reset2DPosition(zData, zDataBuffer) {
      for (let i = 0; i < zDataBuffer.length; i++) {
        var pos = new THREE.Vector3(zDataBuffer[i].position.x, zDataBuffer[i].position.y, zDataBuffer[i].position.z);
        var vector = pos.project(camera);
        vector.x = Math.round((vector.x) * this.windowWidth/2);
        vector.y = Math.round((vector.y) * this.windowHeight/2);
        if (zData[i] != null) {
        zData[i].position.set( vector.x, vector.y, 1 );
        }
      }
    },

    // InitHome(){
    //   var a = localStorage.getItem("DefaultHomePos.Camera.x");
    //   if (a == null) {
    //     this.goInitHome();
    //   } else {
    //     this.HomePos.Camera.x = localStorage.getItem("DefaultHomePos.Camera.x");
    //     this.HomePos.Camera.y = localStorage.getItem("DefaultHomePos.Camera.y");
    //     this.HomePos.Camera.z = localStorage.getItem("DefaultHomePos.Camera.z");
    //     this.HomePos.Ctrl.x = localStorage.getItem("DefaultHomePos.Ctrl.x");
    //     this.HomePos.Ctrl.y = localStorage.getItem("DefaultHomePos.Ctrl.y");
    //     this.HomePos.Ctrl.z = localStorage.getItem("DefaultHomePos.Ctrl.z");
    //   }
    // },
    
    // goSetHome(){
    //   this.HomePos.Camera.x = camera.position.x;
    //   this.HomePos.Camera.y = camera.position.y;
    //   this.HomePos.Camera.z = camera.position.z;
    //   this.HomePos.Ctrl.x = controls.target.x;
    //   this.HomePos.Ctrl.y = controls.target.y;
    //   this.HomePos.Ctrl.z = controls.target.z;

    //   console.log(this.HomePos);

    //   localStorage.setItem("DefaultHomePos.Camera.x", this.HomePos.Camera.x);
    //   localStorage.setItem("DefaultHomePos.Camera.y", this.HomePos.Camera.y);
    //   localStorage.setItem("DefaultHomePos.Camera.z", this.HomePos.Camera.z);

    //   localStorage.setItem("DefaultHomePos.Ctrl.x", this.HomePos.Ctrl.x);
    //   localStorage.setItem("DefaultHomePos.Ctrl.y", this.HomePos.Ctrl.y);
    //   localStorage.setItem("DefaultHomePos.Ctrl.z", this.HomePos.Ctrl.z);
    // },

    // goInitHome(){
    //   this.HomePos.Camera.x = DefaultHomePos.Camera.x;
    //   this.HomePos.Camera.y = DefaultHomePos.Camera.y;
    //   this.HomePos.Camera.z = DefaultHomePos.Camera.z;
    //   this.HomePos.Ctrl.x = DefaultHomePos.Ctrl.x;
    //   this.HomePos.Ctrl.y = DefaultHomePos.Ctrl.y;
    //   this.HomePos.Ctrl.z = DefaultHomePos.Ctrl.z;


    //   localStorage.setItem("DefaultHomePos.Camera.x", this.HomePos.Camera.x);
    //   localStorage.setItem("DefaultHomePos.Camera.y", this.HomePos.Camera.y);
    //   localStorage.setItem("DefaultHomePos.Camera.z", this.HomePos.Camera.z);

    //   localStorage.setItem("DefaultHomePos.Ctrl.x", this.HomePos.Ctrl.x);
    //   localStorage.setItem("DefaultHomePos.Ctrl.y", this.HomePos.Ctrl.y);
    //   localStorage.setItem("DefaultHomePos.Ctrl.z", this.HomePos.Ctrl.z);
    // },

    goHome(){
      // controls.reset();

      camera.position.set(camera.position.x,camera.position.y,camera.position.z+20);
      controls.target.set( 0, 0, 0 );
      TWEEN.removeAll();
      new TWEEN.Tween( camera.position )
      // .to( { x:0, y:9, z:0 }, 1000) 
      .to( { x: this.HomePos.Camera.x, y:this.HomePos.Camera.y, z:this.HomePos.Camera.z}, 1000)
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
      new TWEEN.Tween( controls.target )
      // .to( { x:0, y:9, z:0 }, 1000) 
      .to( { x:this.HomePos.Ctrl.x, y:this.HomePos.Ctrl.y, z:this.HomePos.Ctrl.z }, 1000) 
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
    },



    getHighlight(org, find) {
      var mystring = org;
      let regex = new RegExp(find, 'gi');
      let a = mystring.replace(regex, function(match) {
          return "<mark>" + match + "</mark>";
      });
      return a;
    },

    MoveToCenter3D(x, y, z, iDistanceZoom) {
      let dir = new THREE.Vector3();
      let vector = new THREE.Vector3();
      let cameraDir = camera.getWorldDirection(vector)
      dir.set(
        -(cameraDir.x) * iDistanceZoom + x,
        -(cameraDir.y) * iDistanceZoom + z,
        -(cameraDir.z) * iDistanceZoom + y,
      );
      let cameraP = new THREE.Vector3(dir.x, dir.y, dir.z);
      let ctrl = new THREE.Vector3(x, z, y);
      this.transform(cameraP, ctrl, camera, 1000 );
    },

    transform( pos, ctrl, object, duration ) {
			TWEEN.removeAll();

      new TWEEN.Tween( controls.target ) // controler (상하좌우이동)
        .to( { x: ctrl.x, y: ctrl.y, z: ctrl.z }, duration) // 목표지점
        .easing( TWEEN.Easing.Exponential.InOut ) // 자연스러운 이동모션
        .start(); // 즉시시작

      new TWEEN.Tween( object.position ) // 카메라 위치
        .to( { x: pos.x, y: pos.y, z: pos.z }, duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( this )
        .to( {}, duration )
        .onUpdate( this.render )
        .start();
		}, 
    render() {
      renderer.render(scene, camera);
    },


    goMap(data) {
      // for (let i = 0; i < this.zUI_POI.length; i++) {
      //   this.zUI_POI_View[i].isSel = false;
      //   if (this.zUI_POI[i].userData.cPOIId == data) {
      //     this.zUI_POI_View[i].isSel = true;
      //     this.MoveToCenter3D(this.zUI_POI[i].position.x, this.zUI_POI[i].position.z, this.zUI_POI[i].position.y, 100);
      //     this.ControlsChange();
      //   }
      // }
      for (let i = 0; i < this.zUI_POI.length; i++) {
        this.zUI_POI_View[i].isSel = false;
        const userData = this.zUI_POI[i].userData;
        const cExpCdList = userData?.cExpCdList;
        console.log("LIST::",cExpCdList, data);
        if (cExpCdList) {
          const cExpCdListArrary = this.zUI_POI[i].userData.cExpCdList.split(',').map(cd => cd.trim());
          if (cExpCdListArrary.includes(data)) {
            this.zUI_POI_View[i].isSel = true;
            this.MoveToCenter3D(this.zUI_POI[i].position.x, this.zUI_POI[i].position.z, this.zUI_POI[i].position.y, 100);
            this.ControlsChange();
            console.log("FIND::",cExpCdList, data);
          }
        }
      }
    },

    goFloor(cFloorId) {
      if (this.cNowFloorId != cFloorId) {
        this.cNowFloorId = cFloorId;

        for (let i = 0; i < this.zUI_POI_View.length; i++) {
          this.zUI_POI_View[i].isSel = false;
        }

        for (let i = 0; i < this.zMap.length; i++) {
          this.zMap[i].visible = false;

          if (this.zMap[i].userData.cFloorId == cFloorId) {
            this.zMap[i].visible = true;

            this.goHome();
          }
        }
        this.ControlsChange();
      }
    },
  }
}



</script>

<style>
  .ViewState {
    z-index: 1;
    position: absolute;
    cursor: pointer;
    left: 10px;
    top: 40px;
  }

  #ui {
    position:absolute;
    z-index: 2;
    /* background: #FF000020; */
  }

  .poi_ui {
    -webkit-user-select: none; /* Chrome, Safari */
    -moz-user-select: none;    /* Firefox */
    -ms-user-select: none;     /* Internet Explorer/Edge */
    user-select: none;

    -webkit-animation: moveSlideshow 2s ease-in-out 1;
    -moz-animation: moveSlideshow 2s ease-in-out 1;
    -o-animation: moveSlideshow 2s ease-in-out 1;
  }

  .label_css_ui{
    font-size: 14px;
    width: 200px;

    opacity: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -user-select: none;

    font-size : 15px;
    font-weight:900;
    text-shadow:
    -1px -1px 0 #FFFFFF,
    1px -1px 0 #FFFFFF,
    -1px 1px 0 #FFFFFF,
    1px 1px 0 #FFFFFF;

    fill: #222222;

    -webkit-animation: moveSlideshow 2s ease-in-out 1; 
    -moz-animation: moveSlideshow 2s ease-in-out 1;
    -o-animation: moveSlideshow 2s ease-in-out 1;
  }

  @keyframes moveSlideshow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .no-select {
    -webkit-user-select: none; /* Chrome, Safari */
    -moz-user-select: none;    /* Firefox */
    -ms-user-select: none;     /* Internet Explorer/Edge */
    user-select: none;         /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }


  .animated-image {
    border-radius: 10px; /* 선택 사항: 모서리를 둥글게 */
    animation: boxShadowPulse 2s infinite ease-in-out; /* 애니메이션 추가 */
  }

  @keyframes boxShadowPulse {
    0% {
        opacity: 1;
    }
    60% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  .focusBox {
    position: absolute;            
    top : -2px;
    left : -2px;
    border:dashed 4px #d50136 !important;     
  }

  .nonfocusBox {
    position: absolute;            
    top : 0px;
    left : 0px;
    border:none;     
  }


</style>

