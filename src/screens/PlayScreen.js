import GameOptions from "../config/GameOptions";
import ButtonSprite from "../gui/ButtonSprite";
import SmallButtons from "../config/SmallButtons";

/**
 * Main play screen
 */
class PlayScreen extends Phaser.Scene {
  constructor() {
    super("PlayScreen");
    // game state
    this.score = 0;
    this.gameOver = false;
  }

  /**
   * Show the screen
   */
  create() {
    // background
    this.add.image(400, 300, 'sky');

    // platforms
    this.platforms = this.physics.add.staticGroup();
  
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
  
    // player
    this.player = this.physics.add.sprite(100, 450, 'dude');
  
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  
    // stars
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
  
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  
    // bombs
    this.bombs = this.physics.add.group();
  
    // player input
    this.cursors = this.input.keyboard.addKeys(GameOptions.keyConfig);
  
    // environmental collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    // callback collisions
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  
    // gui
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    let fullscreenButton = new ButtonSprite({scene: this, x: 765, y: 25, texture: SmallButtons.texture, callback: this.onFullscreenButton, context: this, frameUp: SmallButtons.fullscreen, frameOver: SmallButtons.fullscreenActive, frameDown: SmallButtons.fullscreenActive});
  }

  /**
   * Update each frame
   */
  update(time, delta) {
    if (this.gameOver) {
      return;
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
    // jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  /**
   * Player overlaps with star
   */
  collectStar (player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    // collected all stars? => create a new batch
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
      // and add some bombs!
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }
  
  /**
   * Player hits bomb
   */
  hitBomb (player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
  }

  /**
   * Toggle fullscreen
   */
  onFullscreenButton() {
    if (GameOptions.playSound) {
      this.sound.play('click');
    }
    if (!this.scale.isFullscreen) {
      this.scale.startFullscreen();
    } else {
      this.scale.stopFullscreen();
    }
  }
}

export default PlayScreen;
