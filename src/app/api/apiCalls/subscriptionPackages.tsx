import axios from "axios";

const apiUrl = "http://localhost:4901/api/proxy/forward/value-added";

const getToken = () => {
  return localStorage.getItem("token");
};

// Fetch all subscription packages
export const getAllSubscriptionPackages = async () => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${apiUrl}/subscriptionPackages/subscriptions`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching subscription packages:", error);
    return [];
  }
};

// Activate a subscription package
export const activateSubscriptionPackage = async (subscriptionData: object) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/subscription/activate-subscription/`,
      {
        ...subscriptionData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error activating subscription package:", error);
    return [];
  }
};

// Deactivate a subscription package
export const deactivateSubscriptionPackage = async (
  subscriptionData: object
) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/subscription/deactivate-subscription`,
      {
        ...subscriptionData,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating subscription package:", error);
    return [];
  }
};
