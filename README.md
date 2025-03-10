# Eagle Eye Networks Preview App

A simple Vue3 application that allows users to enter an access token and camera identifier to display a preview image from the Eagle Eye Networks service.

## Requirements

- Node.js 20.17.0 or higher
- npm or yarn

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3333 and will automatically open in your default browser.

## Build

To build the application for production:

```bash
npm run build
```

## Deployment

The application is configured for deployment to GitHub Pages using hash mode routing for better compatibility. There are two ways to deploy:

### Manual Deployment

There are two ways to manually deploy the application:

#### Option 1: Using the deploy script

Run the following command to build and deploy the application:

```bash
npm run deploy
```

This will build the application and push the built files to the `gh-pages` branch of your repository.

#### Option 2: Using a Personal Access Token (if Option 1 fails)

If you encounter permission issues with the deploy script, you can use a personal access token:

1. Generate a Personal Access Token (PAT) in GitHub:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with the `repo` scope
   - Copy the token

2. Set up the token for deployment:

```bash
# Replace YOUR_TOKEN with your personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/klaushofrichter/een-preview.git

# Run the deploy script
npm run deploy
```

This will use your personal access token for authentication when pushing to GitHub.

### Automated Deployment

The application includes a GitHub Actions workflow that automatically deploys the application to GitHub Pages when changes are pushed to the `main` branch.

To set up automated deployment:

1. Push your code to a GitHub repository
2. Go to your repository settings
3. Navigate to "Actions" > "General" and ensure that "Read and write permissions" is selected under "Workflow permissions"
4. Navigate to "Pages"
5. Set the source to "GitHub Actions"

The application will be deployed to `https://[your-username].github.io/een-preview/`

### Troubleshooting Deployment Issues

If you encounter errors after deployment:

1. Make sure your browser console is open to see any error messages
2. The application uses hash mode routing (`/#/`) which should work well with GitHub Pages
3. If you see module resolution errors, try these solutions:
   - Use the provided `deploy.sh` script instead of the npm deploy command
   - Make sure the base URL in `vite.config.js` is set to `/een-preview/` (with slashes)
   - Clear your browser cache after deployment
4. If you're still having issues, try deploying with the GitHub Actions workflow instead of manual deployment

## Usage

1. Start the application
2. Enter the base URL for the Eagle Eye Networks API (e.g., https://api.eagleeyenetworks.com)
3. Enter your Eagle Eye Networks access token
4. Enter the camera identifier
5. Click "Get Preview" to fetch and display the camera preview image

The application will automatically save your base URL, access token, and camera ID to local storage. When you reload the page or return to the application later, it will automatically retrieve these credentials and fetch the preview image.

## API Functionality

The application makes the following API calls to the Eagle Eye Networks service using Axios with API v3.0:

1. Get camera details to verify camera exists and display camera name
2. Fetch the preview image URL using the feeds endpoint with deviceId, type=preview, and multipartUrl parameters
3. Get a media session URL from the media/session endpoint and immediately set the authentication cookie

## Features

- Input fields for base URL, access token, and camera ID
- Automatic loading of saved credentials from local storage
- Automatic preview fetching when saved credentials are available
- Displays camera name after successful retrieval
- Uses the feeds endpoint with specific parameters for optimal preview images
- Correctly extracts the multipartUrl from the results array in the API response
- Retrieves a media session URL and automatically sets the authentication cookie
- Error handling and display
- Responsive design
- Uses direct Axios calls with options objects for API requests
- Compatible with Eagle Eye Networks API v3.0

## Project Structure

- `src/services/eagleEyeApi.js` - Contains all API calls to the Eagle Eye Networks service
- `src/components/EagleEyePreview.vue` - The main component for entering credentials and displaying the preview
- `src/views/HomeView.vue` - The main view that includes the EagleEyePreview component
- `src/App.vue` - The main application component

## License

MIT
