import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    try {
        // Await the result of req.json() since it's asynchronous
        const { userId , 
                shortDescription, 
                description, 
                tag } = await req.json();

        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            //prompt,
            shortDescription,
            description,
            tag
        });

        console.log("Check Data")
        console.log(newPrompt)

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};