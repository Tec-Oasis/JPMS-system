import { AccessControlProvider } from "@refinedev/core";

// const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
// const role = userData.role;

export const accessControlProvider: AccessControlProvider = {
  can: async ({ action, params, resource }) => {
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    const role = userData.role;

    console.log("role from can");
    if (
      resource === "users" &&
      ["list", "create"].includes(action) &&
      role === "manager"
    ) { 
      return {
        can: true,
      };
    }
    if (
      resource === "dashboard" &&
      ["list"].includes(action) &&
      (role === "manager" || role === "caretaker")
    ) {
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
      ["list", "edit", "create", "show"].includes(action) &&
      role === "manager" 
    ) {
      return {
        can: true,
      };
    }

    if (
      resource === "customers" &&
      ["list", "show"].includes(action) &&
      (role === "manager" || role === "caretaker")
    ) {
      return {
        can: true,
      };
    }

    if (
      resource === "tenants" &&
      ["list", "show"].includes(action) &&
      (role === "manager" || role === "caretaker")
    ) {
      return {
        can: true,
      };
    }

    if (
      resource === "contracts" &&
      ["list", "show"].includes(action) &&
      (role === "manager" || role === "caretaker")
    ) {
      return {
        can: true,
      };
    }

    if (
      resource === "invoices" &&
      ["list", "show"].includes(action) &&
      (role === "manager" || role === "caretaker")
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
