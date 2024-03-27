// this component is the speech box that will display the text that
// an NPC will say when the player interacts with it
// it will take as a prop the text that the NPC will say,
// ad the information of this NPC

export const speechBox = (textContent, npcInfo) => ({
  create() {
    console.log("speechBox");
    console.log(npcInfo);
    this.speechBox = this.add.graphics({
      fillStyle: { color: 0x000000, alpha: 0.5 },
    });
    this.speechBox.fillRect(0, this.scale.height - 100, this.scale.width, 1000);

    this.speechText = this.add.text(50, this.scale.height - 100, '', {
      fontSize: "24px",
      color: "#ffffff",
      align: "center",
      wordWrap: {
        width: this.scale.width - 50,
        height: this.scale.height,
        useAdvancedWrap: true,
      },
    });

    let counter = 0;
    let timer = this.time.addEvent({
      delay: 50, // ms
      callback: () => {
        this.speechText.setText(textContent.substr(0, counter));
        counter += 1;
      },
      callbackScope: this,
      loop: true,
    });

    // Arrêtez le timer lorsque tout le texte est affiché
    this.time.addEvent({
      delay: textContent.length * 60, // ms
      callback: () => {
        timer.remove(false);
      },
      callbackScope: this,
      loop: false,
    });

    setTimeout(() => {
      this.speechBox.destroy();
      this.speechText.destroy();
    }, 2000);
  },
});
