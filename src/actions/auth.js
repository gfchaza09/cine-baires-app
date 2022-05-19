import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import swal from "@sweetalert/with-react";

import { googleAuthProvider } from "../firebase/config-firebase";
import { types } from "../types/types";

const auth = getAuth();

export const googleLogin = () => {

    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                const token = user.accessToken;
                sessionStorage.setItem("token",token);
                swal(<h2>¡Perfecto! Ingresaste correctamente</h2>, {
                    icon: "success",
                })
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
                swal(<h2>¡Perfecto! Ingresaste correctamente</h2>, {
                    icon: "success",
                })
                dispatch(login(user.uid, user.displayName));
            })
            .catch ((error)=>{
                swal(<h2>Las credenciales no son válidas.</h2>,{
                    icon: "error",
                })
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
                swal(<h2>Ya existe una cuenta con ese email.</h2>,{
                    icon: "error",
                })
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