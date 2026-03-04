import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'The End Productions <hello@theendtravel.com>',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/check-email',
  },
  callbacks: {
    async signIn({ user }) {
      console.log(`[Auth] User signed in: ${user.email}`);
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) { session.user.id = token.sub; }
      return session;
    },
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
});
