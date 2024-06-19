import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = {
                    id: req?.body?.id,
                    name: req?.body?.name,
                    email: req?.body?.email,
                }

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
});

export { handler as GET, handler as POST };
