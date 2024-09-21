import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllVoicePackages = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/voicePackages/voice-packages`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active voice packages:", error);
    return [];
  }
};

export const activateVoicePackage = async (additionalData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/voiceCatelog/voice/activate`,
      {
        ...additionalData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error activating voice package:", error);
    return null;
  }
};

export const deactivateVoicePackage = async (packageID: string) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/voiceCatelog/voice/deactivate`,
      {
        packageID,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deactivating voice package:", error);
    return null;
  }
};
