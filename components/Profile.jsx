import { useState } from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, bio, hobbies, data, handleEdit, handleDelete, handleBioChange, handleHobbiesChange }) => {
  const [editingBio, setEditingBio] = useState(bio);
  const [editingHobbies, setEditingHobbies] = useState(hobbies || "");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    console.log("Contact number saved:", contactNumber);
  };

  const handleCountryCodeChange = (code) => {
    setSelectedCountryCode(code);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left half */}
      <section className="flex flex-col">
        <h1 className="head_text text-left">
          <span className="blue_gradient">My Profile</span>
        </h1>

        <div className="bio-section">
          <h2 className="section-title mt-5">Write your Bio 📝</h2>
          <div className="input-container">
            <input
              className="form_textarea"
              value={editingBio}
              onChange={(e) => setEditingBio(e.target.value)}
              placeholder="Enter bio"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveBioClick();
                }
              }}
            />
          </div>
        </div>

        <div className="hobbies-section">
          <h2 className="section-title">Hobbies</h2>
          <div className="input-container">
            <input
              type="text"
              value={editingHobbies}
              onChange={(e) => setEditingHobbies(e.target.value)}
              placeholder="Enter hobbies"
              className="form_input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveHobbiesClick();
                }
              }}
            />
          </div>
        </div>

        <div className="contact-section">
          <h2 className="section-title">Contact Number</h2>
          <div className="input-container">
            <select
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="country-code-dropdown"
            >
              {countryCodeOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
              className="phone-number-input"
            />
          </div>
        </div>

        <button className="submit-btn mt-5" onClick={handleSaveContactNumberClick}>
          <span className="submit-btn-content">Save</span>
        </button>
      </section>

      {/* Right half */}
      <section className="flex flex-col">
        {console.log("Hello test data")}
        {console.log(data)}

        <div className="mt-10 prompt_layout">
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
    </div>
  );
};

export default Profile;