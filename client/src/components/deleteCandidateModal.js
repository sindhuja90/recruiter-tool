import React from "react";

// DeleteCandidateModal component for confirming candidate deletion
const DeleteCandidateModal = ({ isOpen, onClose, candidateName, onDelete }) => {
  // Base URL for the backend server
  const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  // Function to handle the submission of the delete candidate form
  const handleSubmit = async () => {
    try {
      const response = await fetch(baseURL + "/delete-candidate", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateName,
        }),
      });

      const responseBody = await response.json();

      if (response.ok) {
        console.log("Candidate deleted successfully");

        // Triggering the onDelete callback to update the state
        await onDelete();

        onClose();
      } else {
        console.error("Failed to delete candidate:", responseBody);
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }

    onClose();
  };

  // JSX for rendering the DeleteCandidateModal component
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
          Delete Candidate
        </h2>

        <p className="mb-4 text-center">
          Are you sure you want to delete candidate details?
        </p>

        {/* Action buttons */}
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCandidateModal;
