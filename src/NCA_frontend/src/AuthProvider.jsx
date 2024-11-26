import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from '../../declarations/NCA_backend/';

const AuthContext = createContext();

const defaultOptions = {
    createOptions: {
        idleOptions: {
            disableIdle: true,
        },
    },
    loginOptions: {
        identityProvider: "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/",
    },
};

export const useAuthClient = (options = defaultOptions) => {
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [callFunction, setCallFunction] = useState(null);

    // Initialize AuthClient on mount
    useEffect(() => {
        AuthClient.create(options.createOptions).then(async (client) =>{
            updateClient(client);
        });
    }, []);

    // Update client state and set identity
    async function updateClient (client) {
        const isAuthenticated = await client.isAuthenticated();
        setIsAuth(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);
        
        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthUser(client);

        const actor1 = createActor(canisterId, {
            agentOptions:{
                identity,
            },
        });

        setCallFunction(actor1);
    };

    // Reset the authentication state
    // const resetAuthState = () => {
    //     setIdentity(null);
    //     setPrincipal(null);
    //     setAuthUser(null);
    //     setCallFunction(null);
    // };

    // Login function
    const login = () => {
        authUser.login({
            ...options.loginOptions,
            onSuccess: () => {
                updateClient(authUser);
            },
        });
    };

    // Logout function
    async function logout(){
        await authUser?.logout();
        await updateClient(authUser);
    };

    // const login = async () => {
    //     if (authUser) {
    //         try {
    //             await authUser.login({
    //                 ...options.loginOptions,
    //                 onSuccess: () => {
    //                     updateClient(authUser);
    //                 },
    //                 onError: (error) => {
    //                     console.error("Login failed:", error);
    //                 },
    //             });
    //         } catch (error) {
    //             console.error("Error logging in:", error);
    //         }
    //     }
    // };

    // const logout = async () => {
    //     try {
    //         if (authUser) {
    //             await authUser.logout();
    //             resetAuthState();
    //         }
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };

    return {
        isAuth,
        login,
        logout,
        authUser,
        identity,
        principal,
        callFunction,
    };
};

export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();
    
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);