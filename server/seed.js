// Importing required modules and libraries
const { Pool } = require("pg");

// Loading environment variables from .env file
require("dotenv").config();

// Creating a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// SQL query to create the 'candidates' table if it doesn't already exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    candidate_name VARCHAR(255),
    email_id VARCHAR(255),
    phone_no BIGINT,
    skills_qualifications VARCHAR(255),
    status VARCHAR(255),
    expected_salary NUMERIC,
    computed_score NUMERIC
  );
`;

// SQL query to insert 50 candidates into the 'candidates' table
const insertCandidatesQuery = `
  INSERT INTO candidates (candidate_name, email_id, phone_no, skills_qualifications, status, expected_salary, computed_score)
  VALUES
    ('Indiana Jones', 'indianajones@email.com', 1234567890, 'Node.js, React.js', 'Contacted', 100000, 6),
    ('James Bond', 'jamesbond@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5.5),
    ('Katniss Everdeen', 'katnisseverdeen@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Bruce Wayne', 'brucewayne@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Wednesday Addams', 'wednesdayaddams@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5.5),
    ('Michael Corleone', 'michaelcorleone@email.com', 1234567890, 'Node.js, React.js', 'Hired', 120000, 7),
    ('Tris Prior', 'trisprior@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Regina George', 'reginageorge@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Tony Stark', 'tonystark@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Hermione Granger', 'hermionegranger@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5),
    ('John Wick', 'johnwick@email.com', 1234567890, 'Node.js, React.js', 'Contacted', 95000, 5.5),
    ('Ethan Hunt', 'ethanhunt@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5),
    ('Amy Dunne', 'amydunne@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Jason Bourne', 'jasonbourne@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Sherlock Holmes', 'sherlockholmes@email.com', 1234567890, 'Node.js, React.js', 'Hired', 120000, 7),
    ('Jack Ryan', 'jackryan@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Daenerys Targaryen', 'daenerystargaryen@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Vito Corleone', 'vitocorleone@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Harry Potter', 'harrypotter@email.com', 1234567890, 'Node.js, React.js', 'Contacted', 95000, 5.5),
    ('Elle Woods', 'ellewoods@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5),
    ('John Rambo', 'johnrambo@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Rocky Balboa', 'rockybalboa@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Jack Sparrow', 'jacksparrow@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5),
    ('Lara Croft', 'laracroft@email.com', 1234567890, 'Node.js, React.js', 'Hired', 120000, 7),
    ('Jughead Jones', 'jugheadjones@email.com', 1234567890, 'Node.js, React.js', 'Hired', 120000, 7),
    ('Sarah Connor', 'sarahconnor@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Devi Vishwakumar', 'devivishwakumar@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Phoebe Buffay', 'phoebebuffay@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Rachel Green', 'rachelgreen@email.com', 1234567890, 'Node.js, React.js', 'Contacted', 95000, 5.5),
    ('Monica Geller', 'monicageller@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5),
    ('Stiles Stilinski', 'stilesstilinski@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Lydia Martin', 'lydiamartin@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Gale Hawthorne', 'galehawthorne@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Chandler Bing', 'chandlerbing@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Archie Andrews', 'archieandrews@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Ross Geller', 'rossgeller@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Joey Tribbiani', 'joeytribbiani@email.com', 1234567890, 'Node.js, React.js', 'Hired', 120000, 7),
    ('Veronica Lodge', 'veronicalodge@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Mia Thermopolis', 'miathermopolis@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Derek Hale', 'derekhale@email.com', 1234567890, 'Node.js, React.js', 'Hired', 120000, 7),
    ('Allison Argent', 'allisonargent@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Finnick Odair', 'finnickodair@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Anastasia Steele', 'anastasiasteele@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Peeta Mellark', 'peetamellark@email.com', 1234567890, 'Node.js, React.js', 'Offer Extended', 100000, 6),
    ('Enola Holmes', 'enolaholmes@email.com', 1234567890, 'Node.js, React.js', 'Contacted', 95000, 5.5),
    ('Nancy Drew', 'nancydrew@email.com', 1234567890, 'Node.js, React.js', 'Rejected', 90000, 5),
    ('Betty Cooper', 'bettycooper@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Scott McCall', 'scottmccall@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6),
    ('Benjamin Gates', 'benjamingates@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5),
    ('Riley Poole', 'rileypoole@email.com', 1234567890, 'Node.js, React.js', 'Interview Scheduled', 110000, 6.5)
`;

// Function to seed the database
const seedDatabase = async () => {
  try {
    await pool.query(createTableQuery);
    console.log("Table created successfully");

    await pool.query(insertCandidatesQuery);
    console.log("Candidates inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
};

seedDatabase();
