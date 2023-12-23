import { AccessControlProvider } from "@refinedev/core";
import { newEnforcer } from "casbin";
import { adapter, model } from "./accessControl";

// const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
// const role = userData.role;

export const accessControlProvider: AccessControlProvider =  {
  can: async ({ action, params, resource }) => {

    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    const role = userData.role;

    console.log("role from can",)
    if (resource === "users" && action === "list" && role === "manager") {
      return {
        can: true,  
      };
    }

    if (
      resource === "properties" &&
      ["list", "edit", "create", "show"].includes(action) &&
      (role === "manager" || role === "caretaker")
    ) {
      return {
        can: true,
      };
    }

    if (
      resource === "caretaker_properties" &&
      action === "list" &&
      role === "manager"
    ) {
      return {
        can: true,
      };
    }

    return {
      can: false,
      reason: "Unauthorized",
    };
  },
};
