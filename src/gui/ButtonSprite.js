/**
 * Generic button
 */
class ButtonSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, config, x=0, y=0, callback=null, context=null) {
    // validate parameters
    if (!scene) {
      console.log("ERROR: missing scene");
      return;
    }
    if (!config.texture) {
      console.log("ERROR: missing texture");
      return;
    }
    if (!config.frameUp) { config.frameUp = 0; }
    if (!config.frameDown) { config.frameDown = config.frameUp; }
    if (!config.frameOver) { config.frameOver = config.frameUp; }
    if (!config.frameActive) { config.frameActive = config.frameDown; }
    if (!config.hasActive) { config.hasActive = false; }
    // create the sprite
    super(scene, x, y, config.texture, config.frameUp);
    scene.add.existing(this);
    this.config = config; // NOTE: can't add to "this" until after calling super()
    this.isActive = false;
    // button animations
    this.setInteractive();
    this.on('pointerdown',this.onDown,this);
    this.on('pointerup',this.onUp,this);
    this.on('pointerover',this.onOver,this);
    this.on('pointerout',this.onUp,this);
    // callback when clicked
    if (callback) {
      this.on('pointerdown', callback, context);
    }
  }

  onDown() {
    if (this.config.hasActive) {
      this.setActive(true);
      return;
    } else {
      this.setFrame(this.config.frameDown);
    }
  }

  onOver() {
    this.setFrame(this.config.frameOver);
  }

  onUp() {
    if (!this.config.hasActive || !this.isActive) {
      this.setFrame(this.config.frameUp);
    }
  }

  setActive(val) {
    this.isActive = val;
    if (this.config.hasActive) {
      let frame = val ? this.config.frameActive : this.config.frameUp;
      this.setFrame(frame);
    }
  }
}

export default ButtonSprite;
