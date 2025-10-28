import { betterAuth } from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";

import {db} from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api"; 
import { normalizeName, VALID_DOMAINS } from "@/lib/utils";
import { UserRole } from "@/generated/prisma/client";
import { admin } from "better-auth/plugins"
import { ac, roles } from "@/lib/permissions";


export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        if (!VALID_DOMAINS().includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain. Please use a valid email.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }

          return { data: user };
        },
      },
    },
  },  
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";



















// import authConfig from "./auth.config"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { db } from "./lib/db"
// import { getUserByEmail, getUserById,  } from "./data/user"
// import { getTokenConfirmationByUserId } from "./data/two-factor-confirmation"
// import { UserRole } from "@prisma/client"
// import { getAccountByUserId } from "./data/account"






// export const {
  // handlers: { GET, POST },
  // auth,
  // signIn,
  // signOut,
// } = betterAuth({
  // pages : {
  //   signIn : "/login",
  //   error : "/error"
  // },
  // events : {
    // async linkAccount({user}) {
    //   await db.user.update({
    //     where : {id : user.id}, 
    //     data : {emailVerified : new Date()}
    //   })
    // }
  // },
  // callbacks : {
    // async signIn({user, account}) {

    //   // console.log({'USER & ACCOUNT': user, account})
      
    //   // Allow AOuth logins without email verification
    //   if (account?.provider !== "credentials") return true;

    //   const existingUser = await getUserById(user.id);


    //   // Prevent login if email is not verified
    //   if (!existingUser?.emailVerified) return false 

    //   if (existingUser.isTwoFactorEnabled) {
    //     const tokenConfirmation = await getTokenConfirmationByUserId(existingUser.id)

    //     if (!tokenConfirmation) return false
        
    //     await db.twoFactorConfirmation.delete({
    //       where : {id : tokenConfirmation.id}
    //     })

    //     return true
    //   }
      
    //   return true
    // },
    // async session({token, session}) {
    //   try {
    //   if(token.sub && session.user) {
    //     session.user.id = token.sub
    //   }

    //   // console.log({SessionToken: session});
      
    //   if(token.role && session.user) {
    //     session.user.role = token.role as UserRole
    //   }      

    //   if(session.user) {
    //     session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
    //   }

    //   if(session.user) {
    //     session.user.email = token.email as string
    //     session.user.name = token.name as string
    //     session.user.image = token.image as string
    //     session.user.role = token.role as UserRole
    //     session.user.isOauth = token.isOauth as boolean
    //   }

    //   return session
    // } catch (error) {
    //   console.error("Session callback error:", error)
    //   return session
    // }
    // },
    // async jwt({token}) {
    //   if(!token.sub) return token;

    //   // console.log(token)

    //   const existingUser = await getUserById(token.sub);
    //   if(!existingUser) return token;

    //   const existingAccount = await getAccountByUserId(existingUser.id)
      
    //   token.isOauth = !!existingAccount
    //   token.name = existingUser.name
    //   token.email = existingUser.email
    //   token.image = existingUser.image
    //   token.role = existingUser.role
    //   token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

    //   return token
    // }
  // },
  // adapter: PrismaAdapter(db),
  // session: {strategy : "jwt"},
  // ...authConfig
// })