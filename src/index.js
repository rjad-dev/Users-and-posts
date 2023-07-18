const {ApolloServer} = require('apollo-server')

const {typeDefs} = require('./schema')
const Query = require('./resolvers/queryResolver')
const Mutation = require('./resolvers/mutationResolver')
const User = require('./resolvers/userResolver')
const Post = require('./resolvers/postResolver')
const Comment = require('./resolvers/commentResolver')
const Reply = require('./resolvers/replyResolver')

const models = require('../models')

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Comment,
        Reply
    },
    context : {
        models
    }
});

server.listen().then(({url}) => {
    console.log(`Listening to ${url}`)
})