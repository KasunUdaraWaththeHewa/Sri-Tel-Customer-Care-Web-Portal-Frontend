import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import {
  getAllDataPackages,
  activateDataPackage,
} from "@/app/api/apiCalls/bestPlans";

type Plan = {
  name: string;
  price: string;
  features?: { [key: string]: string | number | boolean };
  description?: string;
  dataAmount?: number;
  durationInDays?: number;
  _id?: string;
};

const BestPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getAllDataPackages();
        console.log("Fetched Plans:", fetchedPlans);
        setPlans(fetchedPlans);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleActivate = async (plan: Plan) => {
    const activationData = {
      accountID: "66eda4f8f0d0ef39b09e07d6",
      dataAmount: plan.dataAmount,
      price: plan.price,
      durationInDays: plan.durationInDays,
      packageID: plan._id,
    };

    try {
      const response = await activateDataPackage(activationData);
      console.log("Activation Response:", response);
      if (response.statusCode === 201) {
        console.log("Package activated successfully:", response);
        message.success(`Package "${plan.name}" activated successfully!`);
      } else if (response.statusCode === 200) {
        message.error(`Package "${plan.name}" is already active!`);
      }
    } catch (error) {
      console.error("Error activating package:", error);
      message.error(
        `Failed to activate package "${plan.name}". Please try again.`
      );
    }
  };

  return (
    <div className="py-10 px-6">
      <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">
        Sri Tel Best Plans!
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Choose from our top plans that suit your needs and get the best value!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className="shadow-lg p-6 pt-3 bg-white rounded-lg flex flex-col h-full"
          >
            <div className="justify-start">
              <h3 className="text-xl font-bold mb-4 text-center">
                {plan.name}
              </h3>
              <hr />
              <p className="text-lg font-semibold mb-5 mt-2 text-center">
                {plan.price}{" "}
                <sub className="text-xs text-gray-400">per month</sub>
              </p>
              <p className="text-gray-600 text-3xl text-center font-bold">
                {plan.dataAmount} GB
              </p>
              <p className="text-gray-400 mb-4 text-center font-semibold text-xs">
                Anytime Data Quota
              </p>
              {plan.durationInDays && (
                <p className="text-sm text-center font-semibold text-gray-600 mb-4">
                  Valid for {plan.durationInDays} days
                </p>
              )}

              {plan.description && (
                <p className="text-sm text-center text-gray-500 mb-4">
                  {plan.description}
                </p>
              )}
              {plan.features && (
                <div className="mb-2">
                  <p className="text-sm text-gray-700 font-semibold">
                    Features:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {Object.entries(plan.features).map(([key, value]) => (
                      <li key={key}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="justify-self-end align-bottom">
              <Button
                type="primary"
                className="w-full bg-gray-900"
                onClick={() => handleActivate(plan)}
              >
                Activate
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestPlans;
