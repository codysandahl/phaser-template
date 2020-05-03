// import images to notify webpack that we want these
import bombImg from "../assets/bomb.png";
import dudeImg from "../assets/dude.png";
import platformImg from "../assets/platform.png";
import skyImg from "../assets/sky.png";
import starImg from "../assets/star.png";
import buttons32x32Img from "../assets/buttons32x32.png";
import SmallButtons from "../config/SmallButtons";
import clickSound from "../assets/click.mp3";

/**
 * Preloader
 */
class PreloadScreen extends Phaser.Scene {
  constructor() {
    super("PreloadScreen");
  }

  /**
   * Start loading resources
   */
  preload() {
    this.load.image('sky', skyImg);
    // progress bar
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(240, 270, 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.loadingText.setOrigin(0.5, 0.5);
    
    this.percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    this.percentText.setOrigin(0.5, 0.5);
    // loading events
    this.load.on('progress', this.onLoadProgress, this);
    this.load.on('complete', this.onLoadComplete, this);
    // images and backgrounds
    this.load.image('bomb', bombImg);
    this.load.image('ground', platformImg);
    this.load.image('star', starImg);
    this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });
    // buttons
    this.load.spritesheet(SmallButtons.texture, buttons32x32Img, { frameWidth: SmallButtons.frameWidth, frameHeight: SmallButtons.frameHeight });
    // sounds
    this.load.audio("click", clickSound);
  }

  /**
   * Show the screen
   */
  create() {
    this.add.image(400, 300, "sky");
  }

  /**
   * Updated as assets are loaded
   */
  onLoadProgress(value) {
    this.percentText.setText(parseInt(value * 100) + '%');
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRect(250, 280, 300 * value, 30);
  }

  /**
   * All assets loaded
   */
  onLoadComplete() {
    // player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
      // go to the main menu
    this.scene.start("PlayScreen");
  }
}

export default PreloadScreen;
