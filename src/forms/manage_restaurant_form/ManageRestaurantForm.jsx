/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "deliveryPrice is required",
    invalid_type_error: "must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimatedDeliveryTime is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select atleast one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageUrl: z.instanceof(File, { message: "imageUrl is required" }).optional(),
});

const ManageRestaurantForm = ({ onSave, isLoading , restaurant }) => {
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(()=>{
    if (!restaurant) {
      return;
    }
    form.reset(restaurant);
  }, [form, restaurant]);
   

  const onSubmit = (formDataJson) => {
    // FormData is in json format we need to convert it in to FormData
    // @TODO: formDataJson convert to FormData object
    // @TODO: receiving data json format form data but not getting appended in formData
    const formData = new FormData();

    // formData.append('restaurantName', formDataJson.restaurantName);
    // formData.append('city', formDataJson.city);
    // formData.append('country', formDataJson.country);

    // formData.append(
    //   'deliveryPrice',
    //   (formDataJson.deliveryPrice * 100).toString()
    // );
    // formData.append(
    //   'estimatedDeliveryTime',
    //   formDataJson.estimatedDeliveryTime.toString()
    // );
    // formDataJson.cuisines.forEach((cuisine, index) => {
    //   formData.append(`cuisines[${index}]`, cuisine);
    // });
    // formDataJson.menuItems.forEach((menuItem, index) => {
    //   formData.append(`menuItems[${index}][name]`, menuItem.name);
    //   formData.append(
    //     `menuItems[${index}][price]`,
    //     (menuItem.price * 100).toString()
    //   );
    // });

    // if (formDataJson.imageUrl) {
    //   formData.append(`imageUrl`, formDataJson.imageUrl);
    // }
    

    onSave(formDataJson);
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray rounded-lg space-y-8 p-10">
        <DetailsSection/>
        <Separator/>
        <CuisinesSection/>
        <Separator/>
        <MenuSection/>
        <Separator/>
        {/* <ImageSection/> */}
        {
          isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>
        }
    </form>
  </Form>;
};

export default ManageRestaurantForm;
