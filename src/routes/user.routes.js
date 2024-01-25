import {Router} from 'express';
import upload from '../middlewares/multer.middleware.js'
import { registerUser } from '../controllers/userRegistration.controller.js';
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

export default router
