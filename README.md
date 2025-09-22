# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Build and Deploy to Firebase Hosting

1. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

2. Build the project:
   ```bash
   yarn build
   # or
   npm run build
   ```

3. Log in to Firebase (if not already):
   ```bash
   firebase login
   ```

4. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

Make sure you have the Firebase CLI installed. If not, install it with:
```bash
npm install -g firebase-tools
```

Your production environment variables should be set in `.env.production` before building.

## Deployment Commands Explained

### Preview Deployments
- `firebase hosting:channel:deploy preview_hero_change`
  - Deploys your app to a temporary preview channel named `preview_hero_change`.
  - This is not a production deployment; it's useful for testing changes or sharing a preview URL before going live.
  - The deployed version is accessible via a unique preview URL and does not overwrite your main site.

### Production Deployments
- `npx firebase deploy --only hosting`
  - Deploys only the Hosting part of your Firebase project (your web app) to production.
  - Other Firebase services (like Functions, Firestore rules, etc.) are not deployed.
  - Useful if you only want to update the website and not touch other services.

- `firebase deploy`
  - Deploys all configured Firebase services (Hosting, Functions, Firestore, etc.) to production.
  - Use this if you want to deploy everything at once.

You can use either `npx firebase` or a globally installed `firebase` CLI. `npx` ensures you use the local version if available.
