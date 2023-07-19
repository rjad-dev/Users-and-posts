module.exports = {
    async user(parent, args, {models}) {
        try {
            const user = await models.User.findByPk(parent.userId);
            return user;
    } catch (error) {
          throw new Error(error);
        }
    },
}