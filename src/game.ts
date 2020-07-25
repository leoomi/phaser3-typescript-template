import 'phaser';
import MainScene from 'scenes/main-scene/main-scene';
import Config from 'config';

Config.scene = MainScene;
const game = new Phaser.Game(Config);