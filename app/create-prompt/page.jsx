"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ shortDescription: "",
                                      description: "",
                                      tag: ""});

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(post) //checking by logging

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          shortDescription: post.shortDescription,
          //prompt: post.prompt,
          description: post.description,
          tag: post.tag,
        }),
      });

      console.log("Here is your response")
      console.log(response)

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;