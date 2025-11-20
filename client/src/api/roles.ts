import type { Role } from "../types";

const LOCAL_API_SERVER = "http://localhost:3002";

export const fetchRoles = async () => {
  try {
    const response = await fetch(LOCAL_API_SERVER + "/roles");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return await data;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Server error",
      status: "500",
    };
  }
};

export const editRole = async (role: Role) => {
  const body = JSON.stringify({ ...role });
  try {
    const req = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const response = await fetch(`${LOCAL_API_SERVER}/roles/${role.id}`, req);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Server error",
      status: "500",
    };
  }
};
