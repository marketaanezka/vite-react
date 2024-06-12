import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "";

    if (!code) {
      setError("Missing authorization code or state");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/callback`;

    const tokenEndpoint = new URL('https://oauth2.googleapis.com/token');
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);
    body.set('redirect_uri', redirectUri); 
    body.set('code', code);

    fetch(tokenEndpoint.toString(), {
      method: 'POST',
      body: body.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error_description);
          return;
        }

        Cookies.set("access_token", data.access_token);

        if (data.refresh_token) {
          Cookies.set("refresh_token", data.refresh_token);
        }

        navigate("/welcome", { state: { isLoggedIn: true } });
      })
      .catch(error => {
        console.error("Error fetching tokens:", error);
        setError("An error occurred during login");
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Processing Login...</h1>
    </div>
  );
}
