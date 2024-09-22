import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllDataPackages = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/dataPackages/data-packages`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active data packages:", error);
    return [];
  }
};

export const activateDataPackage = async (additionalData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/dataCatelog/data/activate`,
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
    console.error("Error activating data package:", error);
    return null;
  }
};

export const deactivateDataPackage = async (additionalData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/dataCatelog/data/deactivate`,
      additionalData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deactivating data package:", error);
    return null;
  }
};

export const isDataPackageActive = async (additionalData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/dataCatelog/data/is-active`,
      additionalData,
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
    return null;
  }
};
