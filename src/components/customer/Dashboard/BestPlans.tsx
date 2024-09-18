import React from "react";
import { Card, Button } from "antd";

type Plan = {
  name: string;
  price: string;
  data: string;
  talkTime: string;
  features: string[];
};

const BestPlans: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Basic Plan",
      price: "Rs.356.00",
      data: "5 GB",
      talkTime: "100 mins",
      features: ["Unlimited SMS", "1 GB Roaming Data", "Free Caller Tunes"],
    },
    {
      name: "Premium Plan",
      price: "Rs.598.00",
      data: "15 GB",
      talkTime: "300 mins",
      features: ["Unlimited SMS", "5 GB Roaming Data", "Priority Customer Support"],
    },
    {
      name: "Ultimate Plan",
      price: "Rs.1095.00",
      data: "30 GB",
      talkTime: "Unlimited",
      features: ["Unlimited SMS", "10 GB Roaming Data", "Free International Calls"],
    },
  ];

  return (
    <div className="py-10 px-6">
      <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">Sri Tel Best Plans!</h2>
      <p className="text-center text-gray-600 mb-8">
        Choose from our top plans that suit your needs and get the best value!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
            <Card key={index} className="shadow-lg p-6 pt-3 bg-white rounded-lg flex flex-col h-full">
                <div className="justify-start">
                    <h3 className="text-xl font-bold mb-4 text-center">{plan.name}</h3>
                    <hr />
                    <p className="text-lg font-semibold mb-5 mt-2 text-center">{plan.price} <sub className="text-xs text-gray-400">per month</sub> </p>
                    <p className="text-gray-600 text-3xl text-center font-bold">{plan.data}</p>
                    <p className="text-gray-400 mb-4 text-center text-xs">Anytime Data Quota</p>
                    <ul className="list-disc ml-5 text-gray-600 mb-4 flex-grow">
                        {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="justify-self-end align-bottom">
                    <Button type="primary" className="w-full bg-gray-900">Activate</Button>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default BestPlans;
