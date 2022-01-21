const express = require("express");
const router = express.Router();
const axios = require("axios").default;

//  import du package pupeeteer pour fetch les données
const puppeteer = require("puppeteer");

router.get("/leagues/:id", async (req, res) => {
  console.log(req.params.id);

  const param = req.params.id;
  console.log(param);

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/teams?league=${param}&season=2021`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY,
        },
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
    res.status(400).json(error.response);
  }
});

router.get("/team/:id", async (req, res) => {
  try {
    res.status(200).send("REPONSE ENVOYEE");
  } catch (error) {
    console.log(error.response);
    res.status(400).json(error.response);
  }
});

// requete pour afficher les joueur de toute une equipe, en passant l'id de l'equipe
router.get("/players/team/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/players/squads?team=${id}`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY,
        },
      }
    );

    res.status(200).json(response.data.response);
    console.log(response.data.response);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("ERREUR");
  }
});

//  requete pour obtenir le joueur d'une equipe en particulier
router.get("/players/:team/:player", async (req, res) => {
  console.log(req.params);

  try {
    if (req.params.player !== "") {
      const response = await axios.get(
        `https://v3.football.api-sports.io/players?search=${req.params.player}&team=${req.params.team}`,
        {
          headers: {
            "x-apisports-key": process.env.API_FOOTBALL_KEY,
          },
        }
      );
      console.log(response.data);
      if (response.data.parameters.search !== "undefined") {
        if (response.data.results === 0) {
          res.status(200).send("No player matching with request");
        } else res.status(200).json(response.data.response[0]);
      } else res.status(200).send("Request is undefined");
    } else res.status(200).send("No valid request so far");
  } catch (error) {
    console.log(error.response);
    res.status(400).json(error.response);
  }
});

//  requete vers l'API FOOTBALL
// router.get("/transfert/:id", async (req, res) => {
//   console.log(req.params);

//   try {
//     const response = await axios.get(
//       `https://v3.football.api-sports.io/transfers?player=${req.params.id}`,
//       {
//         headers: {
//           "x-apisports-key": process.env.API_FOOTBALL_KEY,
//         },
//       }
//     );
//     console.log(response.data);
//     res.status(200).json(response.data.response[0]);
//   } catch (error) {
//     console.log(error.response);
//     res.status(400).json(error.response);
//   }
// });

// Les infos de l'API ne sont pas assez précises.
// On preferera les requetes vers l'API TM avec PUPETEER

// requete vers l'API TM avec Pupeeteer
router.get("/player/transfert/:id", async (req, res) => {
  const player = req.params.id;
  console.log(player);
  const URL3 = `https://www.transfermarkt.fr/schnellsuche/ergebnis/schnellsuche?query=${player}`;
  try {
    const fetchTMInfos = async () => {
      const browser = await puppeteer.launch({args:  ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.goto(URL3, { waitUntil: "domcontentloaded" });

      const fetch = await page.evaluate(() => {
        const name = document.querySelector(
          ".items .odd .hauptlink a"
        ).textContent;
        const value = document.querySelector(
          ".items .odd .rechts.hauptlink"
        ).textContent;

        return { name, value };
      });
      await browser.close();

      return fetch;
    };

    const response = await fetchTMInfos();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.response);
  }
});

module.exports = router;
