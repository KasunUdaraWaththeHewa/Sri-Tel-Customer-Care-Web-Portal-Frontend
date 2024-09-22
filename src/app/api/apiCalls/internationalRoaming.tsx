import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

// Activate an International Roaming package
export const activateInternationalRoaming = async (roamingData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/roaming/activate-roaming/`,
      {
        ...roamingData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error activating international roaming:", error);
    return [];
  }
};

// Deactivate an International Roaming package
export const deactivateInternationalRoaming = async (roamingData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/roaming/deactivate-roaming`,
      {
        ...roamingData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating international roaming:", error);
    return [];
  }
};
