import { types } from "../types/types";

const initialState = {
    data: [],
};

export const FavReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.favAdd:
            return {
                ...state,
                data: [...state.data, action.payload]
            };

        case types.favRead:
            return {
                ...state,
                data : action.payload
            };

        case types.favRemove:
            return {
                ...state,
                data: state.data.filter((fav)=>{
                    return fav.id !== action.payload
                }),
            };

        case types.favClean:
            return {
                ...state,
                data: [],
            };

        default:
            return state;
    };
};