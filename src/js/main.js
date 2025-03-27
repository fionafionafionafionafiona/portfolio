import * as THREE from "three";

var projects = [
  { img: "/img/collage-exposition.png", ratio: 2.4, url: "project.html" },
  { img: "/img/bleue.png", ratio: 2, url: "project.html" },
  { img: "/img/forest.jpg", ratio: 0.6, url: "project.html" },
];

projects.forEach((project) => {
  var width = 3;
  var height = 3 * project.ratio;
  var geometry = new THREE.BoxGeometry(width, height, 0.02);
});

var container = document.querySelector(".scene-container");
var width = container.clientWidth;
var height = container.clientHeight;

//Scene, Renderer, Camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

//Texture loader
var textureLoader = new THREE.TextureLoader();
var group = new THREE.Group();

// // Create and Load Textures for Cubes
// projects.forEach((project, index) => {
//   textureLoader.load(project.img, (texture) => {
//     // Create the geometry inside the load callback
//     var width = 3;
//     var height = 3 * project.ratio;
//     var geometry = new THREE.BoxGeometry(width, height, 0.02);
//     var material = new THREE.MeshBasicMaterial({ map: texture });

//     var cube = new THREE.Mesh(geometry, material);
//     cube.position.set(0, 0, index * -4); // Space out cubes

//     group.add(cube);
//     scene.add(group);
//     renderer.render(scene, camera); // Ensure render updates
//   });
// });
import collagePath from "../img/collage-exposition.png";
import bleuePath from "../img/bleue.png";

var collageTexture = textureLoader.load(collagePath);
var bleueTexture = textureLoader.load(bleuePath);

var geometry = new THREE.BoxGeometry(3, 3.48, 0.09);
var collageMaterial = new THREE.MeshBasicMaterial({ map: collageTexture });
var collageCube = new THREE.Mesh(geometry, collageMaterial);

var bleueMaterial = new THREE.MeshBasicMaterial({ map: bleueTexture });
var bleueCube = new THREE.Mesh(geometry, bleueMaterial);
bleueCube.position.z = 3; //gap entre les projets//

//Group
group.add(collageCube);
group.add(bleueCube);
group.rotation.y = (Math.PI / 6) * -1;
group.rotation.x = Math.PI / 9.5;

scene.add(group);

//Scroll Interaction
window.addEventListener("wheel", (event) => {
  var delta = event.deltaY;

  collageCube.position.z += delta * 0.002;
  bleueCube.position.z += delta * 0.002;
});

//Animate Scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// import * as THREE from "three";

// var projects = [
//   { img: "/img/collage-exposition.png", ratio: 2.4, url: "project.html" },
//   { img: "/img/bleue.png", ratio: 2, url: "project.html" },
//   { img: "/img/forest.jpg", ratio: 0.6, url: "project.html" },
// ];

// var container = document.querySelector(".scene-container");
// var width = container.clientWidth;
// var height = container.clientHeight;

// // Scene, Camera, Renderer
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
// camera.position.z = 50;

// var renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(width, height);
// container.appendChild(renderer.domElement);

// // Texture Loader
// var textureLoader = new THREE.TextureLoader();
// var group = new THREE.Group();

// // Create and Load Textures for Cubes
// projects.forEach((project, index) => {
//   textureLoader.load(project.img, (texture) => {
//     // Create the geometry inside the load callback
//     var width = 3;
//     var height = 3 * project.ratio;
//     var geometry = new THREE.BoxGeometry(width, height, 0.02);
//     var material = new THREE.MeshBasicMaterial({ map: texture });

//     var cube = new THREE.Mesh(geometry, material);
//     cube.position.set(0, 0, index * -4); // Space out cubes

//     group.add(cube);
//     scene.add(group);
//     renderer.render(scene, camera); // Ensure render updates
//   });
// });

// //Rotate Group
// group.rotation.y = -Math.PI / 6;
// group.rotation.x = Math.PI / 9.5;

// // Scroll Interaction
// window.addEventListener("wheel", (event) => {
//   var delta = event.deltaY * 0.01;
//   group.position.z += delta;
// });

// //Animate Scene
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();

// var headerLanguages = document.querySelector(".header-languages");
// var language = document.querySelector(".window");
// var toggleMenu = function toggleMenu() {
//   language.classList.toggle("is-active");
// };
// headerLanguages.addEventListener("click", toggleMenu);
