import * as THREE from "three";

// var element = document.querySelector(".element");
// var width = element.clientWidth;
// var height = element.clientHeight;
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
// camera.position.z = 3;
// var renderer = new THREE.WebGLRenderer();
// // var geometry = new THREE.BoxGeometry(1, 1, 1);
// var geometry = new THREE.BoxGeometry(1, 1.2, 0.02);
// // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// import texturePath from "../img/collage-exposition.png";
// var textureLoader = new THREE.TextureLoader();
// var texture = textureLoader.load(texturePath);
// var material = new THREE.MeshBasicMaterial({ map: texture });
// var cube = new THREE.Mesh(geometry, material);
// // cube.rotation.x = 0.5;
// // cube.rotation.y = 0.5;

// function animate() {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// renderer.setSize(width, height);

// element.appendChild(renderer.domElement);
// scene.add(cube);
// renderer.setAnimationLoop(animate);
// window.addEventListener("wheel", (event) => {
//   console.log("test");
//   cube.position.x += event.deltaY * 0.01;
//   renderer.render(scene, camera);
// });

var container = document.querySelector(".scene-container");
var width = container.clientWidth;
var height = container.clientHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
camera.position.z = 50;
// camera.position.y = 1;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

var textureLoader = new THREE.TextureLoader();

import collagePath from "../img/collage-exposition.png";

var collageTexture = textureLoader.load(collagePath);

var geometry = new THREE.BoxGeometry(3, 2, 0.02);
var collageMaterial = new THREE.MeshBasicMaterial({ map: collageTexture });
var collageCube = new THREE.Mesh(geometry, collageMaterial);
// cube.rotation.y = -0.4;

var group = new THREE.Group();
group.add(collageCube);
group.rotation.y = (Math.PI / 4) * -1;
group.rotation.x = Math.PI / 4;

scene.add(group);

window.addEventListener("wheel", (event) => {
  var delta = event.deltaY;

  // cube.position.x += -delta * 0.002;
  collageCube.position.z += delta * 0.002;
  // cube.position.y += -delta * 0.002;
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// var headerLanguages = document.querySelector(".header-languages");
// var language = document.querySelector(".window");
// var toggleMenu = function toggleMenu() {
//   language.classList.toggle("is-active");
// };
// headerLanguages.addEventListener("click", toggleMenu);
