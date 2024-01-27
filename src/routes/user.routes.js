import {Router} from 'express';
import upload from '../middlewares/multer.middleware.js'
import { registerUser,userLogin } from '../controllers/user.controller.js';
const router = Router();

router.route("/register").post(
    upload.fields([
    {
        name:'nicFrontPic',
        maxCount:1
    },

    {
        name:'nicBackPic',
        maxCount:1
    }
]),

registerUser
);

router.route("/login").post(userLogin);

export default router
