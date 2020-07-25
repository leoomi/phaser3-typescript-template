import 'phaser';

export default {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  width: 800,
  height: 600,
  render: {
      pixelArt: true
  },
  physics: {
      default: 'arcade',
      arcade: { debug : false }
  },
  scale: {
     mode: Phaser.Scale.FIT,
     width: 512,
     height: 384
  }
} as Phaser.Types.Core.GameConfig;