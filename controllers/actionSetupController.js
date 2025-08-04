import entryPointController from './entryPointController.js';

class ActionSetupController {

    login (req, res) {
        req.apiAction = 'LOGIN';
        entryPointController?.rest(req, res);
    }

    signup (req, res) {
        req.apiAction = 'SIGNUP';
        entryPointController?.rest(req, res);
    }

    getActiveInactiveList (req, res) {
        req.apiAction = 'ACTIVEINACTIVELIST';
        entryPointController?.rest(req, res);
    }

    fetchAndUpdateStaffUserList (req, res) {
        req.apiAction = 'FETCHANDUPDATE';
        entryPointController?.rest(req, res);
    }

    booking(req,res){
        req.apiAction = 'BOOKING';
        entryPointController?.rest(req,res);
    }

    postCity(req,res){
        req.apiAction = 'POSTCITY';
        entryPointController?.rest(req,res);
    }

    getCity(req,res){
        req.apiAction = 'GETCITY';
        entryPointController?.rest(req,res);
    }

    deleteCity(req,res){
        req.apiAction = 'DELETECITY';
        entryPointController?.rest(req,res);
    }

    logout (req, res) {
        req.apiAction = 'LOGOUT';
        entryPointController?.rest(req, res);
    }

    getImage (req, res) {
        req.apiAction = 'GETIMAGE';
        entryPointController?.rest(req, res);
    }

    fetchAndUpdateShipmentDetails (req, res) {
        req.apiAction = 'SHIPMENT';
        entryPointController?.rest(req, res);
    }

    fetchAndUpdatePaymentDetails (req, res) {
        req.apiAction = 'PAYMENT';
        entryPointController?.rest(req, res);
    }

    getBookingId(req,res){
        req.apiAction = 'GETBOOKINGID';
        entryPointController?.rest(req,res);
    }

    getAllBookingDetail(req,res){
        req.apiAction = 'GETALLBOOKINGDATA';
        entryPointController?.rest(req,res);
    }

    getAllbookingIddetails(req,res){
        req.apiAction = 'GETALLBOOKINGIDDETAILS';
        entryPointController?.rest(req,res);
    }

    getBookingIdbyStaffCity(req,res){
        req.apiAction = 'GETBOOKINGIDBYSTAFFCITY';
        entryPointController?.rest(req,res);
    }

    postBookingStatus(req,res){
        req.apiAction = 'POSTBOOKINGSTATUS';
        entryPointController?.rest(req,res);
    }

    getPincodeDetails(req,res){
        req.apiAction = 'GETPINCODEDETAILS';
        entryPointController?.rest(req,res);
    }
}

export default new ActionSetupController();