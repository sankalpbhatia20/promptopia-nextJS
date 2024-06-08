import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick, handleVote, handleAnswer }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [answer, setAnswer] = useState("");

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.shortDescription);
    navigator.clipboard.writeText(post.shortDescription);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleVoteClick = (type) => {
    handleVote(post._id, type);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    handleAnswer(post._id, answer);
    setAnswer("");
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            style={{ marginTop: "10px" }}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.shortDescription}</p>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.description}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <button onClick={() => handleVoteClick("upvote")} className="vote-btn">👍</button>
        <span>{post.votes}</span>
        <button onClick={() => handleVoteClick("downvote")} className="vote-btn">👎</button>
      </div>
      <form onSubmit={handleAnswerSubmit} className="mt-4">
        <label className="block mb-2 font-satoshi font-semibold text-gray-700">
          Your Answer
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          required
          className="form_textarea"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-primary-orange text-white rounded">
          Submit Answer
        </button>
      </form>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <button
            className="del-btn"
            onClick={handleDelete}
          >
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;