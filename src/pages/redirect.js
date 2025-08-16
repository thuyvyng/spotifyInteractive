import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actions";
import Cookies from "js-cookie";
import { getAccessTokenFromSpotify } from "../components/login";

function Redirect() {
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleRedirect() {
      // Redirected from auth to here. Get the authorization code from URL
      // and exchange auth code for access token
      const currentToken = await getAccessTokenFromSpotify();
      if (currentToken && currentToken.access_token) {
        Cookies.set("spotifyAuthToken", currentToken.access_token, { expires: currentToken.expires_in });
        const logInAction = logIn(currentToken.access_token);
        dispatch(logInAction);
      }

      // Remove code from URL so we can refresh correctly.
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      const updatedUrl = url.search ? url.href : url.href.replace('?', '');
      window.history.replaceState({}, document.title, updatedUrl);

      history.push("/");
    }
    handleRedirect();
  });

  return <></>;
}

export default Redirect;
