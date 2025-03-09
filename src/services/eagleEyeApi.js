/**
 * Eagle Eye Networks API Service
 * This service handles all API calls to the Eagle Eye Networks API
 */
import axios from 'axios';

/**
 * Get camera details by ID
 * @param {string} accessToken - The access token for authentication
 * @param {string} cameraId - The ID of the camera
 * @param {string} baseUrl - The base URL for the API
 * @returns {Promise<Object>} - The camera details
 */
export async function getCameraDetails(accessToken, cameraId, baseUrl) {
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}/api/v3.0/cameras/${cameraId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };
    
    console.log(options);
    const response = await axios(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting camera details:', error);
    if (error.response) {
      throw new Error(`Failed to get camera details: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw error;
    }
  }
}

/**
 * Get preview image for a camera
 * @param {string} accessToken - The access token for authentication
 * @param {string} cameraId - The ID of the camera
 * @param {string} baseUrl - The base URL for the API
 * @returns {Promise<string>} - The preview image URL
 */
export async function getPreviewImage(accessToken, cameraId, baseUrl) {
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}/api/v3.0/cameras/${cameraId}/preview`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };
    
    const response = await axios(options);
    return response.data.url; // Return the URL to the preview image
  } catch (error) {
    console.error('Error getting preview image:', error);
    if (error.response) {
      throw new Error(`Failed to get preview image: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw error;
    }
  }
} 