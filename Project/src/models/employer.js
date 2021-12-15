module.exports = {
    get: function (con, callback) {
        con.query("SELECT * FROM client", callback)
    },
    createEmployer: function (con, data, callback) {
        con.query(
            `INSERT INTO client SET name = ?, surname = ?, login = ?,
            password = ?', gender = ?,  role = 'employer'`, [data.name, data.surname,
                data.login, data.password, data.gender],
            callback
        )
    },
    checkEmployer: function (con, data, callback) {
        con.query(
            `SELECT * FROM client WHERE login = ? AND
            password = ? AND  role = 'employer'`, [data.login, data.password],
            callback
        )
    },
    getEmployer: function (con, data, callback) {
        con.query(
            `SELECT * FROM client WHERE client_id = ? AND role = 'employer'`, [data],
            callback
        )
    }
}
