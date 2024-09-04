import { useState, useEffect } from "react";

export const useFetch = (url, { method, bodyData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const body = bodyData ? JSON.stringify(body) : {};
  console.log("useFecth");
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetch");
      setLoading(true);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        });

        const result = await response.json();

        if (!response.ok) {
          setError({ failureMsg: result.error });
        }

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, bodyData]);

  return { data, loading, error };
};
