import * as THREE from "three";
import Experience from "../Experience.js";

export default class Torus {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.animate = false;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.TorusKnotGeometry(0.65, 0.5, 128, 32);
  }

  setTextures() {
    this.textures = {};
    this.textures.gradient = this.resources.items.torusGradientTexture;
    this.textures.magFilter = THREE.NearestFilter;
    this.textures.color = "#825252";
  }

  setMaterial() {
    this.material = new THREE.MeshToonMaterial({
      color: this.textures.color,
      gradientMap: this.textures.gradient,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
  update() {
    if (!this.animate) return;
    this.mesh.rotation.x = this.time.elapsed * 0.0001;
    this.mesh.rotation.y = this.time.elapsed * 0.0001;
  }
}
