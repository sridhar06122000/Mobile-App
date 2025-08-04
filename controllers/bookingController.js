import database from "../config/database.js";
import uploadImageController from "./uploadImageController.js";

class BookingController{

    async booking (req,res){

        try {

            let body = JSON.parse(req?.body?.data);

            let {senderName,senderEmail,senderPhoneNumber,senderCountry,senderCity,senderAddress,senderBranchName,senderPincode,shipmentType,paymentType} = body?.sender;

            let {receiverName,receiverEmail,receiverPhoneNumber,receiverCountry,receiverCity,receiverAddress,receiverBranchname,receiverPincode} = body?.receiver;

            let {numberOfPieces,totalGrossWeight, grossWeightOfPieces}=body?.shipmentdetail;

            let bookingStatusDetails = body?.bookingStatusDetails;

            if (!Array?.isArray(bookingStatusDetails)) {
                bookingStatusDetails = [bookingStatusDetails];
            }

            if (!Array?.isArray(grossWeightOfPieces)) {
                grossWeightOfPieces = [grossWeightOfPieces];
            }

            let bookingStatus = body?.bookingStatus;

            let amount = body?.amount;

            //process to get staff name
            const authKey   = req?.headers?.authorization;

            let staffnamevales = await database.executeQuery('SELECT status,name,city FROM sigin_details WHERE authKey = ?',[authKey]);

            let staffName;
            let staffCity;
            if(staffnamevales[0]?.status == 1){

                staffName = staffnamevales[0]?.name ;
                staffCity = staffnamevales[0]?.city;
            }

            const requiredFields = {senderName,senderEmail,senderPhoneNumber,senderCountry,senderCity,senderAddress,senderBranchName,senderPincode,shipmentType,paymentType,receiverName,receiverEmail,receiverPhoneNumber,receiverCountry,receiverCity,receiverAddress,receiverBranchname,receiverPincode,numberOfPieces,totalGrossWeight,grossWeightOfPieces,bookingStatus,staffName,amount};

            const emptyFields = Object?.keys(requiredFields)?.filter(key => (requiredFields?.[key] === 'null' && requiredFields?.[key] === 'undefined' && requiredFields?.[key] === ' '));

            if(emptyFields?.length > 0) {
                return res?.status(401)?.json({success : false, message : `Following fields are missing - ${emptyFields}`});
            }

            let value = 1000001;

            let cityCode = await database?.executeQuery('SELECT cityCode FROM city_details WHERE cityName = ?', [senderBranchName]);
            cityCode = cityCode[0]?.cityCode;
            let bookingId;
            let latestBookingId = await database?.executeQuery('SELECT bookingId FROM booking_details WHERE senderBranchName = ? ORDER BY bookingId DESC LIMIT 1', [senderBranchName]);

            if(latestBookingId.length==0){
               bookingId = cityCode+value;
            }
            else{
                latestBookingId =  parseInt(latestBookingId[0]?.bookingId?.substring(4));//CHEN1000001
                let newBookingId = latestBookingId+1
                bookingId = cityCode+newBookingId;
            }
                        
            const bookingFields =
            {senderName,senderEmail,senderPhoneNumber,senderCountry,senderCity,senderAddress,senderBranchName,senderPincode,shipmentType,paymentType,receiverName,receiverEmail,receiverPhoneNumber,receiverCountry,receiverCity,receiverAddress,receiverBranchname,receiverPincode,numberOfPieces,totalGrossWeight,grossWeightOfPieces,bookingStatus,bookingId,staffName,staffCity,amount};

            // const bookingStatusDetailField = {bookingStatusDetails,bookingId};

            // await database?.executeQuery('INSERT INTO booking_status_details SET ?',bookingStatusDetailField);
            await database?.executeQuery('INSERT INTO booking_details SET ?',bookingFields);

            req.bookingId = bookingId;

            // upload?.array('images', 10);

            const imageStatus = await uploadImageController?.uploadImages(req);

            return res.status(200)?.json({success :true ,data:bookingId,message : 'Data uploaded Successfully', imageUpload: imageStatus});
            
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error?.message});
        }

    }

    async postBookingstatus(req,res){
        try {

            let {bookingStatusDetails,bookingId}= req?.body;

            const requiredFields = {bookingStatusDetails,bookingId};

            const emptyFields = Object?.keys(requiredFields)?.filter(key => (requiredFields?.[key] === 'null' && requiredFields?.[key] === 'undefined' && requiredFields?.[key] === ' '));

            if(emptyFields?.length > 0) {
                return res?.status(401)?.json({success : false, message : `Following fields are missing - ${emptyFields}`});
            }

            // await database?.executeQuery('UPDATE booking_status_details SET ? WHERE bookingId ?',[bookingStatusDetails,bookingId]);

            return res.status(200)?.json({success :true ,data:bookingId,message : 'Data uploaded Successfully'});




            
        } catch (error) {
            return res?.status(401)?.json({success : false , message : error})

        }
    }

    async getAllBooking(req,res){
        try {
            let bookingId = req.query.bookingId;

            if(bookingId){

                let Bookingdetails = await database.executeQuery('SELECT * FROM booking_details WHERE bookingId =?',bookingId);

                let BookingStatusDetail = await database.executeQuery('SELECT * FROM booking_status_details WHERE bookingId =?',bookingId);

                let result = Bookingdetails + BookingStatusDetail;
                if(Bookingdetails.length<0){

                    return res?.status(200)?.json({success : true, data : result, message : "Data fetched successfully"});

                }

            }else{
                return res?.status(401)?.json({success : false,message : "bookingId id is not valid"});
            }
            
        } catch (error) {

            return res?.status(401)?.json({success : false , message : error});

        }
    }

    async getBookingId(req,res){

        try {

           let bookingIds = await database.executeQuery('SELECT bookingId,staffname,staffCity,amount FROM booking_details');

           if(bookingIds.length>0){

            return res?.status(200)?.json({success:true , data : bookingIds , message : "all Booking Id are getSuccessfully"});

           }
           else{

            return res?.status(401)?.json({success : false,message : "No bookingId is Present"});

           }

            
        } catch (error) {
            
            return res?.status(401)?.json({success : false , message : error});

        }
    }

    async getAllBookingIddetails(req,res){

        try {

            let bookingId = req?.query?.bookingId;

           let bookingdetails = await database.executeQuery('SELECT * FROM booking_details WHERE bookingId =?',bookingId);

           if(bookingdetails.length>0){

            return res?.status(200)?.json({success:true , data : bookingdetails , message : "all Booking Id are getSuccessfully"});

           }
           else{

            return res?.status(401)?.json({success : false,message : "No bookingId is Present"});

           }

            
        } catch (error) {
            
            return res?.status(401)?.json({success : false , message : error});

        }
    }
    async getBookingIdbyStaffCity(req,res){

        try {

           let staffCity = req.query.cityname;

           let bookingIds = await database.executeQuery('SELECT bookingId,staffname,staffCity,amount FROM booking_details WHERE senderCity = ? OR receiverCity = ?;',[staffCity,staffCity]);

           if(bookingIds.length>0){

            return res?.status(200)?.json({success:true , data : bookingIds , message : "booking ids based on cityname are getSuccessfully"});

           }
           else{

            return res?.status(401)?.json({success : false,message : "No bookingId is Present"});

           }

            
        } catch (error) {
            
            return res?.status(401)?.json({success : false , message : error});

        }
    }
    
}

export default new BookingController();