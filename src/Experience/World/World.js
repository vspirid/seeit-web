import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Torus from "./Torus.js";
import gsap from "gsap";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resources.on("ready", () => {
      this.torus = new Torus();
      this.environment = new Environment();
    });
    this.showJob = null;
    this.hideJob = null;
  }

  updateStage(stage) {
    console.log("update stage " + stage);
    switch (stage) {
      case 0:
        if (this.hideJob) this.hideJob.kill()
        this.hideJob = gsap.to(this.torus.material, {
          duration: 0.5,
          opacity: 0,
          onStart: () => {
            if (this.showJob)
              this.showJob.kill()
          },
          onComplete: () => {
            this.torus.animate = false;
          },
        });
        break;
      case 1:
        if (this.showJob) this.showJob.kill()
        this.showJob = gsap.to(this.torus.material, {
          duration: 2,
          opacity: 1,
          onStart: () => {
            //get busy
            this.torus.animate = true;
            if (this.hideJob)
              this.hideJob.kill()
          },
          onComplete: () => {
            // free me
          },
        });
        break;
      default:
        break;
    }
  }
  update() {
    if (this.torus) this.torus.update();
  }
}
