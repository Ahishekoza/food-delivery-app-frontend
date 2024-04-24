/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getRestaurant = async () => {
    setIsLoading(true);
    const accessToken = await getAccessTokenSilently();

    await axios
      .get(`${API_BASE_URL}/api/v1/restaurant`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response?.data?.data);
        setRestaurant(response?.data?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getRestaurant();
  }, [getAccessTokenSilently]);

  return { restaurant, isLoading };
};

export const restaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  const createRestaurant = async (restaurantDetails) => {
    setIsLoading(true);
    const accessToken = await getAccessTokenSilently();
    await axios
      .post(
        `${API_BASE_URL}/api/v1/restaurant`,
        { ...restaurantDetails },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        toast.success("Restaurant created successfully");
        return response?.data?.data;
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return { createRestaurant, isLoading };
};

export const updateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isUpdating, setIsUpdating] = useState(false);

  const editRestaurant = async (restaurantDetails) => {
    setIsUpdating(true);
    const accessToken = await getAccessTokenSilently();
    await axios
      .put(
        `${API_BASE_URL}/api/v1/restaurant`,
        { ...restaurantDetails },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setIsUpdating(false);
        toast.success('Restaurant Updated Successfully')
        return response?.data?.data
      })
      .catch((error) => {
        setIsUpdating(false);
        console.log(error);
      });
  };

  return { editRestaurant, isUpdating };
};
