const sql = require('../connection/conn');

const Activity = function(obj) {
    this.title = obj.title;
    this.email = obj.email;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    this.deleted_at = obj.deleted_at;
}

Activity.getAll = (result) => {
    let query = 'SELECT * FROM activity';

    sql.query(query, (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        result(null, res);
    })
};

Activity.getOne = (id, result) => {
    let query = `SELECT * FROM activity WHERE id = ${id}`;

    sql.query(query, (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        result(null, res);
    })
};

Activity.create = (newActivity, result) => {
    let query = `INSERT INTO activity SET ?`;

    sql.query(query, newActivity, (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }
        
        result(null, { id: res.insertId, ...newActivity });
    })
};

Activity.delete = (id, result) => {
    let query = `DELETE FROM activity WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        if (!res.affectedRows) {
            result({ status: 'not found' }, null);
            return;
        }

        result(null, res);
    })
};

Activity.update = (id, activity, result) => {
    let query = `UPDATE activity SET title = ?, email = ?, updated_at = ? WHERE id = ?`;

    sql.query(query, [activity.title, activity.email, activity.updated_at, id], (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        if (!res.affectedRows) {
            result({ status: 'not found' }, null);
            return;
        }

        result(null, { id: id, ...activity });
    })
};

module.exports = Activity;