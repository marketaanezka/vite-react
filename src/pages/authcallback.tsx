import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const state = new URLSearchParams(window.location.search).get("state");

    console.log(code);
    console.log(state);

    // Replace with your actual Google Cloud Platform Client ID and Client Secret (**important to keep confidential**)
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "";

    console.log(clientSecret);

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

        // Store access token securely (e.g., cookies)
        Cookies.set("access_token", data.access_token);

        // (Optional) Store refresh token (if available)
        if (data.refresh_token) {
          Cookies.set("refresh_token", data.refresh_token);
        }

        // Trigger navigation to Login component (with updated state)
        navigate("/authorized", { state: { isLoggedIn: true } });
      })
      .catch(error => {
        console.error("Error fetching tokens:", error);
        setError("An error occurred during login");
      });
  }, []);

  // Display error message if any
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Display a loading message while processing tokens (optional)
  return (
    <div>
      <h1>Processing Login...</h1>
    </div>
  );
}
