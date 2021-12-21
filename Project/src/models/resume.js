

module.exports = {
    createResume: function (con,id, data, callback) {
        con.query(
            `INSERT INTO resume SET position = ?, cv = ?, salary = ?, employee_id = ?`, [data.position,
                data.cv, data.salary, id],
            callback
        )
    },
    getAllResume: function (con,data, callback) {
        con.query(
            `SELECT * FROM resume r JOIN client c on r.employee_id = c.client_id WHERE employee_id = ?`, [data],
            callback
        )
    },
    getResume: function (con,resume_id, id, callback){
        con.query(
            `SELECT * FROM resume WHERE resume_id = ? and employee_id = ?`, [resume_id, id],
            callback
        )
    },
    getResumeByPosition: function (con,position, callback){
        con.query(
            `SELECT * FROM resume WHERE position = ?`, [position],
            callback
        )
    },
    updateResume: function (con,resume_id, id, data, callback) {
        con.query(
            `UPDATE resume SET position = ?, cv = ?, salary = ? WHERE employee_id = ? AND resume_id = ?`, [data.position,
                data.cv, data.salary, id, resume_id],
            callback
        )
    },
    deleteResume: function (con,resume_id, data, callback) {
        con.query(
            `DELETE FROM resume  WHERE  resume_id = ?`, [resume_id],
            callback
        )
    },
    listOfResumes : function(con,callback){
        con.query(
            `SELECT * FROM RESUME`, callback
        )
    }
}