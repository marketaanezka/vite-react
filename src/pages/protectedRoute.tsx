import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = Cookies.get("access_token");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;