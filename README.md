# recruiter-tool

## TalentHive - Recruitment Management System

_TalentHive_ is a web-based application designed to streamline and enhance the recruitment process. Built with _React_, _Tailwind CSS_, _Express.js_, _Node.js_, and _PostgreSQL_ via _ElephantSQL_, TalentHive offers a user-friendly interface for managing candidate data effectively.

### Features
1. **Candidate Management**: Easily add, update, and delete candidate details.
2. **Search and Sort**: Quickly find candidates using search functionality and sort them based on computed scores.
3. **Pagination**: Navigate through a paginated list of candidates for a better user experience.
4. **Scoring System**: Automatically compute candidate scores based on relevant experience.

### Installation
1. Clone the repository.
   ```
   git clone https://github.com/sindhuja90/recruiter-tool.git
   ```

3. Install dependencies for both the client and the server.
   ```
   cd recruiter-tool/client
   npm install
   cd ../server
   npm install
   ```

5. Set up your PostgreSQL database via ElephantSQL.
   - Create an ElephantSQL account.
   - Create a database instance.
   - Create a `.env` file in `/server` folder and add the following variable:
     
     ```
     DATABASE_URL="insert-your-database-instance-URL-from-Details-page"
     ```

6. Seed the database.
   
   In the root directory (`/recruiter-tool`), run the following commands in your terminal to create the database table and seed the database with initial data.
   ```
   cd server
   npm run seed
   ```

8. Start the backend server.

   The backend server will be available at http://localhost:5000.
   In the root directory (`/recruiter-tool`), run the following commands in your terminal to start the backend server.
   ```
   cd server
   npm start
   ```

10. Start the frontend server.

    In the root directory (`/recruiter-tool`), run the following commands in another terminal to start the client.
    ```
    cd client
    npm start
    ```

Visit http://localhost:3000 in your browser to access TalentHive.

### Application Link
The app is deployed on Netlify and accessible at [https://talenthive.netlify.app/](https://talenthive.netlify.app/).

### Demo
Watch a demo of TalentHive [here](https://example.com/).
