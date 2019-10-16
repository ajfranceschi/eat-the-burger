// Import MySql Connection:
const connection = require("./connection");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = number => {
  let array = [];

  for (let i = 0; i < number; i++) {
    array.push("?");
  }

  return array.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objectToSql = object => {
  let array = [];

  // loop through the keys and push the key/value as a string int arr
  for (const key in object) {
    // check to make sure object has the property
    if (Object.hasOwnProperty.call(object, key)) {
      let value = object[key];
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = `'${value}'`;
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      array.push(`${key}=${value}`);
    }
  }
  //translate array of strings to a single comma-separated string
  return array.toString();
};

const orm = {
  selectAll: (tableInput, callBack) => {
    const queryString = `select * from ${tableInput}`;

    connection.query(queryString, (error, result) => {
      if (error) {
        throw error;
      }
      callBack(result);
    });
  },
  insertOne: (table, columns, values, callBack) => {
    const queryString = `insert into ${table} (${columns.toString()}) values (${printQuestionMarks(
      values.length
    )})`;

    connection.query(queryString, values, (error, result) => {
      if (error) {
        throw error;
      }
      callBack(result);
    });
  },
  updateOne: (table, objectColumnValues, condition, callBack) => {
    const queryString = `update ${table} set ${objectToSql(
      objectColumnValues
    )} where ${condition}`;

    connection.query(queryString, (error, result) => {
      if (error) {
        throw error;
      }
      callBack(result);
    });
  },
  delete: (table, condition, callBack) => {
    const queryString = `delete from ${table} where ${condition}`;

    connection.query(queryString, (error, result) => {
      if (error) {
        throw error;
      }
      callBack(result);
    });
  }
};

module.exports = orm;
