import { UsersListAdmin } from "../types/users";


// Admin

export async function getUsersAdmin() {
  const res = await fetch(`${process.env.ADMIN_API_URL}/users`, {
    method: "GET",
    next: { tags: ["users"] },
  });
  const data: UsersListAdmin = await res.json();
  return data;
}
