import * as THREE from "three";

var projects = [
  {
    img: require("../img/collage-exposition.png"),
    ratio: 1.16,
    url: "project.html",
  },
  { img: require("../img/bleue.png"), ratio: 2, url: "project.html" },
  // { img: "../img/forest.jpg", ratio: 0.6, url: "project.html" },
];

var container = document.querySelector(".scene-container");
var width = container.clientWidth;
var height = container.clientHeight;

//Scene, Renderer, Camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

//Texture loader
var textureLoader = new THREE.TextureLoader();
var group = new THREE.Group();

// Create and Load Textures for Cubes
projects.forEach((project, index) => {
  var texture = textureLoader.load(project.img);
  var width = 3;
  var height = 3 * project.ratio;
  var geometry = new THREE.BoxGeometry(width, height, 0.02);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var cube = new THREE.Mesh(geometry, material);
  cube.position.z = index * 3;
  group.add(cube);
});

//Group
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

// var headerLanguages = document.querySelector(".header-languages");
// var language = document.querySelector(".window");
// var toggleMenu = function toggleMenu() {
//   language.classList.toggle("is-active");
// };
// headerLanguages.addEventListener("click", toggleMenu);
