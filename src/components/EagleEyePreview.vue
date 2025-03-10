<template>
  <div class="eagle-eye-container">
    <h2>Eagle Eye Networks Camera Preview</h2>
    
    <div class="form-container">
      <div class="form-group">
        <label for="baseUrl">Base URL:</label>
        <input 
          id="baseUrl" 
          v-model="baseUrl" 
          type="text" 
          placeholder="Enter base URL (e.g., https://api.eagleeyenetworks.com)"
        />
      </div>
      
      <div class="form-group">
        <label for="accessToken">Access Token:</label>
        <input 
          id="accessToken" 
          v-model="accessToken" 
          type="text" 
          placeholder="Enter your access token"
        />
      </div>
      
      <div class="form-group">
        <label for="cameraId">Camera ID:</label>
        <input 
          id="cameraId" 
          v-model="cameraId" 
          type="text" 
          placeholder="Enter camera identifier"
        />
      </div>
      
      <button 
        @click="fetchPreviewImage" 
        :disabled="loading || !accessToken || !cameraId || !baseUrl"
        class="preview-button"
      >
        {{ loading ? 'Loading...' : 'Get Preview' }}
      </button>
      
      <div v-if="cameraName" class="camera-info">
        <p><strong>Camera Name:</strong> {{ cameraName }}</p>
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-if="previewUrl" class="preview-container">
      <h3>Camera Preview</h3>
      <img :src="previewUrl" alt="Camera Preview" class="preview-image" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCameraDetails, getPreviewImage } from '@/services/eagleEyeApi';

// Local storage keys
const ACCESS_TOKEN_KEY = 'eagle_eye_access_token';
const CAMERA_ID_KEY = 'eagle_eye_camera_id';
const BASE_URL_KEY = 'eagle_eye_base_url';

export default {
  name: 'EagleEyePreview',
  setup() {
    const accessToken = ref('');
    const cameraId = ref('');
    const baseUrl = ref('');
    const previewUrl = ref('');
    const mediaSessionUrl = ref('');
    const loading = ref(false);
    const error = ref('');
    const cameraName = ref('');
    
    // Load saved credentials from local storage on component mount
    onMounted(() => {
      const savedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const savedCameraId = localStorage.getItem(CAMERA_ID_KEY);
      const savedBaseUrl = localStorage.getItem(BASE_URL_KEY);
      
      if (savedAccessToken) {
        accessToken.value = savedAccessToken;
      }
      
      if (savedCameraId) {
        cameraId.value = savedCameraId;
      }
      
      if (savedBaseUrl) {
        baseUrl.value = savedBaseUrl;
      }
      
      // If all values exist, automatically fetch the preview
      //if (savedAccessToken && savedCameraId && savedBaseUrl) {
      //  fetchPreviewImage();
      //}
    });
    
    // Save credentials to local storage
    function saveCredentials() {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken.value);
      localStorage.setItem(CAMERA_ID_KEY, cameraId.value);
      localStorage.setItem(BASE_URL_KEY, baseUrl.value);
    }
    
    async function fetchPreviewImage() {
      if (!accessToken.value || !cameraId.value || !baseUrl.value) {
        error.value = 'Please enter base URL, access token, and camera ID';
        return;
      }
      
      // Save credentials to local storage
      saveCredentials();
      
      loading.value = true;
      error.value = '';
      previewUrl.value = '';
      mediaSessionUrl.value = '';
      cameraName.value = '';
      
      try {
        
        // Step 1: Get camera details to verify camera exists
        const cameraDetails = await getCameraDetails(accessToken.value, cameraId.value, baseUrl.value);
        
        // Extract and store the camera name
        if (cameraDetails && cameraDetails.name) {
          cameraName.value = cameraDetails.name;
        }
        
        // Step 2: Get preview image URL and media session URL
        const result = await getPreviewImage(accessToken.value, cameraId.value, baseUrl.value);
        previewUrl.value = result.previewUrl;
        mediaSessionUrl.value = result.mediaSessionUrl;
        
        // Cookie is already set in the getMediaSessionUrl function
      } catch (err) {
        error.value = `Error: ${err.message}`;
        console.error('Failed to fetch preview:', err);
      } finally {
        loading.value = false;
      }
    }
    
    return {
      accessToken,
      cameraId,
      baseUrl,
      previewUrl,
      mediaSessionUrl,
      loading,
      error,
      cameraName,
      fetchPreviewImage
    };
  }
};
</script>

<style scoped>
.eagle-eye-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.preview-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 15px;
}

.preview-button:hover:not(:disabled) {
  background-color: #45a049;
}

.preview-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.camera-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #e7f3fe;
  border-radius: 4px;
  border-left: 4px solid #2196F3;
}

.media-session-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff9e6;
  border-radius: 4px;
  border-left: 4px solid #ffc107;
  text-align: left;
}

.info-text {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.error-message {
  color: #f44336;
  margin: 15px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

.preview-container {
  margin-top: 30px;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>