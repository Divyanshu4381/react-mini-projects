import { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/4f0526488db4f4b9c08f69aa/latest/${currency}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }

        const result = await response.json();
        setData(result.conversion_rates); // ✅ Correct structure
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchData();
  }, [currency]);

  return data;
};

export default useCurrencyInfo;
