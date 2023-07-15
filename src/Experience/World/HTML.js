import Experience from "../Experience.js";
import gsap from "gsap";

export default class HTML {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");
    }
  }

  update(stage) {
    switch (stage) {
      case 0:
        gsap.to(".logo", { y: 0, opacity: 1, duration: 1 })
        gsap.to(".footer", { y: 0, opacity: 1, duration: 1 })
        break;
      case 1:
        gsap.to(".logo", { y: -500, opacity: 0, duration: 1 })
        gsap.to(".footer", { y: 200, opacity: 0, duration: 1 })
        break;
      default:
        console.log("default");
        break;
    }
  }
}
