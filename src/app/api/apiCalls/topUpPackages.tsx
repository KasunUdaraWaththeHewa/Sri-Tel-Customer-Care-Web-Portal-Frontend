import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllDataTopUpPackages = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/dataTopUpPackages/packages`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data top-up packages:", error);
    return [];
  }
};

export const activateDataTopUpPackage = async (additionalData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/data/top-up`, additionalData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error Activating active data top-up package:", error);
    return [];
  }
};
