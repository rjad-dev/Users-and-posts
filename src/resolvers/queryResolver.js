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
        console.log(id)
        return models.Reply.findByPk(id)
    }
}

