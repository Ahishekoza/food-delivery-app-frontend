import { getUser, updateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user_profile_form/UserProfileForm";

const UserProfilePage = () => {
  const { userState} = getUser();
  const {updateUserPofile,isUpdateLoading} = updateUser()


  if (userState.isUserLoading) {
    return <div>Loading User Info ......</div>;
  }

  if (!userState.currentUser) {
    return <div>Unable to fetch user info...</div>;
  }


  return (
    <>
      {/* create the api for the current user and pass the current user info as a prop */}
      {/* while creating the also check whether data has been fetched or it is in loading state */}
      {/* also create a function for submit  */}

      {/* @TODO :---user profile page */}
      <UserProfileForm currentUser={userState.currentUser} onSave={updateUserPofile} isLoading={isUpdateLoading} />
    </>
  );
};

export default UserProfilePage;
