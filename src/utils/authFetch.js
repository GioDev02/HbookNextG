import { Token } from "@/api";

export async function authFetch(url, params) {
    const tokenCtrl = new Token();
    const token = tokenCtrl.getToken();

    // console.log(token);
    // console.log(url);

    const logout = () => {
        tokenCtrl.removeToken();
        window.location.replace("/");
    }

    if (!token) {
        //TODO: logout
        logout();
    } else {
        if (tokenCtrl.hasExpired(token)) {
            //TODO: logout
            logout();
        }
        else {
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`,

                },
            };
            try {
                return await fetch(url, paramsTemp);
            }
            catch (error) {
                return error;
            }
        }
    }
}