import { User } from "../models/User";
import { store } from "../stores/store";
import { setUser } from "../stores/userSlice";
import api from "../interceptors/axiosInterceptor";

class SecurityService extends EventTarget {
    keySession: string;
    API_URL: string;
    user: User;
    theAuthProvider: any;

    constructor() {
        super();
        this.keySession = 'session';
        this.API_URL = import.meta.env.VITE_API_URL || "";
        const storedUser = localStorage.getItem("user");
        this.user = storedUser ? JSON.parse(storedUser) : {};
    }

    async login(user: User) {
        console.log("llamando api " + `${this.API_URL}/login`);
        try {
            const response = await api.post("/login", user);
            const data = response.data;

            localStorage.setItem("user", JSON.stringify(data));
            store.dispatch(setUser(data));

            return data;
        } catch (error) {
            console.error("Error durante login:", error);
            throw error;
        }
    }

    getUser() {
        return this.user;
    }

    logout() {
        this.user = {};
        localStorage.removeItem("user");
        this.dispatchEvent(new CustomEvent("userChange", { detail: null }));
    }

    isAuthenticated() {
        return localStorage.getItem(this.keySession) !== null;
    }

    getToken() {
        return localStorage.getItem(this.keySession);
    }
}

export default new SecurityService();
