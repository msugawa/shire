import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class FirstGame extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  ball: Phaser.GameObjects.Sprite;

  constructor() {
    super("FirstGame");
  }

  preload(): void {
    this.load.image("ball", "assets/ball.png");
  }

  create(): void {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor("#eee");

    this.ball = this.add.sprite(50, 50, "ball");

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.ball.x += 1;
    this.ball.y += 1;
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}
