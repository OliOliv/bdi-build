const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const path = require("path");
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//////////////////////////////////// SOIREES ////////////////////////////////////

// GET ONLY THE LAST EVENT
app.get("/get_lastevent", (req, res) => {
  database.getLastEvent((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

// GET ALL EVENTS
app.get("/events", (req, res) => {
  database.getEvents((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET CHOSEN EVENT
app.get("/get_one_event/:idSoiree", (req, res) => {
  const idSoiree = req.params.idSoiree;
  database.getOneEvent(idSoiree, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET ALL EVENTS OF ON ANIMATOR

app.get("/get_events_of_animators/:idIntervenant", (req, res) => {
  const idIntervenant = req.params.idIntervenant;
  database.getEventsOfAnimators(idIntervenant, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//POST ONE EVENT

app.post("/events", (req, res) => {
  database.postEvent((error, dataset) => {
    if (error) throw error;
    res.send(dataset);
  }, req.body);
});

// DELETE EVENTS

app.delete("/events", (req, res) => {
  database.deleteEvents((err, dataset) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(dataset);
  }, req.body.idSoiree);
});
//////////////////////////////////// INTERVENANTS ////////////////////////////////////

// UPDATE EVENTS

app.patch("/events", (req, res) => {
  database.updateEvents((err, dataset) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).send(dataset);
  }, req.body);
});

// GET ALL ANIMATORS
app.get("/animators", (req, res) => {
  database.getAnimators((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});
//GET ANIMATORS BY EVENT
app.get("/get_animators_of_event/:idSoiree", (req, res) => {
  const idSoiree = req.params.idSoiree;
  database.getAnimatorsOfEvent(idSoiree, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET ANIMATORS BY BOOK
app.get("/get_animator_of_book/:idLivre", (req, res) => {
  const idLivre = req.params.idLivre;
  database.getAnimatorOfBook(idLivre, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET ONE ANIMATOR
app.get("/get_animators_by_id/:idIntervenant", (req, res) => {
  const idIntervenant = req.params.idIntervenant;
  database.getOneAnimator(idIntervenant, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//POST ONE ANIMATOR

app.post("/animators", (req, res) => {
  database.postAnimator((error, dataset) => {
    if (error) throw error;
    res.send(dataset);
  }, req.body);
});

//////////////////////////////////// EDITIONS ////////////////////////////////////

app.get("/editions", (req, res) => {
  database.getEditions((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.get("/get_chosen_edition/:idEdition", (req, res) => {
  const idEdition = req.params.idEdition;
  database.getOneEdition(idEdition, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.get("/get_books_by_edition/:idEdition", (req, res) => {
  const idEdition = req.params.idEdition;
  database.getBooksByEdition(idEdition, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.get("/get_edition_by_book/:idLivre", (req, res) => {
  const idLivre = req.params.idLivre;
  database.getEditionByBook(idLivre, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//////////////////////////////////// LIVRES ////////////////////////////////////
//GET ALL BOOKS
app.get("/books", (req, res) => {
  database.getBooks((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET ONE BOOK

app.get("/get_chosen_book/:idLivre", (req, res) => {
  const idLivre = req.params.idLivre;
  database.getOneBook(idLivre, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET BOOKS OF ONE EVENT
app.get("/get_books_by_event/:soiree_id", (req, res) => {
  const soiree_id = req.params.soiree_id;
  database.getBooksByEvent(soiree_id, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET BOOKS OF ONE ANIMATOR
app.get("/get_books_by_animator/:idIntervenant", (req, res) => {
  const idIntervenant = req.params.idIntervenant;
  database.getBooksByAnimator(idIntervenant, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET BOOKS OF ONE AUTHOR
app.get("/get_books_by_auteur/:idAuteur", (req, res) => {
  const idAuteur = req.params.idAuteur;
  database.getBooksOfAuteur(idAuteur, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

//GET BOOKS OF ONE DESSINATEUR
app.get("/get_books_by_dessinateur/:idDessinateur", (req, res) => {
  const idDessinateur = req.params.idDessinateur;
  database.getBooksOfDessinateur(idDessinateur, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

/////////////////////////////////// CROQUIS ///////////////////////////////////

app.get("/croquis/:soiree_id", (req, res) => {
  const soiree_id = req.params.soiree_id;
  database.getCroquis(soiree_id, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

/////////////////////////////////// PHOTOS ///////////////////////////////////

app.get("/photos/:soiree_id", (req, res) => {
  const soiree_id = req.params.soiree_id;
  database.getPhotos(soiree_id, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

/////////////////////////////////// AUTEURS ET DESSINATEURS ///////////////////////////////////

app.get("/auteurs", (req, res) => {
  database.getAuteurs((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.get("/dessinateurs", (req, res) => {
  database.getDessinateurs((error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.get("/get_chosen_auteur/:idAuteur", (req, res) => {
  const idAuteur = req.params.idAuteur;
  database.getOneAuteur(idAuteur, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});
app.get("/get_chosen_dessinateur/:idDessinateur", (req, res) => {
  const idDessinateur = req.params.idDessinateur;
  database.getOneDessinateur(idDessinateur, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});
app.get("/get_auteurs_by_book/:idLivre", (req, res) => {
  const idLivre = req.params.idLivre;

  database.getAuteursOfBook(idLivre, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.get("/get_dessinateurs_by_book/:idLivre", (req, res) => {
  const idLivre = req.params.idLivre;

  database.getDessinateursOfBook(idLivre, (error, results) => {
    if (error) throw error;
    res.send({ results: results });
  });
});

app.listen(port, () => console.log(`Listening on port ${port} yeah`));
