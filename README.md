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

2. Install dependencies for both the client and the server.

   ```
   cd recruiter-tool/client
   npm install
   cd ../server
   npm install
   ```

3. Set up your PostgreSQL database via ElephantSQL.

   - If you haven't already, sign up for an ElephantSQL account at https://www.elephantsql.com/.
   - Create a new database instance.
   - Create a `.env` file in `/server` folder and add the following variable:

     ```
     DATABASE_URL="insert-your-database-instance-URL-from-Details-page"
     ```

4. Seed the database.

   In the root directory (`/recruiter-tool`), run the following commands in your terminal to create the database table and seed the database with initial data.

   ```
   cd server
   npm run seed
   ```

5. Start the backend server.

   The backend server will be available at http://localhost:5000.

   In the root directory (`/recruiter-tool`), run the following commands in your terminal to start the backend server.

   ```
   cd server
   npm start
   ```

6. Start the frontend server.

   In the root directory (`/recruiter-tool`), run the following commands in another terminal to start the client.

   ```
   cd client
   npm start
   ```

Visit http://localhost:3000 in your browser to access TalentHive.

### Optional: Hosting Your Application

#### Deploying Backend to Render

1. If you haven't already, sign up for a Render account at https://render.com/.
2. Connect a Github repository and create a new web service.
3. Configure web service and deploy.
   - Set the root directory to `server`.
   - Set the build command to `npm install` and the start command to `npm start`.
   - Set the environment variable `DATABASE_URL` with your ElephantSQL database instance URL.
4. Update Proxy in Frontend.

   In the `package.json` file of the frontend application (`/client`), update the proxy to point to the backend service URL on Render.

5. Create a `.env` file in `/client` folder and add the following variable.

   ```
   REACT_APP_BACKEND_URL="insert-your-backend-service-URL-on-Render"
   ```

#### Deploying Frontend to Netlify

The frontend client can be hosted separately on services like Netlify.

1. If you haven't already, sign up for a Netlify account at https://www.netlify.com/.
2. Connect a Github repository and create a new web service.
3. Configure the site and deploy.
   - Set the base directory to `client`.
   - Set the build command to `npm run build` and set the publish directory to `client/build`.
   - Set the environment variable `REACT_APP_BACKEND_URL` with the URL of your backend service.

### Application Link

The app is deployed on Netlify and accessible at https://talenthive.netlify.app/.

**Note**: Initial loading of table data might be delayed as the backend server is hosted on Render. Render temporarily spins down free web services after 15 minutes of inactivity, which can delay requests by 50 seconds or more.

### Demo

Watch a demo of TalentHive [here](https://example.com/).
