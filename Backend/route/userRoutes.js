const express = require('express');
const router = express.Router();
const { loginUserController, SignupUserController, getFounderFileById, registerFounderController, registerInvestorController, loginFounderController, loginInvestorController,forgotUserController,forgotFounderController,forgotInvestorController } = require('../controller/userController');
const uploadFounder = require('../middleware/uploadMiddleware');
const uploadInvestor = require('../middleware/uploadFounderMiddle');

router.post('/supporter/login', loginUserController);
router.post('/founder/login', loginFounderController);
router.post('/investor/login', loginInvestorController);
router.post('/supporter/register', SignupUserController);
router.post('/founder/register', uploadFounder.single('file'), registerFounderController);
router.post('/investor/register', uploadInvestor.single('file'), registerInvestorController);
router.post('/supporter/forgot-password',forgotUserController);
router.post('/founder/forgot-password',forgotFounderController);
router.post('/investor/forgot-password',forgotInvestorController);
router.get('/file/:id', getFounderFileById);


module.exports = router;
