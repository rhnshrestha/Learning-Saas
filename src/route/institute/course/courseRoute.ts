import express, { Request, Router } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getCourses, getSingleCourse } from "../../../controller/institute/course/courseController";

import upload from "../../../middleware/multerUpload";

const router:Router = express.Router()

router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(isLoggedIn,asyncErrorHandler(getCourses))

router.route("/:id")
.get(asyncErrorHandler(getSingleCourse))
.delete(asyncErrorHandler(deleteCourse))

export default router