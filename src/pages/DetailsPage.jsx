import { useGetRestaurant } from "@/api/RestaurantSearchApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { restaurantId } = useParams();

  const { restaurantDetails } = useGetRestaurant(restaurantId);
  const restaurant = restaurantDetails.data;
  if (restaurantDetails.isLoading) {
    return <span>Loading ....</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantDetails?.data?.imageUrl}
          className="rounded-md w-full h-full object-cover"
        ></img>
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
        <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurantDetails?.data?.menuItems?.map((menuItem, index) => (
            <MenuItem key={index} menuItem={menuItem} />
          ))}
        </div>

        {/* Order Card */}
        <div></div>
      </div>
    </div>
  );
};

export default DetailsPage;
