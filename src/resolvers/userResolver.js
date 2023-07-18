module.exports = {
    async posts(parent, args, { models }){
        try{
            const post = await models.Post.findAll({where:{userId:parent.id}})
            return post
        }catch(error){
            throw new Error(error)
        }
    },
}