const express = require('express');
const router = express.Router();
const { loginUserController, SignupUserController, getFounderFileById, registerFounderController, registerInvestorController, loginFounderController, loginInvestorController, forgotUserController, forgotFounderController, forgotInvestorController, getFounderAuthenticate, getInvestorAuthenticate } = require('../controller/userController');
const getUploader = require('../middleware/getUploaderMiddleware');
const uploadFounderProof = getUploader('founder');
const uploadInvestorProof = getUploader('investor');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/supporter/login', loginUserController);
router.post('/founder/login', loginFounderController);
router.post('/investor/login', loginInvestorController);
router.post('/supporter/register', SignupUserController);
router.post('/founder/register', uploadFounderProof.single('file'), registerFounderController);
router.post('/investor/register', uploadInvestorProof.single('file'), registerInvestorController);
router.post('/supporter/forgot-password', forgotUserController);
router.post('/founder/forgot-password', forgotFounderController);
router.post('/investor/forgot-password', forgotInvestorController);
router.get('/file/:id', getFounderFileById);
router.get('/getfounderauthenticate', authMiddleware, getFounderAuthenticate);
router.get('/getinvestorauthenticate', authMiddleware, getInvestorAuthenticate);

module.exports = router;
