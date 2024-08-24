import {inherits} from "util"
import {Game} from "../../core/Game";

export class TerrainRenderer {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private imageData: ImageData


    constructor(private game: Game) { }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("2d")

        this.imageData = this.context.getImageData(0, 0, this.game.width(), this.game.height())
        this.initImageData()
        this.canvas = document.createElement('canvas');
        const backgroundCtx = this.canvas.getContext('2d');
        this.canvas.width = this.game.width();
        this.canvas.height = this.game.height();
        backgroundCtx.putImageData(this.imageData, 0, 0);
    }

    initImageData() {
        const theme = this.game.config().theme()
        this.game.forEachTile((tile) => {
            let terrainColor = theme.terrainColor(tile)
            const index = (tile.cell().y * this.game.width()) + tile.cell().x
            const offset = index * 4
            this.imageData.data[offset] = terrainColor.rgba.r;
            this.imageData.data[offset + 1] = terrainColor.rgba.g;
            this.imageData.data[offset + 2] = terrainColor.rgba.b;
            this.imageData.data[offset + 3] = terrainColor.rgba.a * 255 | 0
        })
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(
            this.canvas,
            -this.game.width() / 2,
            -this.game.height() / 2,
            this.game.width(),
            this.game.height()
        )
    }
}