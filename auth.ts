import { betterAuth } from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {db} from "./lib/db";



export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
    emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

})



















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