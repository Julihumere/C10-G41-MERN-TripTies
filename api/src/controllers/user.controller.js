const User = require('../services/user.services')

const postUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, photoUser, role } =
      req.body

    const user = await User.createUser({
      username,
      firstName,
      lastName,
      email,
      password,
      photoUser,
      role,
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({
      message: error.message,
      fields: {
        username: 'String',
        first_name: 'String',
        last_name: 'String',
        email: 'example@example.com',
        password: 'String',
        photoUser: 'URL',
      },
    })
  }
}

const postUserSocialNetwork = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, photoUser, role } =
      req.body

    const user = await User.createUser({
      username,
      firstName,
      lastName,
      email,
      password,
      photoUser,
      role,
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({
      message: error.message,
      fields: {
        username: 'String',
        first_name: 'String',
        last_name: 'String',
        email: 'example@example.com',
        password: 'String',
        photoUser: 'URL',
      },
    })
  }
}

const getAllUsers = (req, res, next) => {
  User.getAllUsers()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      next(err)
    })
}

const getUserById = async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await User.findUserById(userId, 'profile')
    if (!user) {
      throw new Error(404, 'User not found')
    }
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const deleteUser = (req, res) => {
  const { userId } = req.params

  User.removeUser(userId)
    .then((user) => {
      res.status(200).json({ message: 'User deleted succesfully', user })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}

const getInfoUser = async (req, res) => {
  let id = req.user._id
  await User.getUserInformation(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({ message: err.message }))
}


module.exports = {
  postUser,
  postUserSocialNetwork,
  getAllUsers,
  getUserById,
  deleteUser,
  getInfoUser
}
