const { buildSchema } = require('graphql');
const { usersById, postsById } = require('./Data');
exports.schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    author: User!
    title: String!
    body: String!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    user(id: Int!): User
  }

  type RemoveUserPayload {
    deletedUserId: Int!
  }

  type Mutation {
    addUser(name: String!): User,
    renameUser(id: Int!, name: String!): User,
    removeUser(id: Int!): RemoveUserPayload,
  }
`);

const queries = {
    users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
    posts: () => Object.keys(postsById).map(id => new GraphQLPost(postsById[id])),
    user: ({ id }) => usersById[id] ? new GraphQLUser(usersById[id]) : null,
}


class GraphQLUser {
    constructor({ id, name }) {
      this.id = id;
      this.name = name;
    }
    posts() {
        return Object.keys(postsById)
        .map(id => new GraphQLPost(postsById[id]))
        .filter(post => post.authorId === this.id);
    }
}
  
class GraphQLPost {
    constructor({ id, authorId, title, body }) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.body = body;
    }
    author() {
        return new GraphQLUser(usersById[this.authorId]);
    }
}

let nextId = Object.keys(usersById).length + 1;

const mutations = {
  addUser: ({ name }) => {
    const newUser = {
      id: nextId,
      name,
    };
    usersById[nextId] = newUser;
    
    nextId++;
    
    return new GraphQLUser(newUser);
  },
  renameUser: ({ id, name }) => {
    usersById[id].name = name;
    return new GraphQLUser(usersById[id]);
  },
  removeUser: ({ id }) => {
    delete usersById[id];
    return {
        deletedUserId: id,
    }
  }
}

exports.rootValue = {
    ...queries,
    ...mutations,
};
