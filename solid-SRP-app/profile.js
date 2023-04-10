// profileController.js
const profileService = require('./profileService')

function updateProfile(req, res) {
  const userId = req.params.id
  const userData = req.body

  profileService.updateProfile(userId, userData)
    .then(() => {
      res.status(200).send('Profile updated successfully')
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Error updating profile')
    })
}

module.exports = { updateProfile }




// profileService.js
const database = require('./database')

function updateProfile(userId, userData) {
  return database.update('profiles', userId, userData)
}

module.exports = { updateProfile }




// database.js
function update(collection, id, data) {
  // update code here
}
