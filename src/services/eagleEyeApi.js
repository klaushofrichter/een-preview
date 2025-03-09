/**
 * Eagle Eye Networks API Service
 * This service handles all API calls to the Eagle Eye Networks API
 */


/**
 * Get camera details by ID
 * @param {string} accessToken - The access token for authentication
 * @param {string} cameraId - The ID of the camera
 * @param {string} baseUrl - The base URL for the API
 * @returns {Promise<Object>} - The camera details
 */
export async function getCameraDetails(accessToken, cameraId, baseUrl) {
  try {
    console.log(`${baseUrl}/api/v3.0/cameras/${cameraId}`);
    const response = await fetch(`${baseUrl}/api/v3.0/cameras/${cameraId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(response);

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
 * @param {string} baseUrl - The base URL for the API
 * @returns {Promise<string>} - The preview image URL
 */
export async function getPreviewImage(accessToken, cameraId, baseUrl = 'https://api.eagleeyenetworks.com') {
  try {
    // First, get the preview URL
    const response = await fetch(`${baseUrl}/api/v2.0/cameras/${cameraId}/preview`, {
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