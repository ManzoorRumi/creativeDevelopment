import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls;

function init() {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 2, 5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Controls (mouse rotation, zoom, pan)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // smooth motion
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.enableZoom = true;

  // Lights — full bright setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // global light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Load GLB model
  const loader = new GLTFLoader();
  loader.load(
    "/Bauhaus.glb", // file in public/
    function (gltf) {
      scene.add(gltf.scene);
      console.log("Model loaded:", gltf);
    },
    undefined,
    function (error) {
      console.error("Error loading model:", error);
    },
  );

  // Handle resize
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // required for damping
  renderer.render(scene, camera);
}

init();
animate();
