import { AuthBindings } from "@refinedev/core";

// export const TOKEN_KEY = "refine-auth";

const mockUsers = [{ email: "john@mail.com", password: "123" }, { email: "jane@mail.com", password: "123" }];

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {

    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === email);
    // console.log("user", user);
    
    if (user && user.password === password) {
      console.log("success", email, password)
      // localStorage.setItem(TOKEN_KEY, email);
      localStorage.setItem("auth", JSON.stringify(user.email));
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
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem("auth");
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
    const token = localStorage.getItem("auth");
    if (token) {
      return {
        id: 1,
        name: "Admin",
        // avatar: "https://i.pravatar.cc/300",
        avatar: "https://cdn4.iconfinder.com/data/icons/essential-app-2/16/user-avatar-human-admin-login-512.png"
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
