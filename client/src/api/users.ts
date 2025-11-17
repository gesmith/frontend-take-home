const LOCAL_API_SERVER = "http://localhost:3002";

export const fetchUsers = async () => {
  try {
    const response = await fetch(LOCAL_API_SERVER + "/users");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return await data;
  } catch (error) {
    console.error(error.message);
  }
};

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
    console.error(error.message);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const req = {
      method: "DELETE",
    };

    const response = await fetch(`${LOCAL_API_SERVER}/users/${userId}`, req);

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};
