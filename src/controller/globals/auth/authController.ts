/*

login feature
Register feature
Logout feature */


import {Request, Response} from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt"; 
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
    if(!req.body){
        console.log("triggered")
        res.status(400).json({
            message: "no data was sent"
        })
        return
    }

        const {username, email, password} = req.body     
        if(!username || !password || !email){
            res.status(400).json({
                message: "please provide username, password and email"
            })
            return
    }
        await User.create({
            username : username,
            email : email,
            password : bcrypt.hashSync(password, 12)
        })

        res.status(201).json({
            message: "User registered successfully"
        })
    }
}
    
    
    

export default AuthController 