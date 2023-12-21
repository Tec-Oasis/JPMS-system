import axios from "axios";
import { AuthBindings } from "@refinedev/core";

// const serverUrl = import.meta.env.VITE_DEVELOPMENT_SERVER_URL;
const serverUrl = import.meta.env.VITE_PRODUCTION_SERVER_URL;


export const authProvider: AuthBindings = {

  login: async ({ email, password }) => {
    let userData: any;
    await axios
      .post(`${serverUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        userData = res.data;
        console.log("login ran", res);
      })
      .catch((err) => {
        console.error(err);
      });

    // in the request we would send the email and password, check it against the database and return the user if it exists
    //  and the password is correct, if correct a session token would be created and sent back to the client
    //  and the client would store the token in local storage along with the user object.

    if (userData) {
      console.log("success", email, password);
      localStorage.setItem("token", userData?.token);
      localStorage.setItem("user_data", JSON.stringify(userData?.user));
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    // Suppose we actually send a request to the back end here.
    //  and the back end would delete the session token from the database
    //  and the client would delete the token from local storage.
    console.log("logout ran");
    let deleted = false;
    await axios
      .delete(`${serverUrl}/auth/logout`, {
        data: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        deleted = true;
        console.log("logout ran",res);
      })
      .catch((err) => { 
        console.error(err);
      });

    localStorage.removeItem("token");
    localStorage.removeItem("user_data");

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    // Suppose we actually send a request to the back end here.
    //  and the back end would check the session token against the database
    //  and the client would check the token in local storage.
    console.log("check ran");
    let token;
    await axios
      .patch(`${serverUrl}/auth/check`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        token = res.data.token;
        console.log("check axios ran", res);
      })
      .catch((err) => {
        console.error(err);
      });

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user: any = localStorage.getItem("user_data");
      return {
        name: user?.name,
        role: user?.role,
        // avatar: "https://i.pravatar.cc/300",
        avatar:
          "https://cdn4.iconfinder.com/data/icons/essential-app-2/16/user-avatar-human-admin-login-512.png",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
