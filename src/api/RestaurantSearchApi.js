/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSearchRestaurants = (city = "",searchState) => {
  
  const { getAccessTokenSilently } = useAuth0();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const createRestaurantSearch = useMemo(() => async () => {

    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    // params.set("sortOption", searchState.sortOption);



    setIsLoading(true);
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/restaurants/search/${city}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setIsLoading(false);
      setSearchResults(response?.data);
      console.log(response?.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [city, getAccessTokenSilently,searchState]);

  useEffect(() => {
    createRestaurantSearch();
  }, [createRestaurantSearch]);

  return { searchResults, isLoading };
};


export const useGetRestaurant = (restaurantId) => {
  const { getAccessTokenSilently } = useAuth0();
  const [restaurantDetails, setRestaurantDetails] = useState({
    data: {},
    isLoading: false
  });

  const getRestaurant = async () => {
    try {
      setRestaurantDetails({ ...restaurantDetails, isLoading: true });
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      setRestaurantDetails({
        data: response.data?.data,
        isLoading: false
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurant();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId,getAccessTokenSilently]);

  return { restaurantDetails };
};


