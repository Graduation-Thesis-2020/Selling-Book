
const user = require('../models/user');

const authenUser = async (req, res, next) => {
  const account = req.user;
  if (account.role == 0) {

    return next({ message: "Bạn không đủ quyền truy cập!!!" });
  }
  return next();
}

const checkAdmin = async (req, res, next) => {
  const account = req.user;
  if (account.role == 1) {
    return next();
  }
  return next({ message: "Bạn không đủ quyền truy cập!!!" });
}
module.exports = {
  authenUser,
  checkAdmin
};