module.exports = {
  get(con, callback) {
    con.query("SELECT * FROM client", callback);
  },
  createEmployee(con, data, callback) {
    con.query(
      `INSERT INTO client SET name = ?, surname = ?, login = ?,
             password = ?', gender = ?,  role = 'employee'`, [data.name, data.surname,
        data.login, data.password, data.gender],
      callback,
    );
  },
  checkEmployee(con, data, callback) {
    con.query(
      `SELECT * FROM client WHERE login = ? AND
            password = ? AND  role = 'employee'`, [data.login, data.password],
      callback,
    );
  },
  getEmployee(con, data, callback) {
    con.query(
      `SELECT * FROM client WHERE client_id = ? AND role = 'employee'`, [data],
      callback,
    );
  },
};
