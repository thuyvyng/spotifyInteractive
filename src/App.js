import { useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie'
import './App.css';

// Components
import Home from "./pages/home";
import Developers from "./pages/developers";
import Error from "./pages/error";
import ComhinePlaylists from "./pages/combineplaylists";
import CollabPlaylist from "./pages/collabplaylist";
import Redirect from "./pages/redirect";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = Cookies.get('spotifyAuthToken');
    console.log('token: ', accessToken);
    if (accessToken !== undefined) {
      const logInAction = logIn(accessToken);
      dispatch(logInAction);
    }
  })
  
  return (
    <Switch>
      <Route path="/developers" component={Developers} />
      <Route path="/combineplaylists" component={ComhinePlaylists} />
      <Route path="/collabplaylist" component={CollabPlaylist} />
      <Route path="/redirect" component={Redirect} />

      <Route exact path="/" component={Home} />
      <Route component={Error} />

    </Switch>
  );
}

export default App;
