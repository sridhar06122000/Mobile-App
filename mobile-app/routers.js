import express from 'express';
import actionSetupController from './controllers/actionSetupController.js';
import upload from './config/multerConfig.js';

const router = express?.Router();

router?.all('/login', actionSetupController?.login);
router?.all('/signup', actionSetupController?.signup);
router?.all('/activeInactiveList', actionSetupController?.getActiveInactiveList);
router?.all('/staffUserData', actionSetupController?.fetchAndUpdateStaffUserList);
router?.all('/booking',upload?.array('images', 10), actionSetupController?.booking);
router?.all('/postCity',actionSetupController?.postCity);
router?.all('/getCity',actionSetupController?.getCity);
router?.all('/deleteCity',actionSetupController?.deleteCity);
router?.all('/logout', actionSetupController?.logout);
router?.all('/getBookingImages', actionSetupController?.getImage);
router?.all('/shipmentType', actionSetupController?.fetchAndUpdateShipmentDetails);
router?.all('/paymentType', actionSetupController?.fetchAndUpdatePaymentDetails);
router?.all('/getBookingId',actionSetupController.getBookingId);
router?.all('/getAllBookingDetail',actionSetupController?.getAllBookingDetail);
router?.all('/postBookingStatus',actionSetupController?.postBookingStatus);
router?.all('/getPincodeDetails',actionSetupController?.getPincodeDetails);
router?.all('/getAllBookingIddetails',actionSetupController?.getAllbookingIddetails);

router?.all('/getBookingIdbyStaffCity',actionSetupController?.getBookingIdbyStaffCity);

export default router;