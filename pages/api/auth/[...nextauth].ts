
 import { NextApiRequest, NextApiResponse } from "next";
 import { LOGIN_URL } from "@src/lib/spotify";
 import axios from "axios";
 import NextAuth, { Session } from "next-auth";
 import { JWT } from "next-auth/jwt";
 import SpotifyProvider from "next-auth/providers/spotify";


 declare module "next-auth" {
   interface Session {
     user: {
       accessToken: string;
       refreshToken: string;
       username: string;
       image?: string;
       name: string;
     };
     refreshToken: string;
     error: string;
   }
 }

 interface RefreshTokenResponse {
   access_token: string;
   expires_in: number;
   token_type: string;

 }


 declare module "next-auth/jwt" {
   interface JWT {
     accessToken?: string;
     refreshToken?: string;
     expires_in: number;
   }
 }

 const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
 const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

 const refreshToken = async (
   refreshToken: string
 ): Promise<RefreshTokenResponse> => {
   const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
     "base64"
   );

   try {
     const response = await axios.post(
       "https:accounts.spotify.com/api/token",
       new URLSearchParams({
         grant_type: "refresh_token",
         refresh_token: refreshToken,
       }).toString(),
       {
         headers: {
           Authorization: `Basic ${basicAuth}`,
           "Content-Type": "application/x-www-form-urlencoded",
         },
       }
     );
     return response.data;
   } catch (error) {
     console.error(error);
     throw new Error("Failed to refresh access token");
   }
 };

 export default NextAuth({
   providers: [
     SpotifyProvider({
       clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
       clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
       authorization: LOGIN_URL,
     }),
   ],
   secret: process.env.JWT_SECRET,
   callbacks: {
     async jwt({ token, account, user }): Promise<JWT> {
       if (token && user) {
         return {
           ...token,
           accessToken: account?.access_token,
           refreshToken: account?.refresh_token,
           username: account?.providerAccountId,
           expires_in: (account?.expires_at as number) * 1000,
         };
       }
       if (Date.now() < token.expires_in) {
         return token;
       }
       console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
       try {
         const refreshedTokenData = await refreshToken(token.refreshToken!);
         return {
           ...token,
           accessToken: refreshedTokenData.access_token,
           accessTokenExpires: Date.now() + refreshedTokenData.expires_in * 1000,
           refreshToken: token.refreshToken,
         };
       } catch (error) {
         console.error(error);
         return {
           ...token,
           error: "RefreshAccessTokenError",
         };
       }
     },
     async session({
       session,
       token,
     }: {
       session: Session;
       token: JWT;
     }): Promise<Session> {
       session.user.accessToken = token.accessToken as string;
       session.refreshToken = token.refreshToken as string;
       session.user.username = token.username as string;

       return session;
     },
   },
   pages: {
     signIn: "/",
   },
 });
