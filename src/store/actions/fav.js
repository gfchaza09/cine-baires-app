import { addDoc, collection, deleteDoc, doc  } from "firebase/firestore/lite";
import { db } from "../../firebase/config-firebase";
import { types } from "../types";

export const favAdd = (movieData) => {

    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        const datos = {
            movieData
        };

        const tempMovies = getState().fav.data;

        let movieIsInArray = tempMovies.find(movie => {
            return movie.movieData.id === movieData.id;
        });

        if (movieIsInArray) {
            return
        }

        const referencia = await addDoc (collection(db,`${uid}/favoritos/favorito`), datos);

        const id = await referencia.id;

        const newData = {
            ...datos,
            id,
        }

        dispatch(add(newData));
    }
}

export const add = (data) => {
    return {
        type: types.favAdd,
        payload: data
    }
}

export const favRead = (data) => {

    return {
        type: types.favRead,
        payload: data
    }

}

export const favRemove = (id) => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        const tempMovies = getState().fav.data;

        let movieIsInArray = tempMovies.find(movie => {
            return movie.movieData.id === id;
        });

        if (!movieIsInArray) {
            return
        }

        await deleteDoc (doc(db, `${uid}/favoritos/favorito`,movieIsInArray.id));

        dispatch(remove(movieIsInArray.id));
    }
}

export const remove = (id) => {
    return {
        type: types.favRemove,
        payload: id,
    }
}

export const clean = () => {
    return {
        type: types.favClean,
    }
}