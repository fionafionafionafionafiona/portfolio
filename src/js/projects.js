import * as THREE from "three";
import gsap from "gsap";

var projects = [
  {
    img: require("../img/bleue.png"),
    ratio: 0.98,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/forest.jpg"),
    ratio: 0.6,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/collage-exposition.png"),
    ratio: 1.16,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/vitamin-well.png"),
    ratio: 0.6,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/vin-nature.png"),
    ratio: 1,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/nude-ocean.jpg"),
    ratio: 0.66,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/egypte.jpg"),
    ratio: 0.66,
    url: "project-nude-ocean.html",
  },
  {
    img: require("../img/all-times-1.jpeg"),
    ratio: 1.24,
    url: "project-all-times.html",
  },
  {
    img: require("../img/obsucra-2.png"),
    ratio: 0.62,
    url: "project-nude-ocean.html",
  },
];

var container = document.querySelector(".l-scene-container");
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
var cubes = [];
// var numCubes = 10; // Adjust based on viewport size
var spacing = 2.7; // Distance between cubes
var numCubes = Math.ceil(window.innerHeight / spacing) + 5;
var initialOffset = -(numCubes * spacing) / 2 + spacing;

for (var i = 0; i < numCubes; i++) {
  var project = projects[i % projects.length];
  var texture = textureLoader.load(project.img);
  var width = 4;
  var height = 4 * project.ratio;
  var geometry = new THREE.BoxGeometry(width, height, 0.08);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var cube = new THREE.Mesh(geometry, material);

  cube.position.z = i * spacing + initialOffset;
  cube.url = project.url;

  group.add(cube);
  cubes.push(cube);
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
//Group
// group.rotation.y = (Math.PI / 6) * -1;
group.rotation.y = degreesToRadians(-21);
group.rotation.x = degreesToRadians(20);
group.position.x = -1.2;

scene.add(group);

//Decalage de projet en hover
cubes.forEach((cube) => {
  cube.userData.originalX = cube.position.x;

  cube.onPointerOver = () => {
    gsap.to(cube.position, { x: cube.userData.originalX + 2, duration: 0.3 });
  };

  cube.onPointerOut = () => {
    gsap.to(cube.position, { x: cube.userData.originalX, duration: 0.3 });
  };
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(cubes);

  cubes.forEach((cube) => (cube.position.x = cube.userData.originalX)); // Reset all cubes

  if (intersects.length > 0) {
    intersects[0].object.position.x += 2; // Move hovered cube
  }
});

container.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(cubes);

  cubes.forEach((cube) => (cube.position.x = cube.userData.originalX)); // Reset all cubes

  if (intersects.length > 0) {
    window.location.href = intersects[0].object.url;
  }
});

//Scroll Interaction
window.addEventListener("wheel", (event) => {
  var delta = event.deltaY * 0.002;
  cubes.forEach((cube) => {
    cube.position.z += delta;
  });
  // If the cube moves too far back, recycle it to the front
  var firstCube = cubes[0];
  var lastCube = cubes[cubes.length - 1];

  if (firstCube.position.z > spacing * 2) {
    var movedCube = cubes.shift(); // Remove first cube
    movedCube.position.z = lastCube.position.z - spacing; // Move it behind the last one
    cubes.push(movedCube); // Add it back at the end
  }

  if (lastCube.position.z < -spacing * numCubes) {
    var movedCube = cubes.pop(); // Remove last cube
    movedCube.position.z = firstCube.position.z + spacing; // Move it to the front
    cubes.unshift(movedCube); // Add it back at the start
  }
});

//Animate Scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
