const sql = require("./db.js");

// constructor
const Nomination = function (nomination) {
  this.election_id = nomination.election_id;
  this.party_id = nomination.party_id;
  this.candidate_id = nomination.candidate_id;
  this.approver_status = "0";
  this.nomination_year = new Date();
};
// const DATE_FORMATER = require( 'dateformat' );
// var d1 = DATE_FORMATER( new Date(), "yyyy-mm-dd HH:MM:ss" );
Nomination.create = (newNomination, result) => {
  sql.query("INSERT INTO nomination SET ?",
    newNomination,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: res.insertId, ...newNomination });
      result(null, { id: res.insertId, ...newNomination });
    }
  );
};

Nomination.findById = (id, result) => {
  sql.query(`SELECT * FROM nomination WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found nomination: ", res);
      result(null, res);
      return;
    }

//     // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

/*Party.getAll = (party_name, result) => {
  let query = "SELECT * FROM party";
  if (party_name) {
    query += ` WHERE party_name LIKE '%${party_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("party_master: ", res);
    result(null, res);
  });
};
/*
Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};*/

Nomination.updateById = (id, nomination, result) => {
  sql.query(
    "UPDATE nomination SET approver_status =1  WHERE id = ?",
    [nomination.approver_status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated nomination: ", { id: id, ...nomination });
      result(null, { id: id, ...nomination });
    }
  );
};

/*Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};
*/
module.exports = Nomination;
