import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class FirstGame extends Scene {
  background: Phaser.GameObjects.Image;
  message: Phaser.GameObjects.Text;

  constructor() {
    super("FirstGame");
  }

  preload(): void {
    // Load assets here
  }

  create(): void {
    // Initialize your scene here
    this.message = this.add
      .text(512, 384, "First Game!!", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}
