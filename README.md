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
2. Fetch the preview image URL and display it

## Features

- Input fields for base URL, access token, and camera ID
- Automatic loading of saved credentials from local storage
- Automatic preview fetching when saved credentials are available
- Displays camera name after successful retrieval
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

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```