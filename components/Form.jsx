import { useState } from "react";
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Question</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} your question to engage with the CFA community and get the insights you need.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism p-5">

        <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Short Description 📚
          </span>
          <textarea
            value={post.shortDescription}
            onChange={(e) => setPost({ ...post, shortDescription: e.target.value })}
            placeholder="Briefly describe your question"
            required
            className="form_textarea_short"
          />
        </label>

        <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Detailed Description 📖
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Provide more details about your question"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Tags #️⃣
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#CFA #Level1 #Level2 #Level3 #ExamPrep #Jobs"
            required
            className="form_input" />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form;