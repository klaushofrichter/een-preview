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
import { authenticate, getCameraDetails, getPreviewImage } from '@/services/eagleEyeApi';

// Local storage keys
const ACCESS_TOKEN_KEY = 'eagle_eye_access_token';
const CAMERA_ID_KEY = 'eagle_eye_camera_id';
const BASE_URL_KEY = 'eagle_eye_base_url';

export default {
  name: 'EagleEyePreview',
  setup() {
    const accessToken = ref('');
    const cameraId = ref('');
    const baseUrl = ref('https://api.eagleeyenetworks.com');
    const previewUrl = ref('');
    const loading = ref(false);
    const error = ref('');
    
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
      if (savedAccessToken && savedCameraId && savedBaseUrl) {
        fetchPreviewImage();
      }
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
      
      try {
        
        // Step 1: Get camera details to verify camera exists
        await getCameraDetails(accessToken.value, cameraId.value, baseUrl.value);
        
        // Step 2: Get preview image URL
        const imageUrl = await getPreviewImage(accessToken.value, cameraId.value, baseUrl.value);
        previewUrl.value = imageUrl;
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
      loading,
      error,
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
}

.preview-button:hover:not(:disabled) {
  background-color: #45a049;
}

.preview-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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