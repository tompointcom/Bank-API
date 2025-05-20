import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
