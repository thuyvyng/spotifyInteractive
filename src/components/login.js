import { Button } from "react-bootstrap";
import scopes from "../utils/scopes";
import Cookies from "js-cookie";

// Reference: https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const redirectUrl = "https://unpawsthemusic.vercel.app/redirect";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

async function redirectToSpotifyAuthorize() {
  const code_verifier = generateRandomString(64);
  const hashed = await sha256(code_verifier);
  const code_challenge_base64 = base64encode(hashed);
  Cookies.set("code_verifier", code_verifier);

  if (!clientId) {
    throw Error("clientId is: " + clientId);
  }

  // Ask the user for authorization
  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Spotify API Calls
async function getToken(code) {
  const code_verifier = Cookies.get("code_verifier");
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

export async function getAccessTokenFromSpotify() {
  const args = new URLSearchParams(window.location.search);
  const code = args.get("code");

  // If we find a code, we're in a callback, do a token exchange
  if (code) {
    const token = await getToken(code);
    if (token["error"]) {
      return;
    }
    return {
      access_token: token.access_token,
      expires_in: token.expires_in,
    };
  } else {
    console.log("spotify auth code not found in URL:", code);
  }
}

function Login() {
  return (
    <div>
      <Button variant="outline-success" onClick={redirectToSpotifyAuthorize}>
        Log in to Spotify
      </Button>
    </div>
  );
}

export default Login;
