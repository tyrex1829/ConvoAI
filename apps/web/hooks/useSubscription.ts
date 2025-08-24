import axios from "axios";
import { useState } from "react";

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubscribe = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.get("http://localhost:3000/api/payment");

      if (response.status === 200) {
        window.location.href = `${response.data.session_url}`;
      }

      setIsProcessing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    onSubscribe,
  };
};
