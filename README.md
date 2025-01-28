# Pet Props

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [Usage](#usage)
- [Contact-Me](#contact-me)
- [Contributors](#contributors)
- [Testing](#testing)

## Description

PetAdoptMe is a web application designed to facilitate the adoption of pets from shelters and rescue organizations. The platform includes a unique social media matchmaking feature that helps potential adopters find the perfect pet based on their preferences and social media activity.

## Requirements

- Uses Node.js and Express.js to create a RESTful API.
- Uses React for the front end.
- Uses PostgreSQL and the Sequelize ORM for the database.
- Has both GET and POST routes for retrieving and adding new data.
- Uses at least two server-side APIs.
- Includes authentication using JWT.
- Enviroment variables used to protect Api Keys and sensitive information.
- Deploys using render(with data).

## Usage

- Pet Profiles: Detailed profiles for each pet available for adoption, including photos, descriptions, and adoption status.
- Search and Filter: Advanced search and filter options to help users find pets that match their criteria.
- Social Media Matchmaking: Integrates with social media platforms to analyze user preferences and suggest compatible pets.
- Adoption Forms: Online forms for interested adopters to submit their applications.
- Shelter Listings: Directory of participating shelters and rescue organizations.
- User Accounts: Secure user accounts for adopters to save favorite pets, track applications, and receive updates.
- Admin Dashboard: Tools for shelter administrators to manage pet listings, adoption applications, and user accounts.
- Email api is being used so when the user uses the contact page it will send all of the information to the admins email address.
- Added a map function for utilization of an api to see the location of the pets that the user selects for adoption.

  ## Contact-Me

  - Email - bybee.brandon1@gmail.com
  - GitHub - [bbybee1747](https://github.com/bbybee1747/PetProps)

  ## Contributors

  - Brandon Bybee / Bud Triplett / Rafael Guerra / Michael Ester

  ## Testing

  1. Client side: "Bun run build" to recompile the project.
  2. Sever side: Create data base through the config file.
  3. Run the seed file,
  4. Run "npx tsc" to compile.
  5. Server side: "Bun run start" to get application running.

  License: MIT
  https://opensource.org/licenses/MIT
