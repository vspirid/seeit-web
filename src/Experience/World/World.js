import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Wheel from "../Utils/Wheel.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.wheel = new Wheel();
    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.environment = new Environment();
    });

    this.wheel.on("wheel", (stage) => {
      console.log("wheeeeeel " + stage);
    });
  }

  update() {}
}
