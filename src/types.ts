export type MapElements = Array<{
    id: number,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
    width: number,
    height: number,
    isObjectHigher: boolean,
    category: string,
    fileName: string,
    alt: string,
    animationClass: {
        'doors__spritesheet--opening': boolean,
        'doors__spritesheet--closing': boolean,
    } | string,
}>;

export type SpriteBoxStyle = Array<{
    position: string,
    top: string,
    left: string,
    display: string,
    'align-items': string,
    overflow: string,
    width: string,
    height: string,
    transform: string,
    transition: string,
}>;

export type MapSize = {
    width: number,
    height: number,
};