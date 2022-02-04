const User = require('../models/User')

const getUsers = async () => {
  try {
    return User.find({}).then(res => res)
    // await User.find({}).then(res => res)
  } catch (e) {
    console.error(e)
  }
}

const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

module.exports = {
  delay,
  getUsers
}
