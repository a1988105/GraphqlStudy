const Promise = require('bluebird')  
const AppDAO = require('./dao')  
const UsersRepository = require('./usersrepository')  
const PostsRepository = require('./postsrepository')

function main() {  
    const dao = new AppDAO(':memory:')
    const UserData = { name: 'Test User 1' }
    const usersRepo = new UsersRepository(dao)
    const postsRepo = new PostsRepository(dao)
    let userID
  
    usersRepo.createTable()
      .then(() => postsRepo.createTable())
      .then(() => usersRepo.create(UserData.name))
      .then((data) => {
        userID = data.id
        const posts = [
          {
            title: 'Title1',
            body: 'body1',
            authorId: userID
          },
          {
            title: 'Title2',
            body: 'body2',
            authorId: userID
          }
        ]
        return Promise.all(posts.map((post) => {
          const { title, body, authorId } = post
          return postsRepo.create(title, body, authorId)
        }))
      })
      .then(() => usersRepo.getById(userID))
      .then((user) => {
        console.log(`\nRetreived user from database`)
        console.log(`user id = ${userID.id}`)
        console.log(`user name = ${userID.name}`)
        return usersRepo.getPosts(user.id)
      })
      .then((posts) => {
        console.log('\nRetrieved user posts from database')
        return new Promise((resolve, reject) => {
            posts.forEach((post) => {
            console.log(`id = ${post.id}`)
            console.log(`title = ${post.title}`)
            console.log(`body = ${post.body}`)
            console.log(`authorId = ${post.authorId}`)
          })
        })
        resolve('success')
      })
      .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }
  
  main()  
