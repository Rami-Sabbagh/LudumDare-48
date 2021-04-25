import { Entity, Tile } from '../engine';
import Direction from '../lib/direction';

export default class Player extends Entity {
    public onMove = () => { };

    constructor(tile: Tile, private solid: boolean[][]) {
        super(tile);
    }

    private getTargetTile(direction: Direction): Tile | undefined {
        const {
            tileX: x,
            tileY: y,
            layer: { tiles },
        } = this.tile;

        switch (direction) {
            case Direction.TOP:
                return tiles[x]?.[y - 1];
            case Direction.BOTTOM:
                return tiles[x]?.[y + 1];
            case Direction.LEFT:
                return tiles[x - 1]?.[y];
            case Direction.RIGHT:
                return tiles[x + 1]?.[y];
        }
    }

    move(direction: Direction) {
        const targetTile = this.getTargetTile(direction);
        if (!targetTile || this.solid[targetTile.tileX][targetTile.tileY]) return;

        const targetRawId = targetTile.rawTileId;
        targetTile.rawTileId = this.tile.rawTileId;
        this.tile.rawTileId = targetRawId;
        this.tile = targetTile;

        this.onMove();
    }
}
