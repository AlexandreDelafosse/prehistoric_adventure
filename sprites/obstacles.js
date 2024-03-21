// import Phaser from "phaser";

export const obstacles = (obstacleInfos) => ({
  preload() {
    // this.load.image("square", "../../assets/square.png");
    return this.load.image(
      obstacleInfos["name"],
      "../../assets/" + obstacleInfos["name"] + ".png"
    );
  },
  create() {
    this.square = this.physics.add.image(
      obstacleInfos["xCoordinates"],
      obstacleInfos["yCoordinates"],
      obstacleInfos["name"]
    );
    this.square.setScale(0.08);
    this.square.width = 20;
    this.square.height = 20;
    this.square.setImmovable(true);
    this.square.setGravityY(0);

    return this.square;
  },

  // update(time, delta) {
  //     this.player.body.setVelocity(0);
  // }
});
