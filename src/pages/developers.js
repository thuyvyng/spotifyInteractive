/**@jsxImportSource @emotion/react */
import Navigation from "../components/navbar";
import DevCard from "../components/devCard";

import {
  Container,
  CardDeck,
  Jumbotron,
} from "react-bootstrap";
import { css } from "@emotion/react";

function Developers() {
  const styles = css`
    .header {
      text-align: center;
    }

    ul {
      list-style: none;
    }

    .card-deck {
      width: 100%;
    }

    .card {
      max-width: 450px;
      margin-left: auto;
      margin-right: auto;
    }

    .card-body {
      text-align: center;
      padding-left: 0px;
      padding-right: 0px;
      margin: 0px;
    }

    .card-footer {
      text-align: center;
    }

    a {
      color: black;
    }
  `;

  return (
    <>
      <Navigation />
      <Jumbotron style={{ textAlign: "center" }}>
        <h1 class="display-4">about us</h1>
        <br></br>
        <p class="lead">
          For our web development final, we asked ourselves how to make our
          professor laugh during the demo. The answer: add a dancing cat.
        </p>
        <p>
          We've made some updates since then but we know it's all about the
          cats.
        </p>
        <a
          href="https://github.com/thuyvyng/spotifyInteractive"
          class="badge badge-info"
        >
          Github
        </a>{" "}
        <a
          href="https://developer.spotify.com/documentation/web-api/"
          class="badge badge-info"
        >
          SpotifyAPI
        </a>{" "}
        <a
          href="https://open.spotify.com/playlist/4YBShIMxSyiNX4M9q6dcxc?si=3c41c386b6454fcc"
          class="badge badge-info"
        >
          OurSpotifyPlaylist
        </a>
      </Jumbotron>
      <Container fluid css={styles}>
        <CardDeck>
          <DevCard dev="anita" />
          <DevCard dev="thuyvy" />
        </CardDeck>
      </Container>
    </>
  );
}

export default Developers;
