import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

// Utils
import { swal } from '../utils/swal';

import { googleAuthProvider } from "../firebase/config-firebase";
import { types } from "../types/types";

const auth = getAuth();

export const googleLogin = () => {

    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                const token = user.accessToken;
                sessionStorage.setItem("token",token);
                swal({type: 'success', message: 'Ingresaste correctamente, disfruta de nuestro sitio web.'});
                dispatch(login(user.uid, user.displayName));
            });
    };
};

export const emailAndPasswordLogin = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({user})=> {
                const token = user.accessToken;
                sessionStorage.setItem("token",token);
                swal({type: 'success', message: 'Ingresaste correctamente, disfruta de nuestro sitio web.'});
                dispatch(login(user.uid, user.displayName));
            })
            .catch ((error)=>{
                swal({type: 'error', message: 'Las credenciales no son válidas.'});
            })
    }
}

export const register = (email, password, username) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user})=> {
                await updateProfile(auth.currentUser, {displayName: username})

                dispatch(login(user.uid, user.displayName));
            })
            .catch((error)=> {
                swal({type: 'error', message: 'Ya existe una cuenta con ese email.'});
            });
    };
};

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch({
            type: types.logout,
        });
        sessionStorage.clear();
    }
}