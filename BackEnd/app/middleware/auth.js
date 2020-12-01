
const user = require('../models/user');

const authenUser = async (req , res, next ) => {
  const { email } = req.body ;
  const account = await user.findOne({ email }); 
  if(account.role == 1){
    return true;
  }
  return false;
}
module.exports =  {
  authenUser
};