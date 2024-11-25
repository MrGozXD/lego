import * as THREE from "three";
import { OrbitControls } from './libs/OrbitControls.js';
import { VRButton } from './libs/VRButton.js';
import { loadModels } from './models.js';
import dispStats from './debug.js';
import addUI from './ui.js';
import { shader_hatch, fragmentShader, vertexShader } from './shaders.js';

// Variables
let aspectRatio = (window.innerWidth / window.innerHeight * (1 / 0.6));
let scene, camera, renderer, controls, robotClock, connorClock, robotAndConnorClocks = [];

/*
const video = document.createElement('video');
video.src = './sources/videoDP.mp4';
video.loop = true;
//video.play();
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
*/
function addVideo() {
  const size = 3;
  const geometry = new THREE.PlaneGeometry((4 / 3) * size, size);
  const material = new THREE.MeshBasicMaterial({
    map: videoTexture
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.z = 4.75;
  plane.position.x = -0.75;
  plane.position.y = 1.75;
  plane.rotation.y = Math.PI;
  scene.add(plane);
}

//const statsContainer = document.getElementById("statsContainer");

function createRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
  renderer.setClearColor(0x000000, 1.0);
  document.body.appendChild(renderer.domElement);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = -5;
  camera.position.y = 2;
  camera.position.x = -3;
  controls = new OrbitControls(camera, renderer.domElement);
}

function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('grey');
}

function createClocks() {
  robotClock = new THREE.Clock();
  connorClock = new THREE.Clock();
  robotAndConnorClocks.push(robotClock);
  robotAndConnorClocks.push(connorClock);
}


function addAxesHelper() {
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);
}

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3);
//const directionalLightCube2 = new THREE.DirectionalLight(0xFFA500, 2);
//const spotlightScreen = new THREE.SpotLight(0x00ff00, 10);

function addLights() {

  // Ambient light
  ambientLight.castShadow = true;
  scene.add(ambientLight);

  // Directional light Orange outside room
  /*
  directionalLightCube2.position.set(4, 2, 4);
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLightCube2, 1);
  scene.add(directionalLightHelper);
  directionalLightCube2.castShadow = true;
  scene.add(directionalLightCube2);

  // Spotlight from the screen
  spotlightScreen.position.set(-0.75, 1.75, 4.75); //-2, 1, 4
  spotlightScreen.target.position.set(-0.75, 1.75, 0); //-2.3, 1, 1.4
  spotlightScreen.angle = Math.PI;
  spotlightScreen.decay = 2;
  spotlightScreen.distance = 10;
  */

  //const pointLightHelper = new THREE.SpotLightHelper(spotlightScreen, 1);
  //scene.add(pointLightHelper);
  //spotlightScreen.castShadow = true;
  //scene.add(spotlightScreen);
}

function addCube1() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  let uniforms = {
    colorB: { type: 'vec3', value: new THREE.Color(0xACB6E5) },
    colorA: { type: 'vec3', value: new THREE.Color(0x74ebd5) }
  }
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader()
  });
  const cube = new THREE.Mesh(geometry, shaderMaterial);
  cube.scale.set(0.5, 0.5, 0.5);
  cube.position.x = -2.3;
  cube.position.y = 1;
  cube.position.z = 1.4;
  cube.castShadow = true;
  scene.add(cube);
}

function addCube2() {
  const geometry = new THREE.BoxGeometry();
  const material2 = new THREE.ShaderMaterial({
    uniforms: shader_hatch.uniforms,
    vertexShader: shader_hatch.vertexShader,
    fragmentShader: shader_hatch.fragmentShader
  });
  material2.uniforms.uDirLightColor.value = directionalLightCube2.color;
  material2.uniforms.uDirLightPos.value = directionalLightCube2.position;
  const cube = new THREE.Mesh(geometry, material2);
  cube.scale.set(0.5, 0.5, 0.5);
  cube.position.x = 1;
  cube.position.y = 1;
  cube.position.z = 1.4;
  cube.castShadow = true;
  scene.add(cube);
}

function addCube3() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });

  // built in matcap shader
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: THREE.ShaderLib.matcap.uniforms,
    vertexShader: THREE.ShaderLib.matcap.vertexShader,
    fragmentShader: THREE.ShaderLib.matcap.fragmentShader
  });
  const cube = new THREE.Mesh(geometry, shaderMaterial);
  cube.scale.set(0.5, 0.5, 0.5);
  cube.position.x = 1;
  cube.position.y = 1;
  cube.position.z = -0.5;
  cube.castShadow = true;
  scene.add(cube);
}

function animate() {


  renderer.setAnimationLoop(function () {
    //stats.begin();
    renderer.render(scene, camera);
    //updateRobotAndConnorDelta(robotAndConnorClocks);
    controls.update();
    //stats.end();
  });
}



async function init() {
  createRenderer();
  createCamera();
  createScene();
  createClocks();

  await loadModels(scene);
  addLights();
  //addCube1();
  //addCube2();
  //addCube3();
  //addVideo();


  animate();

  //addUI(scene, camera);
  //document.body.appendChild(VRButton.createButton(renderer));

  // change background color
  scene.background = new THREE.Color(0xF5B33E);



}

init();

// if windows is resized, update the camera and renderer
window.addEventListener('resize', () => {
  // set size of the canvas to the window size minus header size and footer size
  renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
  aspectRatio = (window.innerWidth / window.innerHeight * (1 / 0.6));
  camera.updateProjectionMatrix();
});
