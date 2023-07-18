module.exports = {
    async user(parent, args, {models}) {
        try {
            const user = await models.User.findByPk(parent.userId);
            return user;
    } catch (error) {
          throw new Error(error);
        }
    },

    async comments(parent, args, {models}){
        try{
            const comment = await models.Comment.findAll({where:{postId:parent.id}})
            if(comment){
                return comment
            }
        }catch(error){
            throw new Error(error)
        }
    }
}