import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Cursor position

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Canvas
const canvas = document.getElementById("webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
  // side: THREE.DoubleSide,
  wireframeLinewidth: 1,
  // wireframeLinejoin: "round",
  // wireframeLinecap: "round",
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// // Custom vertex shader
// const positionArray = new Float32Array([
//   0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
// ]);
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
// geometry.setAttribute("position", positionAttribute);

// // Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 3;
// camera.position.y = 2;
// camera.position.x = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Rederer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes?.width, sizes?.height);

// Clock
// const clock = new THREE.Clock();

const tick = () => {
  // Clock
  // const elapsedTime = clock.getElapsedTime();

  // Update Objects
  // mesh.rotation.y = elapsedTime;

  // Update Camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.x = cursor.x * 3.5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3.5;
  controls.update();
  camera.lookAt(mesh.position);
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
