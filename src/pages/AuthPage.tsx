import React from 'react';
import { Register } from '../components/Authentication/Register';
import { AuthPageType } from '../types/Auth';
import { Login } from '../components/Authentication/Login';
import { ForgotPassword } from '../components/Authentication/ForgotPassword';

interface AuthProps {
  pageType:  AuthPageType;
}

const AuthPage: React.FC<AuthProps> = ({ pageType }) => {
  return (
    <>
      {pageType === AuthPageType.LOGIN && <Login />}
      {pageType === AuthPageType.REGISTER && <Register />}
      {pageType === AuthPageType.FORGOT_PASSWORD && <ForgotPassword />}
    </>
  );
}

export default AuthPage;