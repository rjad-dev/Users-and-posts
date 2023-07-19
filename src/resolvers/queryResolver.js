module.exports = {
    users(parent, args, { models }){
        return models.User.findAll()
    },

    user(parent, { id }, { models }){
        return models.User.findByPk(id)
    },

    posts(parent, args, { models }){
        return models.Post.findAll()
    },

    post(parent, {id}, { models }){
        return models.Post.findByPk(id)
    },

    likes(parent, args, { models }){
        return models.Like.findAll()
    },

    comments(parent, args, { models }){
        return models.Comment.findAll()
    },
    
    comment(parent, { id }, {models}){
        return models.Comment.findByPk(id)
    },

    replies(parent, args, { models }){
        return models.Reply.findAll()
    },

    reply(parent, {id}, {models}){
        return models.Reply.findByPk(id)
    }
}

