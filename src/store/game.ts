export const gameState = {
    id: '2',
};

export type GameState = typeof gameState;
  
export const game = {
    state: ():GameState => gameState,
};
