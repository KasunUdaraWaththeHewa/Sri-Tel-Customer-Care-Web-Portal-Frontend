import axios from "axios";

const apiUrl = "http://bff:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllActiveDataPackages = async (accountID: string) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${apiUrl}/dataCatelog/active-data-packages/${accountID}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active data packages:", error);
    return [];
  }
};

export const getAllActiveVoicePackages = async (accountID: string) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/voiceCatelog/voice/activated/${accountID}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active voice packages:", error);
    return [];
  }
};

export const getAllActiveDataTopUps = async (accountID: string) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${apiUrl}/data/active-data-top-ups/${accountID}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active data top-ups:", error);
    return [];
  }
};

export const isActiveRoaming = async (accountID: string) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${apiUrl}/roaming/is-active-roaming/${accountID}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data.isActive;
  } catch (error) {
    console.error("Error checking roaming status:", error);
    return false;
  }
};

export const getAllActiveTones = async (accountID: string) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/ringtone/active-tones/${accountID}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active tones:", error);
    return [];
  }
};

export const getAllActiveSubscriptions = async (accountID: string) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${apiUrl}/subscription/active-subscriptions/${accountID}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active subscriptions:", error);
    return [];
  }
};
