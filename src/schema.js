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
        post: String!
        user: User!
        likeCount: Int!
        likes: [Like!]!
        comments: [Comment!]!
    }

    type Like{
        id: Int!
        user: User!
        post: Post!
    }

    type Comment {
        id: Int!
        comment: String!
        post: Post!
        user: User!
        replies: [Reply!]!
    }

    type Reply{
        id: Int!
        reply: String!
        comment: Comment!
        user: User!
    }

    input addUserInput{
        name:String!
        email:String!
    }

    input addPostInput{
        post: String!
        userId: Int!
    }

    input likeInput{
        postId:Int!
        userId:Int!
    }

    input addCommentInput{
        postId:  Int!
        userId: Int!
        comment: String!
    }

    input addReplyInput{
        reply: String!
        commentId: Int!
        userId: Int!
    }

    input updateUserInput{
        name:String
        email:String
    }

    input updatePostInput{
        post: String
    }

    input updateCommentInput{
        comment: String!
    }

    input updateReplyInput{
        reply: String!
    }

    type Query{
        users: [User!]!
        user(id:Int!): User!

        posts: [Post!]!
        post(id:Int!): Post!

        comments: [Comment!]!
        comment(id:Int!):Comment!

        replies:[Reply!]!
        reply(id:Int!):Reply!

        likes: [Like!]!
    }

    type Mutation {
        addUser(input:addUserInput!):User!
        addPost(input:addPostInput!):Post!
        addComment(input:addCommentInput!):Comment!
        addReply(input:addReplyInput!):Reply!

        likePost(input: likeInput!):Post!
        unlikePost(input: likeInput!):Post!

        deleteUser(id:Int!):Boolean!
        deletePost(id:Int!):Boolean!
        deleteComment(id:Int!):Boolean!
        deleteReply(id:Int!):Boolean!

        updateUser(id:Int!,input:updateUserInput!):User!
        updatePost(id:Int!,input:updatePostInput!):Post!
        updateComment(id:Int!,input:updateCommentInput!):Comment!
        updateReply(id:Int!, input:updateReplyInput!):Reply!

    }
`

module.exports = {typeDefs}