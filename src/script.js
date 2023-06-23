import * as THREE from "three";
import * as dat from "lil-gui";

/**
 * Debug
 */


const parameters = {
  materialColor: "#e59494",
};
const cursor = {
  x: 0,
  y: 0,
};
//const gui = new dat.GUI();
// gui.addColor(parameters, "materialColor").onChange(() => {
//   material.color.set(parameters.materialColor);
// });

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
  wireframe: true
});
const sectionMeshes = [];
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

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});
/**
 * Camera
 */
// Base camera
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  camera.position.y = -(scrollY / sizes.height) * objectsDistance;
  const paralaxX = cursor.x * 0.5;
  const paralaxY = -cursor.y * 0.5;
  cameraGroup.position.x += (paralaxX - cameraGroup.position.x) * 2 * deltaTime;
  cameraGroup.position.y += (paralaxY - cameraGroup.position.y) * 2 * deltaTime;
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.x = elapsedTime * 0.12;
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
const objectsDistance = 4;
let scrollY = window.scrollY;
let currentSection = 0

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height)
  if(newSection != currentSection) {
    currentSection = newSection
  }
  
});

const fillCanvas = () => {
  const mesh1 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material,
    
  );
  const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
  );
  mesh1.position.y = -objectsDistance * 0;
  mesh2.position.y = -objectsDistance * 1;
  mesh3.position.y = -objectsDistance * 2;

  mesh1.position.x = 1.5;
  mesh2.position.x = -2;
  mesh3.position.x = 2;

  sectionMeshes.push(mesh1, mesh2, mesh3);
  scene.add(mesh1, mesh2, mesh3);
  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);
};

fillCanvas();
tick();
