# recruiter-tool

## TalentHive - Recruitment Management System

_TalentHive_ is a web-based application designed to streamline and enhance the recruitment process. Built with _React_, _Tailwind CSS_, _Express.js_, and _PostgreSQL_ via _ElephantSQL_, TalentHive offers a user-friendly interface for managing candidate data effectively.

### Features
1. **Candidate Management**: Easily add, update, and delete candidate details.
2. **Search and Sort**: Quickly find candidates using search functionality and sort them based on computed scores.
3. **Pagination**: Navigate through a paginated list of candidates for a better user experience.
4. **Scoring System**: Automatically compute candidate scores based on relevant experience.

### Installation
1. Clone the repository.
   `git clone https://github.com/sindhuja90/recruiter-tool.git`

2. Install dependencies for both the client and the server.
   `cd recruiter-tool`
   `cd client && npm install`
   `cd ../server && npm install`

3. Set up your PostgreSQL database via ElephantSQL.
   - Create an ElephantSQL account.
   - Create a database instance.
   - Create a .env file in `/server` folder and add the following variable:
     `DATABASE_URL=*<insert database instance URL from Details page>*`

4. Seed the database.
   In the root directory, run the following command in your terminal to create the database table and seed the initial data.
   `cd server && npm run seed`

6. Run the server.
   `cd server && npm start`

7. Run the client.
   `cd client && npm start`

Visit {http://localhost:3000} in your browser to access TalentHive.

### Deployment Link

### Demo

