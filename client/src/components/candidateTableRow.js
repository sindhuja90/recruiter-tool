import React, { useState } from "react";
import UpdateCandidateModal from "./updateCandidateModal.js";
import DeleteCandidateModal from "./deleteCandidateModal.js";

// CandidateTableRow component to display a single row in the candidate table
const CandidateTableRow = ({ candidate, onUpdate, onDelete }) => {
  // State for controlling the Update Candidate modal
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Function to open the Update Candidate modal
  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  // Function to close the Update Candidate modal
  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  // Function to refresh table after updating a candidate
  const handleUpdateStatus = (newStatus) => {
    onUpdate(candidate, newStatus);
  };

  // State for controlling the Delete Candidate modal
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to open the Delete Candidate modal
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to close the Delete Candidate modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Function to refresh table after deleting a candidate
  const handleDeleteCandidate = () => {
    onDelete(candidate);
  };

  // Destructuring candidate object for easy access
  const {
    candidate_name,
    email_id,
    phone_no,
    skills_qualifications,
    status,
    expected_salary,
    computed_score,
  } = candidate;

  // Determine the status color based on the candidate's status
  let statusColour = "";
  if (candidate.status === "Contacted") {
    statusColour = "text-yellow-500";
  } else if (status === "Interview Scheduled") {
    statusColour = "text-blue-500";
  } else if (status === "Offer Extended") {
    statusColour = "text-purple-500";
  } else if (status === "Hired") {
    statusColour = "text-green-500";
  } else if (status === "Rejected") {
    statusColour = "text-red-500";
  }

  // JSX for rendering the CandidateTableRow component
  return (
    <tr className="border-b border-gray-300">
      {/* Candidate details columns */}
      <td className="pl-4 py-2">{candidate_name}</td>
      <td className="pl-4 py-2">{email_id}</td>
      <td className="pl-4 py-2">{phone_no}</td>
      <td className="pl-4 py-2">{skills_qualifications}</td>
      <td className={`pl-4 py-2 font-bold ${statusColour}`}>{status}</td>
      <td className="pl-4 py-2">{expected_salary}</td>
      <td className="pl-4 py-2">{computed_score}</td>

      {/* Action buttons column */}
      <td className="pl-4 py-2 space-x-2">
        <button
          onClick={openUpdateModal}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Update
        </button>
        <button
          onClick={openDeleteModal}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>

      {/* Modals for updating and deleting candidates */}
      <UpdateCandidateModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        candidateName={candidate_name}
        onUpdate={handleUpdateStatus}
      />
      <DeleteCandidateModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        candidateName={candidate_name}
        onDelete={handleDeleteCandidate}
      />
    </tr>
  );
};

export default CandidateTableRow;
