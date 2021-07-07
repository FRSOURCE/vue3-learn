export const userState = {
    difficulty: 'Junior',
    userName: '',
};

export type UserState = typeof userState;
  
 export const user = {
    state: ():UserState => userState,
     mutations: {
        setDifficulty(state: UserState, difficulty:string):void{
          state.difficulty = difficulty;
        },
        setUserName(state: UserState, userName:string):void{
          state.userName = userName;
        }
     },
  }