module.exports = server => {
  // GETS
  server.get('/', (req, res) => {
    // home
  })
  server.get('/:profile', (req, res) => {
    // view a profile
  })
  server.get('/newList', (req, res) => {
    // fill out forms
  })

  //POSTS
  server.post('/newList', (req, res) => {
    // post forms (?)
  })

  //DELETES
  server.delete('/remove/:userID', (req, res) => {
    // remove a user
  })
  server.delete('/remove/:listID', (req, res) => {
    // remove a list
  })
}
