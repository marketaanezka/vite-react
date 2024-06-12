import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  const redirectUri = `${window.location.origin}/auth/callback`;

  const handleClick = () => {
    const targetUrl = new URL('https://accounts.google.com/o/oauth2/auth');
    targetUrl.searchParams.set('response_type', 'code');
    targetUrl.searchParams.set('client_id', googleClientId);
    targetUrl.searchParams.set('redirect_uri', redirectUri);
    targetUrl.searchParams.set('scope', 'openid profile email');

    window.location.href = targetUrl.toString();
  };

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);
    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/welcome");
    }
  }, [isLoggedin, navigate]);

  return (
    <div className="root">
      <div>
        <h1>Log in with Google</h1>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={handleClick}>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}