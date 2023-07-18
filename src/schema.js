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
        comments: [Comment!]!
    }

    type Comment {
        id: Int!
        comment: String!
        post: Post!
        user: User!
    }
    type Reply{
        id: Int!
        reply: String!
        comment: Comment!
        post: Post!
        user: User!
    }

    type Query{
        users: [User!]!
        user(id:Int!): User!

        posts: [Post!]!
        post(id:Int!): Post!

        comments: [Comment!]!
        comment(id:Int!):Comment!

        replies: [Reply!]!
        reply(id:Int!):Reply!
    }

    input addUserInput{
        name:String!
        email:String!
    }

    input addPostInput{
        content: String!
        userId: Int!
    }

    input addCommentInput{
        postId:  Int!
        userId: Int!
        comment: String!
    }

    input updateUserInput{
        name:String
        email:String
    }

    input updatePostInput{
        content: String
        userId: Int
    }

    input updateCommentInput{
        postId:  Int!
        userId: Int!
        comment: String!
    }


    type Mutation {
        addUser(input:addUserInput!):User!
        addPost(input:addPostInput!):Post!
        addComment(input:addCommentInput!):Comment!

        deleteUser(id:Int!):Boolean!
        deletePost(id:Int!):Boolean!
        deleteComment(id:Int!):Boolean!

        updateUser(id:Int!,input:updateUserInput!):User!
        updatePost(id:Int!,input:updatePostInput!):Post!
        updateComment(id:Int!,input:updateCommentInput!):Comment!
    }
`

module.exports = {typeDefs}