import * as THREE from "three";
import Experience from "../Experience.js";
let currentIntersect = null;

export default class SeeitRayCaster {
  constructor(_objectsToTest) {
    this.seeitraycaster = new THREE.Raycaster();
    this.experience = new Experience();
    this.objectsToTest = _objectsToTest;
  }

  update() {
    this.seeitraycaster.setFromCamera(
      this.experience.mouse,
      this.experience.camera.instance
    );
    

    if (!this.experience.raycaster.objectsToTest) return;


    const intersects = this.seeitraycaster.intersectObjects(
      this.experience.raycaster.objectsToTest
    );
    
    if (intersects.length) {
      if (!currentIntersect) {
        intersects[0].object.scale.set(2.0,2.0,2.0)
      }

      currentIntersect = intersects[0];
    } else {
      if (currentIntersect) {
        currentIntersect.object.scale.set(1.0,1.0,1.0)
      }

      currentIntersect = null;
    }
  }
}
