/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import {toast} from 'sonner'
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const userRegister = async (user) => {
    const accessToken = await getAccessTokenSilently();
    const userCreated = await axios.post(
      `${API_BASE_URL}/api/v1/users`,
      { auth0Id: user?.sub, email: user?.email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(userCreated);
  };

  return { userRegister };
};

export const getUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [userState, setUserState] = useState({
    currentUser: null,
    isUserLoading: true,
    
  });

  const fetchUser = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${API_BASE_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserState({
        currentUser: response?.data?.data,
        isUserLoading: false,
   
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUserState({
        ...userState,
        isUserLoading: false,
       
      });
    }
  };
  useEffect(() => {

    fetchUser();
  }, [getAccessTokenSilently]);

  return {userState};
};


export const updateUser =()=>{

  const { getAccessTokenSilently } = useAuth0();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  

  const updateUserPofile = async(user)=>{
    setIsUpdateLoading(true)
    const accessToken = await getAccessTokenSilently();
    const updatedUser = await axios.put(`${API_BASE_URL}/api/v1/users`,{...user},{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })

    
    if(!updatedUser){
      setIsUpdateLoading(false);
      toast.error('error Updating User')
      throw new Error('Unable to update user')
    }

    setIsUpdateLoading(false)
    toast.success('User updated successfully')
    return updatedUser
  }

  return { updateUserPofile ,isUpdateLoading }

}
