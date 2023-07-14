import Experience from "../Experience";

let mouse = null;
export default class Mouse {
  constructor() {
    this.experience = new Experience();
    window.addEventListener("mousemove", (event) => {
      this.x = (event.clientX / this.experience.sizes.width) * 2 - 1;
      this.y = -(event.clientY / this.experience.sizes.height) * 2 + 1;
    });
  }
}
