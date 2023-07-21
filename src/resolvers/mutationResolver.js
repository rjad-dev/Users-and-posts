const crypto = require("crypto");

const transporter = require('../../transporter')   
const nodemailer = require('nodemailer'); 
const { user } = require("./queryResolver");

module.exports ={
    async addUser(parent, { input }, { models }){
        const { name, email } = input
        const Email = email
        try{
            const existingEmail = await models.User.findOne({where:{email:Email}})
            if(existingEmail){
                throw new Error(`User with the Email:${email} exists already`)
            }

            const verificationCode = crypto.randomInt(0, 1000000)
            console.log(verificationCode) 
            
            const details = {
                from : user,
                to: email,
                text:`Hi ${name}, Your verification code is ${verificationCode}`
            }
            await transporter.sendMail(details, (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log('Email sent')
                }
            })
      

            return models.User.create({
                name,
                email,
                verificationCode
            })
        }catch(error){
            throw new Error(error)
        }
    },

    async verifyOTP(parent, {email, otp}, {models}){
        const Email = email
        try{
            const { verificationCode } = await models.User.findOne({
                where:{
                    email:Email
                }
            })

            if(verificationCode === otp){
                models.User.update({
                    isVerified:true
                }, 
                {
                    where:{email:Email},
                })
            }
            else{
                throw new Error('OTP not verified')
            }
            return true
        }catch(error){
            console.log(error)
        }
    },

    async addPost(parent, { input }, { models }){
        const { post, userId } = input 
        try{
            const user = await models.User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`No user exists with the ID:${userId}`);
            }
        
            return models.Post.create({
                post,
                userId
            })
        }catch(error){
            throw new Error(error)
        }
    },

    async addComment(parent, { input }, { models }){
        const { comment, postId, userId } = input

        try{
            const user = await models.User.findOne({ where: { id: userId } });
            const post = await models.Post.findOne({ where: { id: postId } });

            if (!user) {
                throw new Error(`No user exists with the ID:${userId}`);
            }
            if (!post) {
                throw new Error(`No user exists with the ID:${postId}`);
            }
        
            return models.Comment.create({
                comment,
                postId,
                userId
            })
        }catch(error){
            throw new Error(error)
        }
    },

    async addReply(parent, { input }, { models }){
        const { reply, commentId, userId } = input

        try{
            const user = await models.User.findOne({ where: { id: userId } });
            const comment = await models.Comment.findOne({ where: { id: commentId } });
            if (!user) {
                throw new Error(`No user exists with the ID:${userId}`);
            }
            if (!comment) {
                throw new Error(`No user exists with the ID:${commentId}`);
            }
        
            return models.Reply.create({
                reply,
                commentId,
                userId
            })
        }catch(error){
            throw new Error(error)
        }
    },

    async deleteUser(parent, { id }, { models }){
        const userID = id
        try{
            await models.User.destroy({ where: { id: userID } })
            return true
        }catch(error){
            throw new Error(error)
        }
    },

    async deletePost(parent, { id }, { models }){
        const postId = id
        try{
            const post = models.Post.findOne({where:{id:postId}})
            if(!post){
                throw new Error(`No post exists with the ID:${postId}`)
            }
            await models.Post.destroy({ where: { id: postId } })
            return true
        }catch(error){
            throw new Error(error)
        }
    },

    async deleteComment(parent, {id}, {models}){
        const commentId = id
        try{
            const comment = models.Comment.findOne({where:{id:commentId}})
            if(!comment){
                throw new Error(`No comment exists with the ID:${commentId}`)
            }
            await models.Comment.destroy({where:{id:commentId}})
            return true
        }catch(error){
            throw new Error(error)
        }
    },

    async deleteReply(parent, {id}, {models}){
        const replyId = id

        try{
            const reply = models.Reply.findOne({where:{id:replyId}})
            if(!reply){
                throw new Error(`No reply exists with the ID:${replyId}`)
            }
            await models.Reply.destroy({where: {id:replyId}})
            return true
        }catch(error){
            throw new Error(error)
        }
    },
    
    async updateUser(parent, { id, input }, { models }){
        const userId = id
        try{
            const user = await models.User.findOne({ where: { id: userId } });
            if(!user){
                throw new Error(`User does not exists with the ID:${userId}`)
            }
            const name = input.name
            const email = input.email
            models.User.update({
                name,
                email
            }, 
            {
                where:{id:userId},
            })

            return models.User.findByPk(userId)
        }catch(error){
            throw new Error(error)
        }
    },

    async updatePost(parent, { id, input }, { models }){
        const postId = id
        try{
            const post = await models.Post.findOne({ where: { id: postId } });
            if(!post){
                throw new Error(`Post does not exists with the ID:${postId}`)
            }
            const newPost = input.post
            models.Post.update({
                post : newPost
            },
            {
                where:{id:postId},
            })
            return models.Post.findByPk(postId) 
        }catch(error){
            throw new Error(error)
        }
    },

    async updateComment(parent, {id, input}, {models}){
        const commentId = id
        try{
            const comment = await models.Comment.findOne({ where: { id: commentId } });
            if(!comment){
                throw new Error(`Comment does not exists with the ID:${commentId}`)
            }
            const newComment = input.comment
            models.Comment.update({
                comment : newComment
            },
            {
                where:{id:commentId},
            })
            return models.Comment.findByPk(commentId) 
        }catch(error){
            throw new Error(error)
        }
    },

    async updateReply(parent, {id, input}, {models}){
        const replyId = id
        try{
            const reply = await models.Reply.findOne({ where: { id: replyId } });
            if(!reply){
                throw new Error(`Reply does not exists with the ID:${replyId}`)
            }
            const newReply = input.reply
            models.Reply.update({
                comment : newReply
            },
            {
                where:{id:replyId},
            })
            return models.Reply.findByPk(replyId) 
        }catch(error){
            throw new Error(error)
        }
    },

    async likePost(parent, {input}, {models}){
        const {postId, userId} = input;

        try{
            const post = await models.Post.findByPk(postId);

            if(!post){
                throw new Error(`No post found with the ID: ${postId}`)
            }

            const likeExist = await models.Like.findOne({
                where:{
                    postId,
                    userId
                },
            })

            if(likeExist){
                throw new Error('You have already liked the post')
            }

            const like = await models.Like.create({
                userId,
                postId,
            })

            post.likeCount++;

            return post;
        } catch(error){
            console.log(error)
            throw new Error(error)
        }
    },

    async unlikePost(parent, {input}, { models }){
        const {postId, userId} = input;
        try{
            const post = models.Post.findByPk(postId)

            if(!post){
                throw new Error(`No post found with the ID: ${postId}`)
            }

            const likeExist = await models.Like.findOne({
                where:{
                    postId,
                    userId
                }
            })

            if(!likeExist){
                throw new Error('You have not liked the post')
            }

            await likeExist.destroy();

            post.likeCount--;
            return post;
        } catch(error){
            throw new Error(error)
        }
    }
}