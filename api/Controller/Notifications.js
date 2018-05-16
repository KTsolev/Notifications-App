const Notifications = require('../Model/Notifications.js');

exports.findAll = (req, res) => {
  Notifications.find((err, notification) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.json(notification);
      }
    });
},

exports.save = (req, res) => {
  const newNotification = new Notifications(req.body);
  newNotification.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send(newNotification);
    });
},

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({ message: `Notification can not be empty` });
  }

  // Find Notification and update it with the request body
  Notification.findByIdAndUpdate(req.params.notificationId, {
    type: req.body.type,
    image: req.body.image,
    title: req.body.title,
    text: req.body.text,
    requirement: req.body.requirement,
    expires: req.body.expires,
  }, { new: true })
  .then(notification => {
      if (!notification) {
        return res.status(404).send({
            message: `Notification not found with id ${req.params.notificationId}`,
          });
      }

      res.send(notification);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
                  message: `Notification not found with id ${req.params.notificationId}`,
                });
        }

        return res.status(500).send({
            message: `Error updating notification with id ${req.params.notificationId}`,
          });
      });
};

exports.delete = (req, res) => {
      notification.findByIdAndRemove(req.params.notificationId)
    .then(Notification => {
        if (!Notification) {
          return res.status(404).send({
            message: `notification not found with id ${req.params.notificationId}`,
          });
        }

        res.send({
          message: `notification deleted successfully!`,
        });
      }).catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `notification not found with id ${req.params.notificationId}`,
              });
          }

          return res.status(500).send({
              message: `notification not found with id ${req.params.notificationId}`,
            });
        });
    };
