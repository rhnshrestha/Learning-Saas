import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateJwtToken from "../../services/generateJwtToken";
//teacher login 
interface ITeacherData {
    teacherPassword : string,
    id : string
}
const teacherLogin = async (req:Request, res:Response)=>{
    const {teacherEmail, teacherPassword, teacherInstituteNumber} = req.body;
    if(!teacherEmail || !teacherPassword || !teacherInstituteNumber){
      return res.status(400).json({
            message : "please provide teacher email, password and teacherInstituteNumber."
        })
    }
    const teacherData : ITeacherData[]  = await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail=?`,{
        type : QueryTypes.SELECT,
        replacements : [teacherEmail]
    })
    if(teacherData.length == 0){
        return res.status(400).json({
            message : "invalid credentials !!"
        })
    }
   const isPasswordMatch =  bcrypt.compareSync(teacherPassword,teacherData[0].teacherPassword);
   if(!isPasswordMatch){
    return res.status(400).json({
        message : "invalid credentials"
    })
   }else{
    const token = generateJwtToken({id:teacherData[0].id, instituteNumber : teacherInstituteNumber})
    res.status(200).json({
        message : "Teacher logged in successfully",
        token : token
    })
   }
}

export {teacherLogin}