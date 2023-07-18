module.exports ={
    async addUser(parent, { input }, { models }){
        const { name, email } = input
        return models.User.create({
            name,
            email
        })
    },

    async addPost(parent, { input }, { models }){
        const { content, userId } = input
        return models.Post.create({
            content,
            userId
        })
    },

    async addComment(parent, { input }, { models }){
        const { comment, postId, userId } = input
        return models.Comment.create({
            comment,
            postId,
            userId
        })
    },

    async addReply(parent, { input }, { models }){
        const { reply, commentId, userId } = input
        return models.Reply.create({
            reply,
            commentId,
            userId
        })
    },

    async deleteUser(parent, { id }, { models }){
        const userID = id
        await models.User.destroy({ where: { id: userID } })

        return true
    },

    async deletePost(parent, { id }, { models }){
        const postID = id
        await models.Post.destroy({ where: { id: postID } })

        return true
    },

    async deleteComment(parent, {id}, {models}){
        const commentID = id
        await models.Comment.destroy({where:{id:commentID}})

        return true
    },

    async deleteReply(parent, {id}, {models}){
        const replyId = id
        await models.Reply.destroy({where: {id:replyId}})
    },
    
    async updateUser(parent, { id, input }, { models }){
        const userID = id
        const name = input.name
        const email = input.email
        models.User.update({
            name,
            email
        }, 
        {
            where:{id:userID},
        })

        return models.User.findByPk(userID)
    },

    async updatePost(parent, { id, input }, { models }){
        const postID = id
        const content = input.content
        models.Post.update({
            content
        },
        {
            where:{id:postID},
        })
        return models.Post.findByPk(postID)
    },

    async updateComment(parent, {id, input}, {models}){
        const commentID = id
        const comment = input.comment
        models.Comment.update({
            comment
        },{
            where:{id:commentID}
        })
    },

    async updateReply(parent, {id, input}, {models}){
        const replyId = id
        const reply = input.reply

        models.Reply.update({
            reply
        }, {
            where: {id:replyId}
        })
    }
}