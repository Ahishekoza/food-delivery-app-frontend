import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const MainNav = () => {
  const {  isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <span className="flex space-x-2">
      {isAuthenticated ? (
        <>
        <Link to="/" className="font-bold hover:text-orange-500 ">Order Status</Link>
        <UserMenu/>
        </>
      ) : (
        <Button
            variant="ghost"
            className="font-bold hover:text-orange-500 hover:bg-white"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
          
      )}
    </span>
  );
};

export default MainNav;
