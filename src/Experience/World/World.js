import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Donut from "./Donut.js";
import SeeitRayCaster from "../Utils/RayCaster.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.donut1 = new Donut(-0.5);
      this.donut2 = new Donut(0);
      this.donut3 = new Donut(0.5);
      this.experience.raycaster.objectsToTest = [
        this.donut1.mesh,
        this.donut2.mesh,
        this.donut3.mesh,
      ];
      this.environment = new Environment();
    });
  }

  update() {
    if (this.donut1) this.donut1.update();
    if (this.donut2) this.donut2.update();
    if (this.donut3) this.donut3.update();
    if (this.experience.raycaster) this.experience.raycaster.update();
  }
}