import { useEffect, useState } from "react";

interface Rates {
  [key: string]: number;
}

interface ApiResponse {
  base_code: string;
  rates: Rates;
}

export function useFetch(baseCurrency: string) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://open.er-api.com/v6/latest/${baseCurrency.toUpperCase()}`
        );
        if (!res.ok) throw new Error("Something went wrong!");

        const jsonData = await res.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseCurrency]);

  return { data, error, loading };
}
