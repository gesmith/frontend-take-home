import type { Role } from "../types";

const LOCAL_API_SERVER = "http://localhost:3002";

export const fetchRoles = async (
  page: number,
  search: string
): Promise<Role[]> => {
  const url = new URL(`${LOCAL_API_SERVER}/roles`);
  url.searchParams.set("page", String(page));
  if (search) {
    url.searchParams.set("search", String(search));
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return await data;
};

export const updateRole = async (role: Role): Promise<Role> => {
  const body = JSON.stringify({ ...role });
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
  return response.json();
};
