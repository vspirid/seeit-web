import * as THREE from "three";

const parameters = {
  materialColor: "#e59494",
};
const cursor = {
  x: 0,
  y: 0,
};

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

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
let previousTime = 0;
const text = document.getElementById('companyName')


const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  if (text.style.opacity < 1)
    text.style.opacity = elapsedTime * 0.1
  
  previousTime = elapsedTime;
  camera.position.y = -(scrollY / sizes.height) * objectsDistance;
  const paralaxX = cursor.x * 0.5;
  const paralaxY = -cursor.y * 0.5;
  cameraGroup.position.x += (paralaxX - cameraGroup.position.x) * 2 * deltaTime;
  cameraGroup.position.y += (paralaxY - cameraGroup.position.y) * 2 * deltaTime;
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
const objectsDistance = 4;
let scrollY = window.scrollY;

const fillCanvas = () => {
  const mesh1 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.75, 0.55, 100, 24),
    material,
  );
  
  mesh1.position.x = 2;
  sectionMeshes.push(mesh1);
  scene.add(mesh1);
  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
};

fillCanvas();
tick();
