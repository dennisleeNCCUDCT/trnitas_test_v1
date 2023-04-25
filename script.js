import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Galaxy
 */
const textureLoader2 = new THREE.TextureLoader();
const cube4Geometry = new THREE.BoxGeometry(3, 3);
const textureCube3 = [
  new THREE.MeshStandardMaterial({
    map: textureLoader2.load(
      "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/314669711_527746329366145_7968066407900300266_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R57TLNjZkVsAX_wjZAG&_nc_ht=scontent.ftpe3-2.fna&oh=00_AfDXf0rxKzs9Enl3Gr5rRP_GeC0ikZa79n6XcEF7qNayaQ&oe=644B8683"
    ),
  }),
  new THREE.MeshStandardMaterial({
    map: textureLoader2.load(
      "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/314669711_527746329366145_7968066407900300266_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R57TLNjZkVsAX_wjZAG&_nc_ht=scontent.ftpe3-2.fna&oh=00_AfDXf0rxKzs9Enl3Gr5rRP_GeC0ikZa79n6XcEF7qNayaQ&oe=644B8683"
    ),
  }),

  new THREE.MeshStandardMaterial({
    map: textureLoader2.load(
      "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/314669711_527746329366145_7968066407900300266_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R57TLNjZkVsAX_wjZAG&_nc_ht=scontent.ftpe3-2.fna&oh=00_AfDXf0rxKzs9Enl3Gr5rRP_GeC0ikZa79n6XcEF7qNayaQ&oe=644B8683"
    ),
  }),
  //
  new THREE.MeshStandardMaterial({
    map: textureLoader2.load(
      "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/314669711_527746329366145_7968066407900300266_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R57TLNjZkVsAX_wjZAG&_nc_ht=scontent.ftpe3-2.fna&oh=00_AfDXf0rxKzs9Enl3Gr5rRP_GeC0ikZa79n6XcEF7qNayaQ&oe=644B8683"
    ),
  }),
  new THREE.MeshStandardMaterial({
    map: textureLoader2.load(
      "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/314669711_527746329366145_7968066407900300266_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R57TLNjZkVsAX_wjZAG&_nc_ht=scontent.ftpe3-2.fna&oh=00_AfDXf0rxKzs9Enl3Gr5rRP_GeC0ikZa79n6XcEF7qNayaQ&oe=644B8683"
    ),
  }),
  new THREE.MeshStandardMaterial({
    map: textureLoader2.load(
      "https://scontent.ftpe3-2.fna.fbcdn.net/v/t39.30808-6/314669711_527746329366145_7968066407900300266_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R57TLNjZkVsAX_wjZAG&_nc_ht=scontent.ftpe3-2.fna&oh=00_AfDXf0rxKzs9Enl3Gr5rRP_GeC0ikZa79n6XcEF7qNayaQ&oe=644B8683"
    ),
  }),
];

const cube4 = new THREE.Mesh(cube4Geometry, textureCube3);
cube4.scale.x = 100; // SCALE
cube4.scale.y = 100; // SCALE
cube4.scale.z = 400;
cube4.position.set(0, 0, 0);
//cube4.position(0, 0, 0);
//scene.add(cube4);
//

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry2, material2);
scene.add(cube);
//
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 2);
light2.position.set(-10, -10, -10);
scene.add(light2);
//
//const cubeFolder4 = gui.addFolder("Cube4");
//const cubeRotationFolder4 = cubeFolder4.addFolder("Rotation");
//cubeRotationFolder4.add(cube4.rotation, "x", 0, Math.PI * 2);
//cubeRotationFolder4.add(cube4.rotation, "y", 0, Math.PI * 2);
//cubeRotationFolder4.add(cube4.rotation, "z", 0, Math.PI * 2);
//cubeFolder4.open();
//
const parameters = {};
parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  // Destroy old galaxy
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    // Position
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;

    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  /**
   * Material
   */
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  /**
   * Points
   */
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

generateGalaxy();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);
//img cube
var loader = new THREE.TextureLoader();
var mats = [
  "https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.6435-9/161816090_863072607874869_6359962160037861206_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=I7ouTc3jCL4AX87SpWn&_nc_ht=scontent.ftpe3-1.fna&oh=00_AfAUcdFM6b_QXOOyttzDihb1AfZ1sE-5lXbvTTMxZl0xSw&oe=646D7958", //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
  "https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.6435-9/161816090_863072607874869_6359962160037861206_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=I7ouTc3jCL4AX87SpWn&_nc_ht=scontent.ftpe3-1.fna&oh=00_AfAUcdFM6b_QXOOyttzDihb1AfZ1sE-5lXbvTTMxZl0xSw&oe=646D7958",
  "https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.6435-9/161816090_863072607874869_6359962160037861206_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=I7ouTc3jCL4AX87SpWn&_nc_ht=scontent.ftpe3-1.fna&oh=00_AfAUcdFM6b_QXOOyttzDihb1AfZ1sE-5lXbvTTMxZl0xSw&oe=646D7958",
  "https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.6435-9/161816090_863072607874869_6359962160037861206_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=I7ouTc3jCL4AX87SpWn&_nc_ht=scontent.ftpe3-1.fna&oh=00_AfAUcdFM6b_QXOOyttzDihb1AfZ1sE-5lXbvTTMxZl0xSw&oe=646D7958",
  "https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.6435-9/161816090_863072607874869_6359962160037861206_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=I7ouTc3jCL4AX87SpWn&_nc_ht=scontent.ftpe3-1.fna&oh=00_AfAUcdFM6b_QXOOyttzDihb1AfZ1sE-5lXbvTTMxZl0xSw&oe=646D7958",
  "https://scontent.ftpe3-1.fna.fbcdn.net/v/t1.6435-9/161816090_863072607874869_6359962160037861206_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=I7ouTc3jCL4AX87SpWn&_nc_ht=scontent.ftpe3-1.fna&oh=00_AfAUcdFM6b_QXOOyttzDihb1AfZ1sE-5lXbvTTMxZl0xSw&oe=646D7958",
].map((pic) => {
  return new THREE.MeshLambertMaterial({ map: loader.load(pic) });
});
var geom = new THREE.BoxBufferGeometry(2, 2, 2);
var box = new THREE.Mesh(geom, mats);
scene.add(box);
//
// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  var counter = 1;

  box.rotation.x += 0.003;
  box.rotation.y += 0.003;
  // renderer();

  points.rotation.y += 0.001;
}

// renderer();

animate();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

//
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
//animate((camera.rotateY += 1));
//animate();

tick();
