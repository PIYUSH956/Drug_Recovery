import express from 'express';
import { register ,login} from '../controllers/auth';
import { therapist } from '../controllers/auth';
const router = express.Router();

// router.get("/:message",showMessage)
router.post("/register",register)

router.post("/login",login)

router.get("/therapist",therapist)


module.exports = router;