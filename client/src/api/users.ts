const LOCAL_API_SERVER = "http://localhost:3002";

export const fetchUsers = async ({
  page = 1,
  search,
}: {
  page: number;
  search?: string;
}) => {
  try {
    const response = await fetch(
      `${LOCAL_API_SERVER}/users?page=${page}${
        search ? "&search=" + search : ""
      }`
    );
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    console.log(data);
    return await data;
  } catch (error: unknown) {
    return {
      message: error instanceof Error ? error.message : "Server error",
      status: "500",
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await fetch(`${LOCAL_API_SERVER}/users/${userId}`, {
      method: "DELETE",
    });
  } catch (error: unknown) {
    return {
      message: error instanceof Error ? error.message : "Server error",
      status: "500",
    };
  }
};
