import { NextFunction, Request, Response } from "express"
import  jwt  from "jsonwebtoken"
import User from "../database/models/user.model"
import IExtendedRequest from "./type"

const isLoggedIn = async(req: IExtendedRequest, res: Response, next:NextFunction)=>{

    const token = req.headers.authorization
     if(!token){
        res.status(401).json({
            message: "please provide token"
        })
        return
     }
     //token verify grney
     jwt.verify(token,'thisissecret',async (error, result :any)=>{
        if(error){
            res.status(403).json({
                message:"token invalid"
            })
        }else{
            console.log(result,'result aayo');
            // const userData = await User.findAll({
            //     where : {
            //         id : result.id
            //     }
            // })

            const userData = await User.findByPk(result.id)
            if(!userData){
                res.status(403).json({
                    message : "No user with that id, invalid token"
                })
            }else{
             req.user = userData;
             next()
            }
        }
     })
    //  next();

}

// class Middleware {
//     static isLoggedIn(req:IExtendedRequest, res:Response, next:NextFunction){
//      //login vako xa ki xaina check grney with the help of token
//      //token accept grney

//      const token = req.headers.authorization
//      if(!token){
//         res.status(401).json({
//             message: "please provide token"
//         })
//         return
//      }
//      //token verify grney
//      jwt.verify(token,'thisissecret',async (error, result :any)=>{
//         if(error){
//             res.status(403).json({
//                 message:"token invalid"
//             })
//         }else{
//             console.log(result,'result aayo');
//             // const userData = await User.findAll({
//             //     where : {
//             //         id : result.id
//             //     }
//             // })

//             const userData = await User.findByPk(result.id)
//             if(!userData){
//                 res.status(403).json({
//                     message : "No user with that id, invalid token"
//                 })
//             }else{
//                 req.user = userData
//                 next() 
//             }
//         }
//      })
//      next(); //route ma next step ma ja vanxa

//     }

//     static isRestricted(req:Request, res:Response){

//     }
// }

// export default Middleware

export default isLoggedIn
