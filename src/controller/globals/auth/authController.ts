/*

login feature
Register feature
Logout feature */


import {Request, Response} from "express";
import User from "../../../database/models/user.model";
// const registerUser = async (req:Request, res:Response)=> {
//     const {username, email, password} = req.body
//     if(!username || !password || !email){
//         res.status(400).json({
//             message: "please provide username, password and email"
//         })
//     }else{
//         await User.create({username, email, password})
//     }
// }

// export {registerUser}

// yesari class banayera pani grna milxa, yo jhan dami hunxa (advanced)
class AuthController {
    static async registerUser(req:Request, res:Response){
        const {username, email, password} = req.body
        if(!username || !password || !email){
            res.status(400).json({
                message: "please provide username, password and email"
            })
            return
    }
        await User.create({
            username : username,
            password : password,
            email : email
        })

        res.status(200).json({
            message: "User registered successfully"
        })
    }
}
    
    
    

export default AuthController 