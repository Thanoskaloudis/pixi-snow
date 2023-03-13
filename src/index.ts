import * as PIXI from 'pixi.js';
import { Snowflake } from './snowflake';

const app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true,
  resolution: 1,
});

document.body.appendChild(app.view as any);

const snowContainer = new PIXI.Container();
app.stage.addChild(snowContainer);

const snowflakeTexture = PIXI.Texture.from('snowflake.png');

const snowflakes: Snowflake[] = [];

function createSnowflake() {
  const x = Math.random() * app.renderer.width;
  const y = -50;
  const snowflake = new Snowflake(x, y, snowflakeTexture);
  snowContainer.addChild(snowflake.getContainer());
  snowflakes.push(snowflake);
}

function updateSnowflakes(delta: number) {
  for (const snowflake of snowflakes) {
    snowflake.update(delta);
    if (snowflake.getContainer().y > app.renderer.height) {
    snowflake.getContainer().y = -50;
    snowflake.getContainer().x = Math.random() * app.renderer.width;
    }
  }
}

app.ticker.add((delta: number) => {
  if (Math.random() < 0.1) {
  createSnowflake();
  }
  updateSnowflakes(delta);
});

const background = PIXI.Sprite.from('background.jpg');
background.width = app.renderer.width;
background.height = app.renderer.height;
app.stage.addChildAt(background, 0);

function makeInteractive(snowflake: Snowflake) {
  snowflake.getContainer().interactive = true;
  snowflake.getContainer().on('pointerdown', () => {
    snowContainer.removeChild(snowflake.getContainer());
    snowflakes.splice(snowflakes.indexOf(snowflake), 1);
  });
}

for (const snowflake of snowflakes) {
  makeInteractive(snowflake);
}