import * as PIXI from 'pixi.js';

export class Snowflake {
  private container: PIXI.Container;
  private sprite: PIXI.Sprite;

  constructor(x: number, y: number, texture: PIXI.Texture) {
    this.container = new PIXI.Container();
    this.container.position.set(x, y);

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = Math.random() * Math.PI;
    this.sprite.scale.set(Math.random() * 0.5 + 0.5);

    this.container.addChild(this.sprite);
  }

  public update(delta: number) {
    this.container.y += delta * 5;
    this.sprite.rotation += delta * 0.05;
  }

  public getContainer() {
    return this.container;
  }
}