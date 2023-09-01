# Testpod

Testpod is an interactive website that offers engaging flag games to help users learn about flags from around the world. Through DMV quizzes, Flag games, and flag identification tasks, users can improve their knowledge of flags while enjoying an immersive and educational gaming experience.

## Features

 - Flag Quizzes: Test your flag knowledge with interactive quizzes that challenge you to identify flags from different countries and regions.
 - DMV Quizes: Prepare yourself with the DMV practice quizzes from testpod.
 - Flag Game: Solve flag-themed Game and unlock new units as you progress.
 - Flag Identification Challenges: Engage in flag identification challenges that test your ability to recognize flags from different nations.
 - Progress Tracking: Keep track of your learning journey with detailed progress tracking, including completed quizzes, achievements, and skill levels.
 - Gamification: Earn points, badges, and rewards as you complete units, and reach important milestones.
 - User-Friendly Interface: Enjoy a seamless user experience with a clean and intuitive interface designed for easy navigation and maximum enjoyment.
 - Responsive Design: Access Testpod from your desktop, laptop, or mobile device, ensuring a consistent experience across all platforms.

## Project Structure

The project follows the following structure:

- models: Contains the data models used in the project.
    - admin.js: Model for managing admin data.
    - allFlagsData.js: Model for handling flag-related data.
    - drawFlagGame.js: Model for the draw-flag game data.
    - drawNewFlag.js: Model for managing new-flag data.
    - flagDetectiveGame.js: Model for the flag-detective game data.
    - flagPuzzleGame.js: Model for the flag-puzzle game data.
    - flagQuestGame.js: Model for the flag-quest game data.
    - guessCountryGame.js: Model for the guess-country game data.
    - guessFlagGame.js: Model for the guess-flag game data.
    - logs.js: Model for managing log data.
    - podAdventure.js: Model for the pod-adventure game data.
    - result.js: Model for storing game results.
    - test.js: Model for managing DMV test data.
    - user.js: Model for managing user data.

- public: Contains all the public files of admin and client sides
    - js
    - css
    - images
    - sounds

- middleware: Contains index.js file
    - middleware for admin
    - middleware for user

- routes: Contains the route handlers for the project.
    - admin folder: Holds the admin-side routes.
        - blogManagement.js: Handles add and manage blog routes.
        - drawFlagGame.js: Handles add and manage draw-flag-game routes.
        - flagDetectiveGame.js: Handles add and manage flag-detective-game routes.
        - flagPuzzleGame.js: Handles add and manage flag-puzzle-game routes.
        - flagQuestGame.js: Handles add and manage flag-quest-game routes.
        - guessCountryGame.js: Handles add and manage guess-country-game routes.
        - guessFlagGame.js: Handles add and manage guess-flag-game routes.
        - index.js: Handles all remaining pages routes in the admin side.
        - newFlag.js: Handles add and manage new-flag routes.
        - podAdventure.js: Handles add and manage pod-adventure-game routes.
        - test.js: Handles add and manage DMV test routes.
        - userManagement.js: Handles user management routes.

    - client folder: Contains the client-side routes.
        - drawFlagGame.js: Handles play draw-flag-game routes.
        - flagDetectiveGame.js: Handles play flag-detective-game routes.
        - flagPuzzleGame.js: Handles play flag-puzzle-game routes.
        - flagQuestGame.js: Handles play flag-quest-game routes.
        - guessCountryGame.js: Handles play guess-country-game routes.
        - guessFlagGame.js: Handles play guess-flag-game routes.
        - index.js: Handles all remaining pages routes in the client side.
        - learningFlag.js: Handles play learning-flag-game routes.
        - podAdventure.js: Handles play pod-adventure-game routes.
        - test.js: Handles attempt DMV test routes.
        - userManagement.js: Handles website's user routes.

- views: Contains the view templates for the project.
    - admin folder: Holds the admin-side view pages and relevant folders.
    - client folder: Contains the client-side view pages and relevant folders.

- db.js: MongoDB Connection file

- app.js: this is our root file

## Getting Started

To get started with the Testpod project, follow these steps:

1. Clone the repository: git clone https://github.com/User-Experience-Hub/testpod.git
2. Navigate to the project directory: cd testpod
3. Install the required dependencies: npm install

## Usage
1. Start the development server: npm start
2. Open your web browser and go to http://localhost:9898 to access Testpod.
3. Explore the various flag games and modules to enhance your flag knowledge, DMV Quizes and have fun.
4. To access the dashboard you can use this credentials:
    - Username: admin
    - Password: admin

## Contributing

If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature-name
3. Make your changes and commit them: git commit -m 'Add your commit message'
4. Push your changes to the branch: git push origin feature/your-feature-name
5. Open a pull request on the main repository.

## Acknowledgments
We would like to express our gratitude to the following resources and libraries that have contributed to the development of Testpod:
   - HTML /CSS /Bootstrap
   - Plain Javascript
   - Node Js
   - Express Js
   - MongoDB

## Contact
If you have any questions, feedback, or suggestions, please feel free to contact us at contact@testpod.com.
Thank you for using Testpod! Enjoy your flag learning journey and have fun playing the games!
