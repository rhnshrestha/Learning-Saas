import express, { Request, Router } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getCourses, getSingleCourse } from "../../../controller/institute/course/courseController";
import multer from "multer";
import {cloudinary, storage} from './../../../services/cloudinaryConfig'


const upload = multer({storage : storage,

    fileFilter : (req:Request, file:Express.Multer.File, cb)=>{
        const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedFileTypes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error ("Only image supported !!"))
        }
    },
    limits: {
        fileSize : 4 * 1024 * 1024
    }

})

const router:Router = express.Router()

router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(isLoggedIn,asyncErrorHandler(getCourses))

router.route("/:id")
.get(asyncErrorHandler(getSingleCourse))
.delete(asyncErrorHandler(deleteCourse))

export default router