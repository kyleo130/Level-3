import { Sprite } from "./sprite.js"
export const BridgeTile = function(ctx, x, y) {

    const sequences = {
        safe: { x: 0, y: 0, width: 32, height: 32, count: 1, timing: 100, loop: false },
        danger: { x: 128, y: 32, width: 32, height: 32, count: 1, timing: 100, loop: false }
    }

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.danger)
          .useSheet("./asset/IndustrialTileSetWithBackground.png");

    const safe = function() {
        sprite.setSequence(sequences.safe);
    };

    const danger = function() {
        sprite.setSequence(sequences.danger);
    };

    return {
        safe: safe,
        danger: danger,
        draw: sprite.draw,
        update: sprite.update,
        getXY: sprite.getXY
    };
};
