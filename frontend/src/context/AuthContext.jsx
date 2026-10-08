import { create } from "axios";
import { createContext,useContext,useState } from "react";

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const storedUser=localStorage.getItem('user')
        return storedUser? JSON.parse(storedUser):null;
    })
    const login=(data)=>{
        localStorage.setItem('access_token',data.tokens.access)
        localStorage.setItem('refresh_token',data.tokens.refresh)
        localStorage.setItem('user',JSON.stringify(data.user))
        setUser(data.user)
    }
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        setUser(null);
    };
    const isAuthenticated= !!user;
    return (
        <AuthContext.Provider value={{user,login,logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)