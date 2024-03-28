// this script will be used to create the npc sprites
// it will take in an object with the following properties
// name: string
// type: string
// xCoordinates: number
// yCoordinates: number
// spriteNumber: number
// it will return an object with a preload and create method
// the preload method will load the sprite image
// the create method will create the sprite and return it

export const npcs = (npcInfos) => ({
  preload() {
    // this.load.image("square", "../../assets/square.png");
    return this.load.image(
      npcInfos["name"],
      "../../assets/" + npcInfos["name"] + ".png"
    );
  },
  create() {
    console.log("npcInfos", npcInfos);
    if (npcInfos.spriteNumber !== undefined && npcInfos.spriteNumber !== null) {
      this.square = this.physics.add.sprite(
        npcInfos["xCoordinates"],
        npcInfos["yCoordinates"],
        npcInfos["name"],
        npcInfos["spriteNumber"]
      );
      
    } else {
      this.square = this.physics.add.sprite(
        npcInfos["xCoordinates"],
        npcInfos["yCoordinates"],
        npcInfos["name"]
      );
      this.square.setScale(0.08);
    }
    // this.square.setScale(0.08);
    this.square.width = 20;
    this.square.height = 20;
    this.square.setImmovable(true);
    this.square.setGravityY(0);

    return this.square;
  }
});
