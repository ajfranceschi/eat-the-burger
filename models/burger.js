const orm = require("../config/orm");

module.exports = {
  selectAll: callBack => {
    orm.selectAll("burgers", response => {
      callBack(response);
    });
  },
  insertOne: (columns, values, callBack) => {
    orm.insertOne("burgers", columns, values, response => {
      callBack(response);
    });
  },
  updateOne: (objectColumnValues, condition, callBack) => {
    orm.updateOne("burgers", objectColumnValues, condition, response => {
      callBack(response);
    });
  },
  delete: (condition, callBack) => {
    orm.delete("burgers", condition, response => {
      callBack(response);
    });
  }
};
