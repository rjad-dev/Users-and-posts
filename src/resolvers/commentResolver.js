module.exports = {
    async user(parent, args, { models }){
        try{
            const user = await models.User.findByPk(parent.userId);
            return user;
        }catch(error){
            throw new Error(error)
        }
    },

    async post(parent, args, {models}){
        try{
            const post = await models.Post.findByPk(parent.postId);
            return post;
        }catch(error){
            throw new Error(error)
        }
    },

    async replies(parent, args, { models }){
        try{
            const reply = await models.Reply.findAll({where:{commentId:parent.id}})
            return reply
        }catch(error){
            throw new Error(error)
        }
    }
}