const moment = require('moment');
const Todo = require('../models/todo.model');
const Activity = require('../models/activity.model');

const dateNow = new Date();
const dateFix = moment(dateNow, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("YYYY-MM-DD HH:mm:ss.SSS")

exports.findAll = (req, res) => {
    const { activity_group_id } = req.query;

    Todo.getAll(activity_group_id, (err, data) => {
        if (err)
            res.status(500).send({
                status: 'Error',
                message:
                    err.message || "Network error.",
                data: {}
            });
        else {
            if (data.length) {
                res.send({
                    status: "Success",
                    message: "Success",
                    data: data
                });
            } else {
                res.status(404).send({
                    status: "Not found",
                    message: "Todo not found.",
                    data: {}
                });
            }
        }
    });
};

exports.findOne = (req, res) => {
    let { id } = req.params;

    Todo.getOne(id, (err, data) => {
        if (err)
            res.status(500).send({
                status: 'Error',
                message:
                    err.message || "Network error.",
                data: {}
            });
        else {
            if (data.length) {
                res.send({
                    status: "Success",
                    message: "Success",
                    data: data
                });
            } else {
                res.status(404).send({
                    status: "Not found",
                    message: `Todo with ID ${id} Not Found.`,
                    data: {}
                });
            }
        }
    });
};

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            status: 'Bad Request',
            message: "Content can not be empty.",
            data: {}
        });
        return;
    }
    if (!req.body.title) {
        res.status(400).send({
            status: 'Bad Request',
            message: "title can not be null.",
            data: {}
        });
        return;
    } 
    if (!req.body.activity_group_id) {
        res.status(400).send({
            status: 'Bad Request',
            message: "activity_group_id can not be null.",
            data: {}
        });
        return;
    }

    let activityID = req.body.activity_group_id

    Activity.getOne(activityID, (err, data) => {
        if (err)
            res.status(500).send({
                status: 'Error',
                message:
                    err.message || "Network error.",
                data: {}
            });
        else {
            if (!data.length) {
                res.send({
                    status: "Not found",
                    message: `Activity with activity_group_id ${activityID} Not Found.`,
                    data: {}
                });
                return;
            }

            const activity = new Todo({
                activity_group_id: activityID,
                title: req.body.title,
                is_active: 1,
                priority: req.body.priority || 'very-high',
                created_at: dateFix,
                updated_at: dateFix,
                deleted_at: null
            });
        
            Todo.create(activity, (err, data) => {
                if (err)
                    res.status(500).send({
                        status: 'Error',
                        message:
                            err.message || "Network error.",
                        data: {}
                    });
                else {
                    res.status(201).send({
                        status: "Success",
                        message: "Success",
                        data: data
                    });
                    return;
                }
            });
        }
    });
    
};

exports.delete = (req, res) => {
    let { id } = req.params;

    Todo.delete(id, (err, data) => {
        if (err)
            if (err.status === "not found") {
                res.status(404).send({
                    status: "Not found",
                    message: `Todo with ID ${id} not found.`,
                    data: {}
                });
            } else {
                res.status(500).send({
                    status: 'Error',
                    message:
                        err.message || "Network error.",
                    data: {}
                });
            }
        else {
            res.send({
                status: "Success",
                message: "Success",
                data: {}
            });
        }
    });
};

exports.update = (req, res) => {
    let { id } = req.params;

    if (!req.body) {
        res.status(400).send({
            status: 'Bad Request',
            message: "Content can not be empty.",
            data: {}
        });
    }
    if (!req.body.title) {
        res.status(400).send({
            status: 'Bad Request',
            message: "title can not be null.",
            data: {}
        });
    }

    const todo = new Todo({
        title: req.body.title,
        priority: req.body.priority,
        updated_at: dateFix,
    });

    Todo.update(id, todo, (err, data) => {
        if (err) {
            if (err.status === "not found") {
                res.status(404).send({
                    status: "Not found",
                    message: `Todo with ID ${id} not found.`,
                    data: {}
                });
            } else {
                res.status(500).send({
                    status: 'Error',
                    message:
                        err.message || "Network error.",
                    data: {}
                });
            }
        } else {
            Todo.getOne(id, (err, data) => {
                if (err) {
                    // console.log('err2', err);
                    res.status(500).send({
                        status: 'Error',
                        message:
                            err.message || "Network error.",
                        data: {}
                    });
                } else {
                    if (data.length) {
                        res.send({
                            status: "Success",
                            message: "Success",
                            data: data
                        });
                    } else {
                        res.send({
                            status: "Not found",
                            message: `Todo with ID ${id} not found.`,
                            data: {}
                        });
                    }
                }
            });
        }
    });
};

