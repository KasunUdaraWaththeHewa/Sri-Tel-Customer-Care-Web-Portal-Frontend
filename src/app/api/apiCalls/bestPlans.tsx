import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllDataPackages = async () => {
    try {
        const token = getToken();
        const response = await axios.get(
          `${apiUrl}/dataPackages/data-packages`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        // console.log(response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching active data packages:", error);
        return [];
      }

}