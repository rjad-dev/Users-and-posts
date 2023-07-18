const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: Int!
        name:String!
        email:String!
        posts: [Post!]!
    }

    type Post {
        id: Int!
        content: String!
        userId: Int!
        user: User!
    }

    type Comment {
        id: Int!
        comment: String!
        post: Post!
        user: User!
    }

    type Query{
        users: [User!]!
        user(id:Int!): User!
        posts: [Post!]!
        post(id:Int!): Post!
    }

    input addUserInput{
        name:String!
        email:String!
    }

    input addPostInput{
        content: String!
         userId: Int!
    }

    input updateUserInput{
        name:String
        email:String
    }

    input updatePostInput{
        content: String
        userId: Int
    }


    type Mutation {
        addUser(input:addUserInput!):User!
        addPost(input:addPostInput!):Post!

        deleteUser(id:Int!):Boolean!
        deletePost(id:Int!):Boolean!

        updateUser(id:Int!,input:updateUserInput!):User!
        updatePost(id:Int!,input:updatePostInput!):Post!
    }
`

module.exports = {typeDefs}