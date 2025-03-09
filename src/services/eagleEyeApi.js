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
    
    const response = await axios(options);
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
 * Get a media session URL for setting cookies and set the cookie immediately
 * @param {string} accessToken - The access token for authentication
 * @param {string} baseUrl - The base URL for the API
 * @returns {Promise<string>} - The media session URL
 */
export async function getMediaSessionUrl(accessToken, baseUrl) {
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}/api/v3.0/media/session`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const response = await axios(options);

    if (response.data && response.data.url) {
      const mediaSessionUrl = response.data.url;
      
      // Make a call to the media session URL right away to set the cookie
      try {
        await fetch(mediaSessionUrl, { 
          method: 'GET', 
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('Cookie set successfully with media session URL');
      } catch (cookieErr) {
        console.warn('Failed to set cookie with media session URL:', cookieErr);
        // Continue anyway, as we still want to return the URL
      }
      
      return mediaSessionUrl;
    } else {
      throw new Error('No media session URL found in the response');
    }
  } catch (error) {
    console.error('Error getting media session URL:', error);
    if (error.response) {
      throw new Error(`Failed to get media session URL: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw error;
    }
  }
}

/**
 * Get preview image for a camera using the feeds endpoint
 * @param {string} accessToken - The access token for authentication
 * @param {string} cameraId - The ID of the camera
 * @param {string} baseUrl - The base URL for the API
 * @returns {Promise<Object>} - Object containing preview image URL and media session URL
 */
export async function getPreviewImage(accessToken, cameraId, baseUrl) {
  try {
    // Step 1: Get the preview image URL
    const options = {
      method: 'GET',
      url: `${baseUrl}/api/v3.0/feeds`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        include: 'multipartUrl',
        deviceId: cameraId,
        type: 'preview'
      }
    };
    
    const response = await axios(options);
    
    // Check if we have results array with at least one item
    if (!(response.data && 
        Array.isArray(response.data.results) && 
        response.data.results.length > 0 && 
        response.data.results[0].multipartUrl)) {
      throw new Error('No preview URL found in the response');
    }
    
    const previewUrl = response.data.results[0].multipartUrl;
    
    // Step 2: Get the media session URL
    const mediaSessionUrl = await getMediaSessionUrl(accessToken, baseUrl);
    
    // Return both URLs
    return {
      previewUrl,
      mediaSessionUrl
    };
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