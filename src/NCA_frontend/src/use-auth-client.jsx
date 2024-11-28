import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  canisterId,
  createActor,
  NCA_backend,
} from "../../declarations/NCA_backend";
import { canisterId as internetIdentityCanisterId } from "../../declarations/internet_identity";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://${internetIdentityCanisterId}.localhost:4943/`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);  // New state for initialization flag
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuthClient = async () => {
      try {
        const client = await AuthClient.create(options.createOptions);
        await updateClient(client);
      } catch (error) {
        console.error("Error creating AuthClient", error);
        setIsInitializing(false);  // Stop loading on error
      }
    };

    initializeAuthClient();
  }, [options.createOptions]); // Add `createOptions` as dependency

  const login = () => {
    if (!authClient) {
      console.error("authClient is not initialized yet.");
      return;
    }
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
      onError: (error) => {
        console.error("Login failed:", error);
      }
    });
  };  

  const logout = async () => {
    try {
      if (!authClient) {
        console.error("authClient is not initialized yet.");
        return;
      }
      await authClient.logout();
      await updateClient(authClient);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Update client state and fetch user-related data
  async function updateClient(client) {
    try {
      const isAuthenticated = await client.isAuthenticated();
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();
      const actor = createActor(canisterId, { agentOptions: { identity } });
  
      setAuthClient(client);
      setIsAuthenticated(isAuthenticated);
      setIdentity(identity);
      setPrincipal(principal);
      setWhoamiActor(actor);
      setUser(actor);
    } catch (error) {
      console.error("Error updating client:", error);
      setIsInitializing(false); // Stop loading on error
      setIsAuthenticated(false); // Mark as not authenticated
    }
  }

  // Authentication check function with error handling
  async function checkAuthentication() {
    // if (isInitializing || !authClient || !principal) {
    //   return false; // Avoid checking if still initializing
    // }
  
    const check = await authClient.isAuthenticated();
    const checkUser = await NCA_backend.getUser(principal).catch((error) => {
      console.error("Error fetching user", error);
      return { err: true };
    });
  
    if (!check || checkUser.err) {
      navigate(`/NCA/login`);
    }
    return check;
  }

  // Function to get user info by principal
  const getUser = async () => {
    if (!user || !principal) {
      console.error("User or Principal is missing.");
      return null;
    }
    try {
      // Check if the user actor has the required method
      if (typeof user.getUser === 'function') {
        const loggedInUser = await user.getUser(principal);
        console.log("Logged-in user:", loggedInUser);
        return loggedInUser;
      } else {
        console.error("getUserById is not a function on the user actor.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
      return null;
    }
  };  

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
    user,
    checkAuthentication,
    getUser,
    isInitializing,  // Expose initialization status to components
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  console.log("Auth state:", auth);

  // if (auth.isInitializing) {
  //   console.log("AuthClient is initializing...");
  //   return <div>Loading authentication...</div>;
  // }

  // if (!auth.isAuthenticated) {
  //   return <div>Error: Unable to authenticate. Please try again.</div>;
  // }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
