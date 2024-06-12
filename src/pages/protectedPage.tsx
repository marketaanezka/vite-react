import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserData {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
}

const ProtectedPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('User data:', data);
          setUserData(data)})
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}</h1>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProtectedPage;
