import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class FirstGame extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  ball: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("FirstGame");
  }

  preload(): void {
    this.load.image("ball", "assets/ball.png");
  }

  create(): void {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor("#eee");

    this.ball = this.physics.add
      .sprite(50, 50, "ball")
      .setVelocity(150, 150)
      .setCollideWorldBounds(true)
      .setBounce(1);

    EventBus.emit("current-scene-ready", this);
  }

  update() {}

  changeScene() {
    this.scene.start("MainMenu");
  }
}
