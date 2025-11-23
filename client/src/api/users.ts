import type { User } from "@/types";

const LOCAL_API_SERVER = "http://localhost:3002";

export const fetchUsers = async (
  page: number,
  search: string
): Promise<User[]> => {
  const url = new URL(`${LOCAL_API_SERVER}/users`);
  url.searchParams.set("page", String(page));
  if (search) {
    url.searchParams.set("search", String(search));
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Server error: " + response.status);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${LOCAL_API_SERVER}/users/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Server error: " + response.status);
  }
};

export const updateUser = async (user: User): Promise<User> => {
  const body = JSON.stringify({ ...user });
  const req = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  const response = await fetch(`${LOCAL_API_SERVER}/users/${user.id}`, req);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
};
