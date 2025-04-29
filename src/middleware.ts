import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: [
        '/',
        '/api/webhook',
        '/websearch',
        '/sign-in',
        '/sign-up',
    ],
    ignoredRoutes: [
        '/arch',
        '/api/chat'
    ]
});
 
export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/(api|trpc)(.*)"
    ]
};