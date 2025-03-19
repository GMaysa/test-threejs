import * as THREE from "three";

import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

const orbit = new OrbitControls(camera, renderer.domElement)
// orbit.target = new THREE.Vector3(5,0,0)
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

// const boxGeometry = new THREE.BoxGeometry();
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// // box.position.x = 5
// scene.add(box)

// const torusGeometry = new THREE.SphereGeometry(4, 30, 16)
// const boxMaterial = new THREE.MeshBasicMaterial({color: 'green'});
// const torus = new THREE.Mesh(torusGeometry, boxMaterial)

// scene.add(torus)
let model;
const loader = new GLTFLoader()
loader.load( '/hammer/scene.gltf',  function (gltf) {
    model = gltf.scene;
    model.scale.set(20, 20, 20)
    scene.add(model)
}, function (xhr) {console.log((xhr.loaded * 100) / xhr.total)}, function (error) {
    console.error(error)

})

const light = new THREE.SpotLight(0xffffff, 38, 5, 3);
light.position.set( 0, 2, 2);
scene.add(light)
// const lightHelper = new THREE.SpotLightHelper(light);
// scene.add(lightHelper)
// const planeGeometry = new THREE.PlaneGeometry(30, 30);
// const planeMaterial = new THREE.MeshBasicMaterial({color: 0xF0F0F0})
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane)

// plane.rotation.x = -0.5 * Math.PI

// const grid = new THREE.GridHelper(30);
// scene.add(grid)

// Animation loop to continuously render the scene
function animate() {
    renderer.render(scene, camera);
    orbit.update()
}

renderer.setAnimationLoop(animate)