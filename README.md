# Menulator
A fullstack MERN project that helps you meal plan week after week by generating a random menu of your favorite meals!

## Features
+ User account creation and management
+ Adding and managing favorite recipes
+ Generating personalized meal plans
+ User-friendly interface
+ Stripe integration for donations

## Tech Stack
+ **Frontend**: React.js, React Router
+ **Backend**: Node.js, Express.js, Mongoose, bcrypt
+ **Database**: MongoDB

## Installation
To set up the project locally, follow these steps:

Clone the repository: 
```bash
git clone https://github.com/s-waldo/Menulator-fs-project.git
```   
Navigate to the project directory:
```bash
cd menulator
```
Install dependencies: 
```bash
npm install
```
Set up environment variables: 
Create a ```.env``` file and add your MongoDB connection string and any other necessary environment variables.
Start the development server: 
```bash
npm run dev
```
## Usage
- Account Creation and Login: Users can create an account or log in on the main page.
- Adding Favorite Meals: Navigate to the "Recipes" tab, click "Add New Recipe," specify the meal type, and enter recipe name.
- Generating Meal Plans: Go to the "Menu" tab, click "Create New Menu," and the app will generate a random meal plan.
- Viewing the Meal Plan: The generated meal plan is accessible from the "Menu" tab.
- User Settings: Access and modify user profile information (name, email, password, avatar) in the "Settings" tab.
## Deployment
Menulator is deployed on Netlify and can be accessed at [this link](https://sw-menulator-frontend.netlify.app/). The app is automatically deployed with every push to the main branch.
An example profile can be logged into using the following credentials:
- Username: test@example.com
- PW: Test1234!

>[!NOTE]
>Due to the limitations of the free tier for the server, there might be a significant delay (20-60 seconds) when logging in for the first time.

## Contributing
We welcome contributions to Menulator!

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes
- Commit and push your changes
- Submit a pull request
## Known Issues
- **Login Delays:** Due to limitations of the free Netlify tier, there might be a significant delay (20-60 seconds) when logging in for the first time. We are working on a solution to improve performance.
- **Password Reset:** Password reset functionality is currently not implemented.
- **Stripe Ingegration:** The current stripe integration is just under test mode.  Donations and payments will currently not work at this stage.
- **Side Dish:** Users can select recipes for "side dishes."  There is currently no functionality to add side dishes to weekly menus.
## License
Licensed with Apache 2.0 License.  License information can be found in the License file in the repository root.
