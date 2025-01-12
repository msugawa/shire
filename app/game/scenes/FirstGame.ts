import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class FirstGame extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  ball: Phaser.Physics.Arcade.Sprite;
  paddle: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("FirstGame");
  }

  preload(): void {
    this.load.image("ball", "assets/ball.png");
    this.load.image("paddle", "assets/paddle.png");
  }

  create(): void {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor("#eee");

    this.ball = this.physics.add
      .sprite(
        this.game.canvas.width * 0.5,
        this.game.canvas.height - 100,
        "ball",
      )
      .setOrigin(0.5)
      .setVelocity(150, -150)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.paddle = this.physics.add
      .sprite(
        this.game.canvas.width * 0.5,
        this.game.canvas.height - 50,
        "paddle",
      )
      .setOrigin(0.5, 1)
      .setImmovable(true);

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.physics.collide(this.ball, this.paddle);
    this.paddle.x = this.input.x || this.game.canvas.width * 0.5;
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}
