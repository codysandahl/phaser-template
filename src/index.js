import Phaser from "phaser";
import PreloadScreen from "./screens/PreloadScreen";
import PlayScreen from "./screens/PlayScreen";

/**
 * Phaser config
 */
const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "phaser-container",
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT, // expand to fit the parent container
    autoCenter: Phaser.Scale.CENTER_BOTH, // center the window in the container vert+horiz
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [PreloadScreen, PlayScreen]
};

/**
 * Create the game
 * NOTE: contain within onload() to make sure the game loads after everything else is finished
 */
let game;
window.onload = function() {
  game = new Phaser.Game(config);
}
