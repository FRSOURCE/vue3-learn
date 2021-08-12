export type MapElements = Array<MapElement>;

//rename models
export type MapElement = {
    id: number,
    x: number,
    y: number,
    xOffset: number,
    yOffset: number,
    width: number,
    height: number,
    calculatedWidth: number,
    calculatedHeight: number,
    isObjectHigher: boolean,
    category: string,
    fileName: string,
    alt: string,
    animationClass: Record<string, boolean>
}

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

export type Player = {
    x: number,
    y: number,
};

export type EntranceField = {
    x: number,
    y: number,
};

export type Entrance = Array<EntranceField>;

export type Obstacle = {
    x: number,
    y: number,
};

export type Obstacles = Array<Obstacle>;