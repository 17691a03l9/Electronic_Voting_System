const sql = require("./db.js");

// constructor
const Voting = function(voting) {
  this.election_id = voting.election_id;
  this.party_id = voting.party_id;
  this.candidate_id = voting.candidate_id;
  this.voter_id = voting.voter_id;
  this.voting_status =1;
  this.voting_time= new Date();
 
};

Voting.create = (newVoting, result) => {
  sql.query("INSERT INTO voting SET ?", newVoting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newVoting });
    result(null, { id: res.insertId, ...newVoting });
  });
};

Voting.findById = (id, result) => {
  sql.query(`SELECT * FROM voting WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found voting: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
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
};*/

Voting.getAllPublished = result => {
  sql.query("SELECT * FROM voting WHERE voter_id IS NOT NULL", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("voting: ", res);
    result(null, res);
  });
};

Voting.updateById = (id, voting, result) => {
  sql.query(
    "UPDATE voting SET voting_status = ? WHERE id = ?",
    [nomation.status, id],
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

      console.log("updated voting: ", { id: id, ...voting });
      result(null, { id: id, ...voting });
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
module.exports = Voting;