const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const {
  selectAllCategorys,
  selectCategorys,
  insertCategorys,
  updateCategorys,
  deleteCategorys,
  countData,
  findID,
} = require("../model/categorys");

const categorysController = {
  getAllCategorys: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "category_id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllCategorys({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getSelectCategorys: async (req, res) => {
    const category_id = Number(req.params.id);
    const { rowCount } = await findID(category_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectCategorys(category_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  insertCategorys: async (req, res) => {
    const { category_name } = req.body;
    const category_id = uuidv4();
    const data = {
      category_id,
      category_name,
    };
    insertCategorys(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Product Success")
      )
      .catch((err) => res.send(err));
  },

  updateCategorys: async (req, res) => {
    try {
      const category_id = String(req.params.id);
      const { category_name } = req.body;
      const { rowCount } = await findID(category_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        category_id,
        category_name,
      };
      updateCategorys(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Update Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategorys: async (req, res, next) => {
    try {
      const category_id = Number(req.params.id);
      const { rowCount } = await findID(category_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteCategorys(category_id)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Delete Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categorysController;
