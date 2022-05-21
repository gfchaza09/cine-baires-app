import { collection, getDocs } from "firebase/firestore/lite"
import { db } from "../firebase/config-firebase"

export const loadData = async (uid) => {

    const response = await getDocs(collection (db, `${uid}/favoritos/favorito`));
    const data = [];
    
    response.forEach((favorito) => {
            const favData = favorito.data();

            data.push({
                id: favorito.id,
                ...favData
            });
    });

    return data;
}