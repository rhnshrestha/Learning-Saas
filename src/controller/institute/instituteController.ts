import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";
import IExtendedRequest from "../../middleware/type";
import User from "../../database/models/user.model";
import categories from "../../seed";

    const createInstitute = async(req: IExtendedRequest, res: Response, next:NextFunction)=>{
        const {instituteName, instituteEmail, institutePhoneNumber, instituteAddress} = req.body;
        const instituteVatNo = req.body.instituteVatNo || null; 
        const institutePanNo = req.body.institutePanNo || null; 
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message: "please provide institute name, email, address, phoneno, address"
            })
            return
        }


       const instituteNumber = generateRandomInstituteNumber();
       await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
       
            id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL,
            institutePhoneNumber VARCHAR(255) NOT NULL,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePanNo VARCHAR(255),
            instituteVatNo VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

            )`)

            await sequelize.query(`INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo) VALUES (?,?,?,?,?,?)`, {
            replacements: [
                instituteName,
                instituteEmail,
                institutePhoneNumber,
                instituteAddress,
                institutePanNo,
                instituteVatNo
            ]
            })

            await sequelize.query(`CREATE TABLE IF NOT EXISTS 
                user_institute(
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                userId VARCHAR(255) REFERENCES users(id),
                instituteNumber INT UNIQUE
                )`)
  

            if(req.user){
                 await sequelize.query(`INSERT INTO user_institute(userId, instituteNumber) VALUES(?,?)`,{
                    replacements:[
                        req.user.id,
                        instituteNumber
                    ]
            }) 
                await User.update({
                    currentInstituteNumber : instituteNumber,
                    role : "institute"

                },{
                    where : {
                        id : req.user.id,
                    }
                })
            }
            if(req.user){
                req.user.currentInstituteNumber = instituteNumber;
            }
            req.instituteNumber = instituteNumber;
        //    req.user?.instituteNumber= instituteNumber;
           next()
    }

const createTeacherTable = async (req:IExtendedRequest, res:Response, next:NextFunction) => {
    const instituteNumber = req.instituteNumber ;
    await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        teacherName VARCHAR(255) NOT NULL,
        teacherEmail VARCHAR(255) NOT NULL,
        teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        teacherExpertise VARCHAR(100),
        joinedDate DATE,
        salary VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
        next()
}

const createStudentTable = async(req:IExtendedRequest, res:Response, next:NextFunction)=>{
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS
        student_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        studentName VARCHAR(255) NOT NULL,
        studentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
        studentAddress TEXT,
        enrolledDate DATE,
        studentImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

        next()
}

const createCourseTable = async(req:IExtendedRequest, res:Response, next:NextFunction)=>{
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS
        course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE,
        coursePrice VARCHAR(255) NOT NULL ,
        courseDuration VARCHAR(100) NOT NULL,
        courseLevel ENUM('beginner', 'intermediate', 'advance') NOT NULL,
        courseThumbnail VARCHAR(200),
        courseDescription TEXT,
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber}(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

        res.status(200).json({
            message : "Institute course created",
            instituteNumber : instituteNumber
        
        })
}

const createCategoryTable = async(req:IExtendedRequest, res: Response, next:NextFunction)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS
        category_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        categoryName VARCHAR(100) NOT NULL,
        categoryDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`) 

        categories.forEach(async function(category){
            await sequelize.query(`INSERT INTO 
                category_${instituteNumber}(categoryName, categoryDescription) VALUES(?,?)`,{
                    replacements : [category.categoryName, category.categoryDescription]
                })
        })

        next()
}

export  {createInstitute,createTeacherTable, createStudentTable, createCourseTable, createCategoryTable }