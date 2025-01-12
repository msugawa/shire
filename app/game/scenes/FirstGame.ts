import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class FirstGame extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  ball: Phaser.Physics.Arcade.Sprite;
  paddle: Phaser.Physics.Arcade.Sprite;
  bricks: Phaser.Physics.Arcade.Group;
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 3,
      col: 7,
    },
    offset: {
      top: 50,
      left: 60,
    },
    padding: 10,
  };

  constructor() {
    super("FirstGame");
  }

  preload(): void {
    this.load.image("ball", "assets/ball.png");
    this.load.image("paddle", "assets/paddle.png");
    this.load.image("brick", "assets/brick.png");
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

    this.physics.world.checkCollision.down = false;

    this.initBricks();

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.physics.collide(this.ball, this.paddle);
    this.paddle.x = this.input.x || this.game.canvas.width * 0.5;

    if (this.ball.active && this.ball.y > this.game.canvas.height) {
      alert("Game over!");
      this.ball.destroy();
      location.reload();
    }
  }

  changeScene() {
    this.scene.start("MainMenu");
  }

  initBricks() {
    this.bricks = this.physics.add.group();

    for (let c = 0; c < this.brickInfo.count.col; c++) {
      for (let r = 0; r < this.brickInfo.count.row; r++) {
        const brickX =
          c * (this.brickInfo.width + this.brickInfo.padding) +
          this.brickInfo.offset.left;
        const brickY =
          r * (this.brickInfo.height + this.brickInfo.padding) +
          this.brickInfo.offset.top;
        const newBrick = this.physics.add
          .sprite(brickX, brickY, "brick")
          .setImmovable(true)
          .setOrigin(0.5);

        this.bricks.add(newBrick);
      }
    }
  }
}
