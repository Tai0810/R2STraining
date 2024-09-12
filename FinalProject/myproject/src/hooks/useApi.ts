import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

const useApi = (url: string, initialData?: any) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const dataResponse = await fetchData(url);
        setData(dataResponse);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchDataDetail();
  }, []);

  return { data, setData };
};

export default useApi;