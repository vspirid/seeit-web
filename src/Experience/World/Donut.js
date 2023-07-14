import * as THREE from "three";
import Experience from "../Experience.js";

export default class Donut {
  constructor(positionX) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
    this.position(positionX);
  }

  position(positionX) {
    this.mesh.position.x = positionX;
    this.mesh.position.y = 0.5;
  }

  setGeometry() {
    this.geometry = new THREE.CapsuleGeometry(0.1, 0.01);
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(10, 4, 2),
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
  update() {
    //this.mesh.rotation.x += 0.001
  }
}
