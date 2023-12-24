import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user: User = {
          id: '',
          email: '',
          name: ''
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((res) => res.json());

        if(!response?.accessToken) {
          return {
            ...user,
            email: JSON.stringify(response)
          };
        }
        try {
          const decoded: any = jwt.verify(response.accessToken, String(process.env.JWT_SECRET));
          user.id = decoded.establishment?.id || response.establishment?.id || 'mockId';
          user.name = decoded.establishment?.name || response.establishment?.name || 'mockName';
          user.email = decoded.establishment?.email || response.establishment?.email || JSON.stringify(decoded);
          cookies().set('accessToken', String(response.accessToken))
          return user;
        } catch(error) {
          console.error('Erro ao verificar o token JWT:', error);
          return {
            ...user,
            accessToken: response.accessToken,
            email: JSON.stringify(error)
          };
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    jwt({ token, user }) {
      console.log('Token JWT:', token);
      return token;
    },
    session({ session, token }) {
      console.log('Objeto de Sessão:', session);
      return session;
    },
  },
  events: {
    signOut: () => {
      cookies().set('accessToken', '')
    } 
  },
  secret: process.env.JWT_SECRET,
};

