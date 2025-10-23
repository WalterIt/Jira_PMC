import NextAuth from "next-auth";
import {
  publicRoutes,
  prefixRoutes,
  DEFAULT_REDIRECT_ROUTES,
  authRoutes
} from "@/route"
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig)

export default auth ((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth 
    console.log("ROUTE:", req.nextUrl.pathname);
    console.log("IS LOGGEDIN:", isLoggedIn);

    const isApiRoutes = nextUrl.pathname.startsWith(prefixRoutes)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

    if (isApiRoutes) {
      return null;
    }
  
    if (isAuthRoutes) {
      if(isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTES, nextUrl))
      }
      return null;
    }
    
    
        if ( !isLoggedIn && !isPublicRoutes ) {
          let callbackUrl = nextUrl.pathname
          if (nextUrl.search) {
            callbackUrl += nextUrl.search
          }
    
          const encodeCallbackUrl = encodeURIComponent(callbackUrl)
    
          return Response.redirect(new URL(`/login?callbackUrl=${encodeCallbackUrl}`, nextUrl))
        }


})
    
export const config = {
  matcher: [ "/((?!.+\\.[\\w]+$|_next).*)","/(api|trpc)(.*)"], // apenas essas rotas exigem login
}


// import { useSession } from "next-auth/react";



// export default auth ((req) => {
//     const { nextUrl } = req
//     const isLoggedIn = !!req.auth 

//     console.log("ROUTE:", nextUrl.pathname);
//     console.log("IS LOGGEDIN:", isLoggedIn);

   
   

      

  
  
// })

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: [ "/((?!.+\\.[\\w]+$|_next).*)","/(api|trpc)(.*)"],
// }