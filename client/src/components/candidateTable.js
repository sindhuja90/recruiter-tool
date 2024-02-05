import React, { useState, useEffect } from "react";
import AddCandidateModal from "./addCandidateModal.js";
import CandidateTableRow from "./candidateTableRow.js";

// CandidateTable component for displaying the candidate table
const CandidateTable = () => {
  // State variable to store the list of candidates
  const [candidates, setCandidates] = useState([]);

  // Fetch candidates from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/read-candidates")
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error("Error fetching candidates:", error));
  }, []);

  // State variables for controlling the Add Candidate modal
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // Function to open the Add Candidate modal
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  // Function to close the Add Candidate modal
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  // Function to refresh table after adding a new candidate
  const handleAddCandidate = () => {
    fetch("http://localhost:5000/read-candidates")
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error("Error fetching candidates:", error));
  };

  // Function to refresh table after updating a candidate
  const onUpdate = async (candidate, newStatus) => {
    const updateCandidates = candidates.map((c) =>
      c.candidate_name === candidate.candidate_name
        ? { ...c, status: newStatus }
        : c
    );

    setCandidates(updateCandidates);
  };

  // Function to refresh table after deleting a candidate
  const onDelete = (candidate) => {
    const updatedCandidates = candidates.filter(
      (c) => c.candidate_name !== candidate.candidate_name
    );
    setCandidates(updatedCandidates);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const candidatesPerPage = 10;
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const endIndex = startIndex + candidatesPerPage;
  const currentCandidates = candidates.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sorting candidates by computed score
  const handleSort = () => {
    const sortedCandidates = [...candidates].sort((a, b) => {
      return b.computed_score - a.computed_score;
    });

    setCandidates(sortedCandidates);
  };

  // State variable for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle searching candidates by name
  const handleSearch = () => {
    const filteredCandidates = candidates.filter((candidate) =>
      candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCandidates(filteredCandidates);
  };

  // JSX for rendering the CandidateTable component
  return (
    <div className="flex-grow mx-auto max-w-screen-2xl mt-8 p-4 px-10">
      {/* Search input and button */}
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="float-left mb-4 px-2 py-1 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-3 py-1 rounded ml-2 hover:bg-blue-600"
      >
        Search
      </button>

      {/* Add Candidate button */}
      <button
        onClick={openAddModal}
        className="float-right bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Candidate
      </button>

      {/* Candidate table */}
      <table className="w-full border-collapse border border-gray-300">
        {/* Table header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">CANDIDATE NAME</th>
            <th className="py-2">EMAIL ID</th>
            <th className="py-2">PHONE NO.</th>
            <th className="py-2">SKILLS/QUALIFICATIONS</th>
            <th className="py-2">STAUTS</th>
            <th className="py-2">EXPECTED SALARY</th>
            <th className="py-2">
              COMPUTED SCORE{" "}
              <button
                onClick={handleSort}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-yellow-600"
              >
                ↑
              </button>
            </th>
            <th className="py-2">ACTIONS</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {currentCandidates.map((candidate, index) => (
            <CandidateTableRow
              key={index}
              candidate={candidate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination and page information */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-sans">
          Showing {startIndex + 1} to {Math.min(endIndex, candidates.length)} of{" "}
          {candidates.length} entries
        </div>
        <div className="flex items-center">
          {Array.from({
            length: Math.ceil(candidates.length / candidatesPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className="bg-blue-500 text-white px-3 py-1 rounded ml-2 font-sans hover:bg-blue-600"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Copyright information */}
      <p className="text-center mt-8 text-gray-500 text-sm font-sans">
        Made with ❤️ by{" "}
        <a
          href=" https://www.linkedin.com/in/sindhuja-nagaraja-sudhakar-5209a5211/"
          className="text-blue-500"
        >
          Sindhuja Nagaraja Sudhakar
        </a>
      </p>

      {/* Add Candidate modal */}
      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={handleAddCandidate}
      />
    </div>
  );
};

export default CandidateTable;
