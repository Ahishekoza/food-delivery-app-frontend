/* eslint-disable no-unused-vars */
import { getMyRestaurant, restaurant as createNewRestaurant, updateRestaurant } from "@/api/RestaurantApi"
import ManageRestaurantForm from "@/forms/manage_restaurant_form/ManageRestaurantForm"


const ManageRestaurantPage = () => {
  const {createRestaurant,isLoading} = createNewRestaurant()
  const {editRestaurant,isUpdating}=updateRestaurant()
  const {restaurant}=getMyRestaurant()
  //  !! gives me the truth or false value for the restaurant
  const isEditing = !! restaurant

  console.log(isEditing);
  return (
    <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? editRestaurant:createRestaurant} isLoading={isEditing?isUpdating:isLoading}/>
  )
}

export default ManageRestaurantPage