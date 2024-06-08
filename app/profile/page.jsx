"use client"

import Profile from "@components/Profile";
import { useState } from "react";

const MyProfilePage = ({ myPosts, handleEdit, handleDelete }) => {
  const [userDesc, setUserDesc] = useState(""); // State variable to store user's bio description
  const [userHobbies, setUserHobbies] = useState(""); // State variable to store user's hobbies

  // Function to handle bio description change
  const handleDescChange = (e) => {
    setUserDesc(e.target.value);
  };

  // Function to handle hobbies change
  const handleHobbiesChange = (e) => {
    setUserHobbies(e.target.value);
  };

  // Function to handle saving bio description
  const handleSaveBio = (newDesc) => {
    setUserDesc(newDesc);
  };

  // Function to handle saving hobbies
  const handleSaveHobbies = (newHobbies) => {
    setUserHobbies(newHobbies);
  };

  return (
    <div className="w-full max-w-full">
      <Profile
        name="My"
        bio={userDesc} // Pass user's bio description as prop
        hobbies={userHobbies} // Pass user's hobbies as prop
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleBioChange={handleSaveBio} // Pass function to save bio description
        handleHobbiesChange={handleSaveHobbies} // Pass function to save hobbies
      />
    </div>
  );
};

export default MyProfilePage;
