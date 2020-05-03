/**
 * Generic button
 */
class ButtonImage extends Phaser.GameObjects.Image {
  constructor(config) {
    // validate parameters
    if (!config.scene) {
      console.log("ERROR: missing scene");
      return;
    }
    if (!config.texture) {
      console.log("ERROR: missing texture");
      return;
    }
    if (!config.x) { config.x = 0; }
    if (!config.y) { config.y = 0; }
    // create the image
    super(config.scene, config.x, config.y, config.texture);
    config.scene.add.existing(this);
    this.config = config; // NOTE: can't add to "this" until after calling super()
    // callback when clicked
    this.setInteractive();
    if (config.callback) {
      this.on('pointerdown', config.callback, config.context)
    }
  }
}

export default ButtonImage;
