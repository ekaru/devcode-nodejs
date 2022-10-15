const sql = require('../connection/conn');

const Todo = function(obj) {
    this.activity_group_id = obj.activity_group_id;
    this.title = obj.title;
    this.is_active = obj.is_active;
    this.priority = obj.priority;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    this.deleted_at = obj.deleted_at;
}

Todo.getAll = (activityID, result) => {
    let query = 'SELECT * FROM todo';

    if (activityID) {
        query += ` WHERE activity_group_id = ${activityID}`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error : ', err);
            result(null, err);
            return;
        }

        result(null, res);
    })
};

Todo.getOne = async (id, result) => {
    let query = `SELECT * FROM todo WHERE id = ${id}`;

    sql.query(query, (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        result(null, res);
    })
};

Todo.create = (newTodo, result) => {
    let query = `INSERT INTO todo SET ?`;

    sql.query(query, newTodo, (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        newTodo.is_active = true
        result(null, { id: res.insertId, ...newTodo });
    })
};

Todo.delete = (id, result) => {
    let query = `DELETE FROM todo WHERE id = ?`;

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

Todo.update = (id, todo, result) => {
    let query = `UPDATE todo SET title = ?, updated_at = ? `;

    if (todo.priority) {
        query += `, priority = '${todo.priority}' `
    }

    query += 'WHERE id = ?'

    sql.query(query, [todo.title, todo.updated_at, id], (err, res) => {
        if (err) {
            // console.log('error : ', err);
            result(null, err);
            return;
        }

        if (!res.affectedRows) {
            result({ status: 'not found' }, null);
            return;
        }

        result(null, { id: id, ...todo });
    })
};

module.exports = Todo;