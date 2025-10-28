'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const getUsers = async () => {
  const users = await db.user.findMany({
    orderBy:{name: 'asc'}
  });

  return users;
}


// Delete an User by ID
export const deleteUserById = async (userId: string) => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) throw new Error("Unauthorized");

  if (session.user.role !== "ADMIN" || session.user.id === userId) {
    throw new Error("Forbidden");
  }

  try {
    await db.user.delete({
      where: {
        id: userId,
        role: "USER",
      },
    });

    if (session.user.id === userId) {
      await auth.api.signOut({ headers: headersList });
      redirect("/login");
    }

    revalidatePath("/admin");
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Internal Server Error" };
  }
}