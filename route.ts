/***
 * These are routes that can be accessed without authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/new-verification"   

]

/**
 * Auth routes are routes that can be accessed for authentication
 * These routes will redirect to the Settings Page
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/reset",
    "/error",
    "/new-password",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix will be handled by the authentication middleware 
 * @type {string}
 */
export const prefixRoutes = "/api/auth"


/**
 * The default route to redirect after login or authentication
 * @type {string}
 */
export const DEFAULT_REDIRECT_ROUTES = "/profile"
// export const DEFAULT_LOGIN_REDIRECT = "/login"