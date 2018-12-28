# Graphql Study
使用Graphql搭配nodejs實現 CRUD

Start Servers:
```sh
$ node server.js
```

Query:
```sh
{
  users {
    id
    name
    posts {
      id
      body
    }
  }
}
```
Insert:
```sh
mutation{
  addUser(name:"NewUser")
  {
    name,
    id
  }  
}
```
Update:
```sh
mutation {
  renameUser(id: 2, name: "NewUser2") {
    name
    id
  }
}
```
Delete:
```sh
mutation {
  removeUser(id: 2) {
    deletedUserId
  }
}
```