# [The True Kanban Board](https://the-true-kanban-board.netlify.app/)

## The only board you will ever need to help you keep tabs on your project!

Simply create your board, add columns and cards to organize your workflow, and prioritize your tasks! In just few clicks you are up and running! All this for free and available as an open source.

![](https://github.com/mr-robak/kanban-hackathon/blob/readme/readme_assets/THE-TRUE-KANBAN.gif)

#### See the site deployed here: [https://the-true-kanban-board.netlify.app/](https://the-true-kanban-board.netlify.app/)

---

1. [Overview](#overview)

   - [Learning Goals](#learning-goals-)
   - [Challenges](#challenges)
   - [Who are we?](#who-are-we-)
   - [User stories](#user-stories)

2. [Technologies used](#technologies-used-)
3. [Features](#features)
4. [Available Scripts](#available-scripts)

---

## Overview

The project was build from scratch by a team of ultra talented developers, over the course of just one weekend as a part of [Mintbean's Javascript Bootcamp Olympics](https://sites.google.com/mintbean.io/javascriptbootcampolympics/home)!

---

### Who are we?

![](https://github.com/mr-robak/kanban-hackathon/blob/readme/readme_assets/team.jpg)

We are a group of passionate developers who enjoy a good challenge. We are all graduates of elite [Codaisseur Academy](https://codaisseur.com/hire-developers/) and come armed with the cutting edge technologies and skills. Every each one of us will be an invaluable addition to any Developer Team.

If you have a developer position opening or you know of one and think one of us (or all) would be a match, we would love to hear from you!

**Nadine Grant** - [_github_](https://github.com/nmegrant), [_linkedin_](https://www.linkedin.com/in/nadine-g-b7158519a/)

**Marcin Robak** - [_github_](https://github.com/mr-robak), [_linkedin_](https://www.linkedin.com/in/mr-robak/)

**Max Ziegler** - [_github_](https://github.com/contexD), [_linkedin_](https://www.linkedin.com/in/max-z-389a44198/)

---

### Learning Goals

- [✔️] Experience building a full featured web application from scratch with a very tight deadline (3 days)
- [✔️] Learn new technologies, while further developing our skills in the technologies we’ve already learned _(see below for all technologies used)_
- [✔️] Practice using agile methodologies in a [scrum setup](https://github.com/mr-robak/kanban-hackathon/projects/1) to efficiently work and communicate with teammates
- [✔️] Plan our work realistically to be able to deliver an MVP on time
- [✔️] Gain more experience working with version control and github collaboration, reviewing each other's pull requests and solving merging conflicts.

---

### Challenges

![](https://github.com/mr-robak/kanban-hackathon/blob/readme/readme_assets/olympics.jpg)

As a part of [Javascript Bootcamp Olympics](https://sites.google.com/mintbean.io/javascriptbootcampolympics/home)! hosted by [Mintbean](https://www.mintbean.io/).

The event was geared to a fresh graduates of coding bootcamps with a goal of building our portfolio to make our profiles more impressive to employers.

On friday evening we were presented with the task: to build, refine and explain a personal Kanban board!

We were working on the project remotely using Slack our daily stand-ups and put extra attention to communicating our progress. This is where GithHub's [kanban project board](https://github.com/mr-robak/kanban-hackathon/projects/1) was shining extra bright allowing us to track our progress and plan towards delivering a deployable MVP.

Despite crazy pace with this super tight deadline and long ours we had a lot of fun working on this project and we managed to deliver all features requested in the user stories including a big part of the bonus ones!

![](https://github.com/mr-robak/kanban-hackathon/blob/readme/readme_assets/completed-task-kanban.gif)

#### User stories

1. Building the Kanban board

- Required entity relations:
  - Column: Title (required), Ordering, Cards
  - Card: Title (required), Description
  - User: this entity does NOT exist since this is not an authenticated app
- Required features:

  - When the application starts, you have 3 empty columns: "Todo", "In progress", "Done"

  - Each column has a "+" button. The user can click this button to create a task card in any column

  - Task cards clearly display the title of the contained task

  - The user can move tasks between columns using drag-and-drop

  - The user can delete a task.

  - The user can expand a task card to see its description

  - The user can move tasks between columns using the "Move" button in the context menu

  - The user can edit column titles

  - The user can create columns

  - The user can change the order of columns using drag-and-drop

  - The user can delete columns (you will have to decide what happens to a column's cards in this case)

- Bonus features

  - The site is mobile-responsive (highly recommended but not required)

  - Each card has a context menu you can access through right-click (desktop).

  - Each card has a context menu you can access through long-press (mobile).

  - Nice animations

  - The user can access the context menu using right-click

  - The user can add images as attachments to the cards

  - Data is saved to LocalStorage or IndexedDB (to avoid collisions when using FeaturePeek, please use a unique name for the namespace you're saving your data to)

- Disallowed features - These features should NOT be present, in favour of scope management.

  - Login/logout

  - Backend server

2. Refining the UX & optional "help" sections
   UX is important because it tries to fulfill the user's needs. It aims to provide positive experiences that keep users loyal to the product or brand. Additionally, a meaningful user experience allows you to define customer journeys on your website that are most conducive to business success.

In order for your kanban board to have good UX, each part should be either intuitive or clearly & concisely explained.

Suggestions to help with the challenge:

- onboarding tutorial
- help text
- info bubbles
- helpful hints
- clear notifications

3. Landing page + promoting on social media
   - You must create a landing page for your kanban board that clearly explains your product.
   - promote your project on social media! There will be an award for "Best marketing" so make sure you paste your posts + tweets inside the Discord server! and tag Mintbean!!!

---

## Technologies used:

- [React](https://github.com/facebook/react)

- [Typescript](https://github.com/microsoft/TypeScript)

- React hooks

- [React router](https://github.com/ReactTraining/react-router)

- [react-beautiful-dnd ](https://github.com/atlassian/react-beautiful-dnd)

- [Material UI](https://github.com/mui-org/material-ui)

- [Netlify](https://www.netlify.com/) for continuos deployment

---

## Features

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

- `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

- `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

- Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
