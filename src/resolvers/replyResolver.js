module.exports = {
    async user(parent, args, { models }){
        try{
            const user = await models.User.findByPk(parent.userId);
            return user;
        }catch(error){
            throw new Error(error)
        }
    },

    async comment(parent, args, {models}){
        try{
            const comment = await models.Comment.findByPk(parent.commentId);
            return comment;
        }catch(error){
            throw new Error(error)
        }
    },
}