const moment = require('moment');
const Activity = require('../models/activity.model');

const dateNow = new Date();
const dateFix = moment(dateNow, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("YYYY-MM-DD HH:mm:ss.SSS")
exports.findAll = (req, res) => {

    Activity.getAll((err, data) => {
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
                    message: "Activity not found.",
                    data: {}
                });
            }
        }
    });
};

exports.findOne = (req, res) => {
    let { id } = req.params;

    Activity.getOne(id, (err, data) => {
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
                    message: `Activity with ID ${id} Not Found.`,
                    data: {}
                });
            }
        }
    });
};

exports.create = (req, res) => {
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

    const activity = new Activity({
        title: req.body.title,
        email: req.body.email || "",
        created_at: dateFix,
        updated_at: dateFix,
        deleted_at: null
    });

    Activity.create(activity, (err, data) => {
        if (err)
            res.status(500).send({
                status: 'Error',
                message:
                    err.message || "Network error.",
                data: {}
            });
        else res.send({
            status: "Success",
            message: "Success",
            data: data
        });
    });
};

exports.delete = (req, res) => {
    let { id } = req.params;

    Activity.delete(id, (err, data) => {
        if (err)
            if (err.status === "not found") {
                res.status(404).send({
                    status: "Not found",
                    message: `Activity with ID ${id} Not Found.`,
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

    const activity = new Activity({
        title: req.body.title,
        email: req.body.email || "",
        updated_at: dateFix,
    });

    Activity.update(id, activity, (err, data) => {
        if (err) {
            if (err.status === "not found") {
                res.status(404).send({
                    status: "Not found",
                    message: `Activity with ID ${id} Not Found.`,
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
            Activity.getOne(id, (err, data) => {
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
                            message: `Activity with ID ${id} Not Found.`,
                            data: {}
                        });
                    }
                }
            });
        }
    });
};

