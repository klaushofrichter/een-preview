/**
 * Eagle Eye Networks API Service
 * This service handles all API calls to the Eagle Eye Networks API
 */

/**
 * Authenticate with the Eagle Eye Networks API using an access token
 * @param {string} accessToken - The access token for authentication
 * @returns {Promise<Object>} - The authentication response
 */
export async function authenticate(accessToken) {
  try {
    const response = await fetch('https://api.eagleeyenetworks.com/api/v2.0/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

/**
 * Get camera details by ID
 * @param {string} accessToken - The access token for authentication
 * @param {string} cameraId - The ID of the camera
 * @returns {Promise<Object>} - The camera details
 */
export async function getCameraDetails(accessToken, cameraId) {
  try {
    const response = await fetch(`https://api.eagleeyenetworks.com/api/v2.0/cameras/${cameraId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get camera details: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting camera details:', error);
    throw error;
  }
}

/**
 * Get preview image for a camera
 * @param {string} accessToken - The access token for authentication
 * @param {string} cameraId - The ID of the camera
 * @returns {Promise<string>} - The preview image URL
 */
export async function getPreviewImage(accessToken, cameraId) {
  try {
    // First, get the preview URL
    const response = await fetch(`https://api.eagleeyenetworks.com/api/v2.0/cameras/${cameraId}/preview`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get preview image: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.url; // Return the URL to the preview image
  } catch (error) {
    console.error('Error getting preview image:', error);
    throw error;
  }
} 