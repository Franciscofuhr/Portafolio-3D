import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import faltaUnoPic from "./faltaUno.png" 
import franFOTOCVPic from "./FranFOTOCV.png" 
import moonPic from "./moon.jpg" 
import spacePic from "./space.jpg" 
import healthierPic from "./healthier.png" 
import technologyPic from "./technology.png" 

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(-1);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load(spacePic);
scene.background = spaceTexture;

// Avatar

const franTexture = new THREE.TextureLoader().load(franFOTOCVPic);

const fran = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: franTexture }));

scene.add(fran);
fran.rotation.y=-0.5
// Avatar

const technologysTexture = new THREE.TextureLoader().load(technologyPic);

const technologys = new THREE.Mesh(new THREE.BoxGeometry(40,20,10), new THREE.MeshBasicMaterial({ map: technologysTexture }));
scene.add(technologys);
technologys.rotation.y=0
technologys.position.y=-4
technologys.position.z = -25;
technologys.position.setX(175);

const faltaUnoTexture = new THREE.TextureLoader().load(faltaUnoPic);

const faltaUno = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: faltaUnoTexture }));
scene.add(faltaUno);
faltaUno.rotation.y=-0.5
faltaUno.position.z = -15;
faltaUno.position.setX(101);

const HealthierTexture = new THREE.TextureLoader().load(healthierPic);


const Healthier = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: HealthierTexture }));
scene.add(Healthier);
Healthier.rotation.y=-0.45
Healthier.position.z = -14;
Healthier.position.setX(142.5);
// // Moon

const moonTexture = new THREE.TextureLoader().load(moonPic);
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = -8;
moon.position.setX(27);

fran.position.z = -4.8;//z es lejos
fran.position.x = 2;
fran.position.y=0.15

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  console.log(t)

  // fran.rotation.y += t * -0.0001;
  // fran.rotation.z += t * -0.0001;

  // camera.position.z = t * -0.01;
  camera.position.x = t * -0.06;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.005;
  // moon.position.x -=0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
