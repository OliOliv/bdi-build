const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projet_bdi",
  socketPath: "/srv/run/mysqld/mysqld.sock"
});

////////////////////////////////////////////// SOIREES //////////////////////////////////////////////

// GET
const getLastEvent = callback => {
  const sql = "SELECT * FROM soirees ORDER BY idSoiree DESC LIMIT 1";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getEvents = callback => {
  const sql = "SELECT * FROM soirees ORDER BY idSoiree DESC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getOneEvent = (idSoiree, callback) => {
  const sql = "SELECT * FROM soirees WHERE idSoiree = ? ";
  connection.query(sql, [idSoiree], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getEventsOfAnimators = (idIntervenant, callback) => {
  const sql =
    "SELECT soirees.nom FROM intervenants, soirees, interventions WHERE intervenants.idIntervenant = interventions.id_intervenant AND interventions.id_soiree = soirees.idSoiree AND intervenants.idIntervenant = ?";
  connection.query(sql, [idIntervenant], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

// POST

const postEvent = (callback, data) => {
  const sql =
    "INSERT INTO soirees (idSoiree, date_soiree, nom, description, image, lieu, heure) VALUE (?, ?, ?, ?, ?, ?, ?) ";
  const payload = [
    data.idSoiree,
    data.date_soiree,
    data.nom,
    data.description,
    data.image,
    data.lieu,
    data.heure
  ];

  connection.query(sql, payload, (err, res) => {
    if (err) return callback(err, null);
    return callback(null, res);
  });
};

// DELETE
const deleteEvents = (clbk, idSoiree) => {
  const sql = "DELETE FROM soirees WHERE idSoiree = ?";

  connection.query(sql, [idSoiree], function(err, res) {
    if (err) return clbk(res, null);
    return clbk(null, res);
  });
};

// UPDATE

const updateEvents = (callback, data) => {
  const sql =
    "UPDATE soirees SET nom = ?, description = ?, image = ?, lieu = ?, heure = ? WHERE idSoiree = ?";
  const payload = [
    data.nom,
    data.description,
    data.image,
    data.lieu,
    data.heure,
    data.idSoiree
  ];

  connection.query(sql, payload, (err, res) => {
    if (err) return callback(err, null);
    return callback(null, res);
  });
};
////////////////////////////////////////////// AUTEURS //////////////////////////////////////////////
//GET
const getAuteurs = callback => {
  const sql = "SELECT * FROM auteurs ORDER BY nom_auteur ASC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
const getDessinateurs = callback => {
  const sql = "SELECT * FROM dessinateurs ORDER BY nom_dessinateur ASC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getOneAuteur = (idAuteur, callback) => {
  const sql = "SELECT * FROM auteurs WHERE idAuteur =  ? ";
  connection.query(sql, [idAuteur], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
const getOneDessinateur = (idDessinateur, callback) => {
  const sql = "SELECT * FROM dessinateurs WHERE idDessinateur =  ? ";
  connection.query(sql, [idDessinateur], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getBooksOfAuteur = (idAuteur, callback) => {
  const sql =
    "SELECT * FROM livres, auteurs, livres_auteurs WHERE auteurs.idAuteur = livres_auteurs.id_auteur AND livres.idLivre = livres_auteurs.id_livre AND auteurs.idAuteur = ?";
  connection.query(sql, [idAuteur], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getBooksOfDessinateur = (idDessinateur, callback) => {
  const sql =
    "SELECT * FROM livres, dessinateurs, livres_auteurs WHERE dessinateurs.idDessinateur = livres_auteurs.id_dessinateur AND livres.idLivre = livres_auteurs.id_livre AND dessinateurs.idDessinateur = ?";
  connection.query(sql, [idDessinateur], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getDessinateursOfBook = (idLivre, callback) => {
  const sql =
    "SELECT * FROM livres, dessinateurs, livres_auteurs WHERE dessinateurs.idDessinateur = livres_auteurs.id_dessinateur AND livres.idLivre = livres_auteurs.id_livre AND livres.idLivre = ?";
  connection.query(sql, [idLivre], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getAuteursOfBook = (idLivre, callback) => {
  const sql =
    "SELECT * FROM livres, auteurs , livres_auteurs WHERE auteurs.idAuteur = livres_auteurs.id_auteur AND livres.idLivre = livres_auteurs.id_livre AND livres.idLivre = ?";
  connection.query(sql, [idLivre], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
////////////////////////////////////////////// INTERVENANTS //////////////////////////////////////////////
//GET
const getAnimators = callback => {
  const sql = "SELECT * FROM  intervenants ORDER BY prenom ASC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getOneAnimator = (idIntervenant, callback) => {
  const sql = "SELECT * FROM intervenants WHERE idIntervenant =  ? ";
  connection.query(sql, [idIntervenant], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
const getAnimatorsOfEvent = (idSoiree, callback) => {
  const sql =
    "SELECT * FROM intervenants, soirees, interventions WHERE intervenants.idIntervenant = interventions.id_intervenant AND interventions.id_soiree = soirees.idSoiree AND soirees.idSoiree = ?";
  connection.query(sql, [idSoiree], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

//POST
const postAnimator = (callback, data) => {
  const sql =
    "INSERT INTO intervenants (idIntervenant, nom, prenom, fb_url, insta_url, avatar_src, activite) VALUE (?, ?, ?, ?, ?, ?, ?)";
  const payload = [
    data.idIntervenant,
    data.nom,
    data.prenom,
    data.fb_url,
    data.insta_url,
    data.avatar_src,
    data.activite
  ];
  connection.query(sql, payload, (err, res) => {
    console.log(this.sql);
    if (err) return callback(err, null);
    return callback(null, res);
  });
};

const getAnimatorOfBook = (idLivre, callback) => {
  const sql =
    "SELECT * FROM livres, intervenants WHERE livres.intervenant_id = intervenants.idIntervenant AND idLivre = ? ";
  const query = connection.query(sql, [idLivre], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
  console.log("animator=>", query.sql);
};
////////////////////////////////////////////// CROQUIS //////////////////////////////////////////////
//GET
const getCroquis = (soiree_id, callback) => {
  const sql = "SELECT * FROM croquis WHERE soiree_id = ?";
  connection.query(sql, [soiree_id], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

////////////////////////////////////////////// PHOTOS //////////////////////////////////////////////
//GET
const getPhotos = (soiree_id, callback) => {
  const sql = "SELECT * FROM photos WHERE soiree_id = ?";
  connection.query(sql, [soiree_id], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
////////////////////////////////////////////// LIVRES //////////////////////////////////////////////
// GET
const getBooks = callback => {
  const sql = "SELECT * FROM livres ORDER BY titre ASC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getOneBook = (idLivre, callback) => {
  const sql = "SELECT * FROM livres WHERE idLivre = ?";
  connection.query(sql, [idLivre], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
const getBooksByEvent = (soiree_id, callback) => {
  const sql =
    "SELECT * FROM livres, editeurs WHERE livres.edition = editeurs.idEditeur AND livres.soiree_id = ? ";
  connection.query(sql, [soiree_id], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getBooksByAnimator = (idIntervenant, callback) => {
  const sql =
    "SELECT * FROM livres, intervenants WHERE livres.intervenant_id = intervenants.idIntervenant AND intervenants.idIntervenant = ? ";
  connection.query(sql, [idIntervenant], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};
// POST
const postBooks = (callback, data) => {
  const sql =
    "INSERT INTO livres (idIntervenant, nom, prenom, fb_url, insta_url, avatar_src, activite) VALUE (?, ?, ?, ?, ?, ?, ?)";
  const payload = [
    data.idIntervenant,
    data.nom,
    data.prenom,
    data.fb_url,
    data.insta_url,
    data.avatar_src,
    data.activite
  ];
  connection.query(sql, payload, (err, res) => {
    if (err) return callback(err, null);
    return callback(null, res);
  });
};

////////////////////////////////////////////// EDITIONS //////////////////////////////////////////////
const getEditions = callback => {
  const sql = "SELECT * FROM editeurs ORDER BY nom ASC";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getOneEdition = (idEditeur, callback) => {
  const sql = "SELECT * FROM editeurs WHERE idEditeur = ? ";
  connection.query(sql, [idEditeur], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getBooksByEdition = (idEditeur, callback) => {
  const sql =
    "SELECT * FROM livres, editeurs WHERE livres.edition = editeurs.idEditeur AND editeurs.idEditeur = ?";
  connection.query(sql, [idEditeur], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
};

const getEditionByBook = (idLivre, callback) => {
  const sql =
    "SELECT * FROM livres, editeurs WHERE livres.edition = editeurs.idEditeur AND livres.idLivre = ?";

  const query = connection.query(sql, [idLivre], (error, results) => {
    if (error) throw error;
    callback(null, results);
  });
  console.log("edition =>", query.sql);
};

module.exports = {
  //soirées
  getLastEvent,
  getEvents,
  getOneEvent,
  getEventsOfAnimators,
  postEvent,
  deleteEvents,
  updateEvents,

  //intervennants
  getAnimators,
  getAnimatorsOfEvent,
  postAnimator,
  getOneAnimator,
  getAnimatorOfBook,

  //auteur et dessinateurs
  getOneAuteur,
  getOneDessinateur,
  getAuteurs,
  getDessinateurs,
  getDessinateursOfBook,
  getAuteursOfBook,

  //livres
  getBooks,
  postBooks,
  getBooksByEvent,
  getBooksByAnimator,
  getBooksOfAuteur,
  getBooksOfDessinateur,
  getOneBook,
  getBooksByEdition,

  //croquis
  getCroquis,

  //croquis
  getPhotos,

  //editions
  getEditions,
  getOneEdition,
  getEditionByBook
};
