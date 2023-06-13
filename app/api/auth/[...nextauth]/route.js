import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { userAgent } from "next/server";

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email }).maxTimeMS(30000);;
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }){
            try{
                await connectToDB();
    
                // check is a user already  exists
                const UserExists = await User.findOne({ email: profile.email }).maxTimeMS(30000);;
    
                // if not, create a new user and save it to DB
                if (!UserExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }