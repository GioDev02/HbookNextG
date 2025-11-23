import { useState, useEffect, createContext } from "react";
import { Token, User } from "@/api";

const tokenCtrl = new Token();
const userCtrl = new User();
export const AuthContext = createContext();

export function AuthProvider(props) {
    console.log(props);
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setLoading(false);
        (async () => {
            const token = tokenCtrl.getToken();
            if (!token) {
                logout();
                setLoading(false);
                return;
            }
            if (tokenCtrl.hasExpired(token)) {
                logout();
            } else {
                await login(token);
            }
        })();
    }, []);

    const login = async (token) => {
        try {
            //console.log(token)
            //TODO: Setear el token en el localStorage
            tokenCtrl.setToken(token);
            //TODO: Obtener lso datos del usuario
            const response = await userCtrl.getMe();
            console.log("hola desde Authcntext ", response);
            //TODO: Setear los datos del usuario en el estado USER
            //TODO: Setear el valor de token en el state token  (si se puede 1)
            //TODO: Hacer un setLoading false (si se puede 2)
            //  setUser({ email: "giovanni@gmail.com" });
            setUser(response);
            setToken(token);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const logout = () => {
        //console.log("CERRAR SESION")
        //recordar que cerrar sesion no es más que borrar el token de localStorage y
        //reiniciar los estados
        tokenCtrl.removeToken(token);
        setToken(null);
        setUser(null);

    }

    //Actualizar el usuario a nivel local
    const updateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        })
    }


    const data = {
        accessToken: token,
        user: user,
        login: login,
        logout: logout,
        updateUser: updateUser,
    };

    if (loading) return null;

    return (<AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>);
}