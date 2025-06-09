/*

login feature
Register feature
Logout feature */


import {Request, Response} from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
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



/*
login flow:
email/username, password(basic)
google login, fb, github(oauth)
email login (SSO)
*/



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

    static async loginUser(req: Request, res: Response){
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message : "please provide email and password";
            })
            return
        }

    const data =  await  User.findAll({
        where : {
            email : email
        }
      })

      if(data.length == 0){
        res.status(400).json({
            message: "not registered"
        })
      }else{
        const isPasswordMatch = bcrypt.compareSync(password, data[0].password)
        if(isPasswordMatch){
            const token = jwt.sign({id:  data[0].id}, "thisisrohan",{
                expiresIn: "1min"
            })
            

            res.json({
                token: token
            })
        }else{
            res.status(403).json({
                message: "invalid email or password"
            })
        }
      }
    }
}
    
    
    

export default AuthController 