import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Donut from "./Donut.js";

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
      this.environment = new Environment();
    });
  }

  update() {
    if (this.donut1) this.donut1.update();
    if (this.donut2) this.donut2.update();
    if (this.donut3) this.donut3.update();
  }
}
