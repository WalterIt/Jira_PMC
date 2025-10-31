"use server";

import { z } from "zod";
import { SettingsSchema } from "@/schemas";
import { auth } from "@/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  try {


    // Atualização de nome
    if (values.name) {
      await auth.api.updateUser({
        headers: await headers(),
        body: { name: values.name },
      });
    }


    // Atualização de senha
    if (values.password && values.newPassword) {
      await auth.api.changePassword({
        headers: await headers(),
        body: {
          currentPassword: values.password,
          newPassword: values.newPassword,
        },
      });
    }

    // Revalidação dos caminhos
    const paths = ["/", "/login", "/server", "/client", "/admin", "/settings"];
    paths.forEach((path) => revalidatePath(path));

    return { success: "User Settings Updated!" };
  } catch (err) {
    return {
      error: err instanceof APIError
        ? err.message
        : "Internal Server Error"
    };
  }
};
