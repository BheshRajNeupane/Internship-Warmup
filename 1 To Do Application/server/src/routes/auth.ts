import { Router } from "express";
import { signup, signin, signout } from "../controller/auth.controller";
import { validateRequest } from "../middlewares/validate-request";
import { signinRequestionValidation } from "../validation/sigin.validation";
import { signupRequestionValidation } from "../validation/signup.validation";

const router: Router = Router();



/**
 * @openapi
 * /api/users/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signup
 *     description: Signup with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: your email
 *                 example: "rajbhesh566@gmail.com"
 *               password:
 *                 type: string
 *                 description: your passwoed
 *                 example: "pass1234566 "

 *     responses:
 *       201:
 *         description: Signup Sucess
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Bad Request- Invalid request body
 *       403:
 *         description: Forbidden- Not allowed to create user with the same email
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/users/signup", 
      signinRequestionValidation , 
     validateRequest,
     signup
);



/**
 * @openapi
 * /api/users/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signin
 *     description: Signin with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: your email
 *                 example: "rajbhesh566@gmail.com"
 *               password:
 *                 type: string
 *                 description: your passwoed
 *                 example: "pass1234566 "

 *     responses:
 *       201:
 *         description: Signup Sucess
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Bad Request- Invalid request body
 *       403:
 *         description: Forbidden- Not allowed to create user with the same email
 *       500:
 *         description: Internal Server Error
 */



router.post("/api/users/signin",
signupRequestionValidation,
validateRequest,
 signin);



/**
 * @openapi
 * /api/users/signout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Siginout
 *     description: Signout your account
 *     responses:
 *       200:
 *         description: Signup Sucess
 *       500:
 *         description: Internal Server Error
 */





router.post("/api/users/signout", signout);

export default router;
