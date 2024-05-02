/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSearchRestaurants = (city = "") => {
  const { getAccessTokenSilently } = useAuth0();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const createRestaurantSearch = useMemo(() => async () => {
    setIsLoading(true);
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/restaurants/search/${city}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setIsLoading(false);
      setSearchResults(response?.data);
      console.log(response?.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [city, getAccessTokenSilently]);

  useEffect(() => {
    createRestaurantSearch();
  }, [createRestaurantSearch]);

  return { searchResults, isLoading };
};
