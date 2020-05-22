/**
 * Gameplay configuration
 */
let GameOptions = {
  viewport: { width: 800, height: 600 },
  keyConfig: {
  'up': Phaser.Input.Keyboard.KeyCodes.W,
  'left': Phaser.Input.Keyboard.KeyCodes.A,
  'right': Phaser.Input.Keyboard.KeyCodes.D,
  'down': Phaser.Input.Keyboard.KeyCodes.S,
  },
  isMuted: true, // TODO: change to false for production
  playSound: function(scene, key, loop=false) {
    if (this.isMuted) return;
    scene.sound.play(key, {loop: loop});
  },
  addSound: function(scene, key, loop=false) {
    return scene.sound.add(key, {loop: loop});
  },
}

export default GameOptions;
