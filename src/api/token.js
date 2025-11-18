import { ENV } from "@/utils"
import jwtDecode from "jwt-decode";

export class Token {
    setToken(token) {
        localStorage.setItem(ENV.TOKEN, token)
    }

    getToken() {
        return localStorage.getItem(ENV.TOKEN);
    }

    hasExpired(token) {
        //decodificando el token
        const tokenDeCode = jwtDecode(token);
        const expireDate = tokenDeCode.exp * 1000 // para convertirlo en milisegundos que es lo necesario en js  -> FECHA EXPIRACION 
        const currentDate = new Date().getTime();  // - >Fecha acatual 

        if (currentDate > expireDate) {
            return true; // en caso de que haya expirado el token 
        }
        return false;
    }

    removeToken() {
        localStorage.removeItem(ENV.TOKEN);
    }
}