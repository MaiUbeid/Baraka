const { lists, items, users } = require('../models/queries/index');

exports.addList = (req, res, next) => {
  const listInfo = req.body;
  lists
    .insert(listInfo)
    .then(() => res.redirect('/'))
    .catch(next);
};

const adduser = name =>
  users
    .find(name)
    .then(id => {
      // -1 or something else
      if (id === -1) return users.insert(name).then(() => users.find());
      return id;
    })
    .catch(err => err);

exports.addItem = (req, res, next) => {
  adduser(req.body.item_user)
    .then(id => {
      const itemInfo = {
        list_id: +req.body.list_id,
        name: req.body.item_name,
        content: req.body.item_content,
        user_id: id
      };
      items
        .insert(itemInfo)
        .then(() => res.redirect('/'))
        .catch(next);
    })
    .catch(next);
};
