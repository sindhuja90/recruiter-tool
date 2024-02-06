import React, { useState } from "react";

// AddCandidateModal component for displaying the modal to add a new candidate
const AddCandidateModal = ({ isOpen, onClose, onAdd }) => {
  // Base URL for the backend server
  const baseURL =
    "https://recruiter-tool-backend-yxsl.onrender.com" ||
    "http://localhost:5000";

  // State variables to store form input values
  const [candidateName, setCandidateName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skillsQualifications, setSkillsQualifications] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [nodeJsExperience, setNodeJsExperience] = useState("");
  const [reactJsExperience, setReactJsExperience] = useState("");

  // Function to clear all form fields
  const clearFields = () => {
    setCandidateName("");
    setEmailId("");
    setPhoneNumber("");
    setSkillsQualifications("");
    setCurrentStatus("");
    setExpectedSalary("");
    setNodeJsExperience("");
    setReactJsExperience("");
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (
      candidateName &&
      emailId &&
      phoneNumber &&
      skillsQualifications &&
      currentStatus &&
      expectedSalary &&
      nodeJsExperience &&
      reactJsExperience
    ) {
      try {
        const response = await fetch(baseURL + "/add-candidate", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidateName,
            emailId,
            phoneNumber,
            skillsQualifications,
            currentStatus,
            expectedSalary,
            nodeJsExperience,
            reactJsExperience,
          }),
        });

        const responseBody = await response.json();

        if (response.ok) {
          console.log("Form submitted successfully");

          // Triggering the onAdd callback to update the state
          await onAdd();

          onClose();
          clearFields();
        } else {
          console.error("Failed to submit form:", responseBody);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }

      onClose();
    } else {
      alert("Please fill in all mandatory fields.");
    }
  };

  // JSX for rendering the AddCandidateModal component
  return (
    // Modal container with overlay
    <div className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-900 opacity-50"
      ></div>

      {/* Close button */}
      <div className="modal-container bg-white w-96 p-2 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Form */}
        <h2 className="text-lg font-bold text-center mb-2 font-sans">
          Add Candidate Details
        </h2>

        <div>
          <label className="block mb-2 ml-2 mr-2">
            Candidate Name{" "}
            <input
              id="candidateName"
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
          </label>

          <label className="block mb-2 ml-2 mr-2">
            Email ID{" "}
            <input
              id="emailId"
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
          </label>

          <label className="block mb-2 ml-2 mr-2">
            Phone Number{" "}
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              placeholder="10-digit number"
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ""))}
              className="w-full p-2 mb-4 border rounded-md"
            />
          </label>

          <label className="block mb-2 ml-2 mr-2">
            Skills/Qualifications{" "}
            <input
              id="skillsQualifications"
              type="text"
              value={skillsQualifications}
              placeholder="Comma-separated values"
              onChange={(e) => setSkillsQualifications(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
          </label>

          <label className="block mb-2 ml-2 mr-2">
            Current Status{" "}
            <select
              name="currentStatus"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Contacted">Contacted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Extended">Offer Extended</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label className="block mb-2 ml-2 mr-2">
            Expected Salary{" "}
            <input
              id="expectedSalary"
              type="text"
              value={expectedSalary}
              placeholder="in INR"
              onChange={(e) =>
                setExpectedSalary(e.target.value.replace(/\D/, ""))
              }
              className="w-full p-2 mb-4 border rounded-md"
            />
          </label>

          <div className="flex mb-4 ml-2 mr-2">
            <div className="w-1/2 pr-2">
              <label className="block mb-2">
                Node.js Experience{" "}
                <input
                  id="nodeJsExperience"
                  type="text"
                  value={nodeJsExperience}
                  placeholder="in years"
                  onChange={(e) =>
                    setNodeJsExperience(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>

            <div className="w-1/2 pl-2">
              <label className="block mb-2 ml-2 mr-2">
                React.js Experience{" "}
                <input
                  id="reactJsExperience"
                  type="text"
                  value={reactJsExperience}
                  placeholder="in years"
                  onChange={(e) =>
                    setReactJsExperience(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={() => {
            handleSubmit();
            clearFields();
          }}
          className="bg-blue-500 text-white p-2 rounded-md w-2/5 block mx-auto hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddCandidateModal;
