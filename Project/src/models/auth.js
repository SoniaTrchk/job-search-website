module.exports = {
    createClient: function (con, data, callback) {
        con.query(
            `INSERT INTO client(name, surname, login, password, gender, role)
             VALUES (?,?,?,?,?,?)`, [data.name, data.surname,
                data.login, data.password, data.gender, data.role],
            callback
        )
    },
    checkClient: function (con, data, callback) {
        con.query(
            `SELECT * FROM client WHERE login = ? AND
            password = ? `, [data.login, data.password],
            callback
        )
    },
}