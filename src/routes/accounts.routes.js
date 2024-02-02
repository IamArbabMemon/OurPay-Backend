import {Router} from express;
import verifyAccessToken from "../middlewares/authentication.middleware.js";
import { checkBalance ,depositAmount} from "../controllers/accounts.controller.js";

const router = Router();

router.route('/getBalance').get(verifyAccessToken,checkBalance);
router.route('/deposit').post(verifyAccessToken,depositAmount);

export default router;

