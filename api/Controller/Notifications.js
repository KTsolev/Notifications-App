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
    const updatedNotification = req.body;

    Notifications.findByIdAndUpdate(updatedNotification.id, updatedNotification, { upsert: true },
    (err, updatedNotification) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send(updatedNotification);
    });
},

exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Notifications.findByIdAndRemove(id, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send('Item Deleted Successfully!');
    });
}
