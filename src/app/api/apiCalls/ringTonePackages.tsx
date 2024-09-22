import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllRingTonePackages = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/toneCatalog/tones`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching ringtone packages:", error);
    return [];
  }
};

export const activateRingTonePackage = async (ringToneData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/ringtone/personalize-tone/`,
      {
        ...ringToneData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error activating ringtone package:", error);
    return [];
  }
};

export const deactivateTonePackage = async (ringToneData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/ringtone/deactivate-tone`,
      {
        ...ringToneData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating ringtone package:", error);
    return [];
  }
};
