import React from "react";

// Header component displaying the application title and tagline
const Header = () => {
  return (
    <div className="bg-teal-500 text-white text-center py-4">
      <h1 className="text-4xl font-bold mb-2 text-white font-rubik">
        TalentHive
      </h1>
      <p className="text-lg font-sans text-white mb-1">
        Streamlining Recruitment, Unleashing Potential
      </p>
    </div>
  );
};

export default Header;
