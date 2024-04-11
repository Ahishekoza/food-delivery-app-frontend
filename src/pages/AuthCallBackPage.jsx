import { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '@/api/UserApi';

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const {userRegister} = registerUser()
  const hasRegisteredUser = useRef(false); // Using useRef to maintain a flag

  useEffect(() => {
    // Check if user is available and not already registered
    if (user && user.sub && user.email && !hasRegisteredUser.current) {
      // Register user
      userRegister(user);
      // Update flag to indicate that user has been registered
      hasRegisteredUser.current = true;
    }
    // Navigate to home page
    navigate('/');
  }, [user, navigate,userRegister]); // Only user and navigate are included in the dependency array

  return <div>Loading ......</div>;
};

export default AuthCallbackPage;
