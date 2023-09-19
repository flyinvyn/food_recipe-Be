const Pool = require("../config/db");

// GET ALL Categorys
const selectAllCategorys = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM categories ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

// SELECT RICAPES BY USERS ID
const selectCategorys = (category_id) => {
  return Pool.query(
    `SELECT * FROM categories WHERE category_id = ${category_id}`
  );
};

// INSERT Categorys
const insertCategorys = (data) => {
  const { category_id, category_name } = data;
  return Pool.query(
    `INSERT INTO categories (category_id, category_name) 
    VALUES('${category_id}', '${category_name}')`
  );
};

// UPDATE Categorys
const updateCategorys = (data) => {
  const { category_id, category_name } = data;
  return Pool.query(
    `UPDATE categories SET category_name='${category_name}' WHERE category_id=${category_id}`
  );
};

// DELETE Category
const deleteCategorys = (category_id) => {
  return Pool.query(`DELETE FROM categories WHERE category_id=${category_id}`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM categories");
};

//
const findID = (category_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT category_id FROM categories WHERE category_id=${category_id}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  selectAllCategorys,
  selectCategorys,
  insertCategorys,
  updateCategorys,
  deleteCategorys,
  countData,
  findID,
};
