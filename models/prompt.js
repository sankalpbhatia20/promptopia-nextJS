import { Schema, model, models } from 'mongoose';

/*const ImageSchema = new Schema({
    url: String,
    caption: String,
    // Add more fields as needed for image metadata
});*/

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    shortDescription: {
        type: String,
        required: [true, "Short description is required"]
    },
    description: { //prompt
        type: String,
        required: [true, "Detailed description is required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;