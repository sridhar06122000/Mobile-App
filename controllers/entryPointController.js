import activeInactiveController from './activeInactiveController.js';
import loginSignupController from './loginSignupController.js';
import fetchAndUpdateStaffUserController from './fetchAndUpdateStaffUserController.js';
import logoutController from './logoutController.js';
import bookingController from './bookingController.js';
import cityController from './cityController.js';
import getImageController from './getImageController.js';
import shipmentController from './shipmentController.js';
import paymentController from './paymentController.js';
import pincodeController from './pincodeController.js';

class EntryPointController {

    rest (req, res) {

        const apiAction = req?.apiAction;

        switch (apiAction) {
            case 'LOGIN':
                loginSignupController?.login(req, res);
                break;

            case 'SIGNUP':
                loginSignupController?.signup(req, res);
                break;

            case 'ACTIVEINACTIVELIST':
                activeInactiveController?.stepUpController(req, res);
                break;

            case 'FETCHANDUPDATE':
                fetchAndUpdateStaffUserController?.stepUpController(req, res);
                break;

            case 'BOOKING':
                bookingController?.booking(req,res);
                break;
            
            case 'POSTCITY':
                cityController?.postCity(req,res);
                break;

            case 'GETCITY':
                cityController?.getCity(req,res);
                break;
  
            case 'DELETECITY':
                cityController?.deleteCity(req,res);
                break;

            case 'LOGOUT':
                logoutController?.logout(req, res);
                break;

            case 'GETIMAGE':
                getImageController?.getImages(req, res);
                break;

            case 'SHIPMENT':
                shipmentController?.stepUpController(req, res);
                break;

            case 'PAYMENT':
                paymentController?.stepUpController(req, res);
                break;

            case 'GETBOOKINGID':
                bookingController?.getBookingId(req,res);
                break;

            case 'GETALLBOOKINGDATA':
                bookingController?.getAllBooking(req,res);
                break;

            case 'GETBOOKINGIDBYSTAFFCITY':
                bookingController?.getBookingIdbyStaffCity(req,res);
                break;

            case 'POSTBOOKINGSTATUS':
                bookingController?.postBooingstatus(req,res);
                break;

            case 'GETPINCODEDETAILS':
                pincodeController?.getPincodedetails(req,res);
                break;

            case   'GETALLBOOKINGIDDETAILS':
                bookingController?.getAllBookingIddetails(req,res);
                break;
        
            default:
                break;
        }
    }
}

export default new EntryPointController();