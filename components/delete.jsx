import { useState } from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, bio, hobbies, data, handleEdit, handleDelete, handleBioChange, handleHobbiesChange }) => {
  const [editingBio, setEditingBio] = useState(bio);
  const [editingHobbies, setEditingHobbies] = useState(hobbies || "");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState(""); // State variable for selected country code

  const countryCodeOptions = [
    { name: "India (+91)", code: "+91" },
    { name: "USA (+1)", code: "+1" },
    { name: "UK (+44)", code: "+44" },
    // Add more country options as needed
  ];

  const handleSaveBioClick = () => {
    handleBioChange(editingBio);
  };

  const handleSaveHobbiesClick = () => {
    const hobbiesArray = editingHobbies.split(",").map((hobby) => hobby.trim());
    handleHobbiesChange(hobbiesArray);
  };

  const handleSaveContactNumberClick = () => {
    // Implement save function for contact number
    console.log("Contact number saved:", contactNumber);
  };

  const handleCountryCodeChange = (code) => {
    setSelectedCountryCode(code);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">My Profile</span>
      </h1>

      <div className="bio-section">
        {/* Bio input field */}
      </div>

      <div className="hobbies-section">
        {/* Hobbies input field */}
      </div>

      {/* Contact input field */}
      <div className="contact-section">
        <h2 className="section-title">Contact Number</h2>
        <div className="input-container">
          {/* Dropdown for country code */}
          <select
            value={selectedCountryCode}
            onChange={(e) => handleCountryCodeChange(e.target.value)}
            className="country-code-dropdown"
          >
            <option value="">Select Country Code</option>
            {countryCodeOptions.map((option, index) => (
              <option key={index} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>

          {/* Contact number input field */}
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
            className="form_input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveContactNumberClick();
              }
            }}
          />
          <button className="like_btn" onClick={handleSaveContactNumberClick}>
            Save Contact Number
          </button>
        </div>
      </div>

      <div className="mt-10 prompt_layout">
        {/* Render PromptCards if data is not undefined */}
        {data && data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;