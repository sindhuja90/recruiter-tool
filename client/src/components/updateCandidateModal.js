import React, { useState } from "react";

// Modal for updating candidate details
const UpdateCandidateModal = ({ isOpen, onClose, candidateName, onUpdate }) => {
  // State to manage the current status of the candidate
  const [currentStatus, setCurrentStatus] = useState("");

  // Function to clear input fields
  const clearFields = () => {
    setCurrentStatus("");
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (candidateName && currentStatus) {
      try {
        const response = await fetch("http://localhost:5000/update-candidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidateName,
            currentStatus,
          }),
        });

        const responseBody = await response.json();

        if (response.ok) {
          console.log("Candidate updated successfully");

          // Triggering the onUpdate callback to update the state
          await onUpdate(currentStatus);

          onClose();
          clearFields();
        } else {
          console.error("Failed to update candidate:", responseBody);
        }
      } catch (error) {
        console.error("Error updating candidate:", error);
      }

      onClose();
    } else {
      alert("Please fill in all mandatory fields.");
    }
  };

  return (
    // Modal container with overlay
    <div className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-900 opacity-50"
      ></div>

      <div className="modal-container bg-white w-96 p-4 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold text-center mb-2 font-sans">
          Update Candidate Details
        </h2>

        {/* Form for updating current status */}
        <div className="mb-4">
          <label className="block">
            Current Status{" "}
            <select
              name="currentStatus"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
        </div>

        {/* Submit button */}
        <button
          onClick={() => {
            handleSubmit();
            clearFields();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 block mx-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateCandidateModal;
