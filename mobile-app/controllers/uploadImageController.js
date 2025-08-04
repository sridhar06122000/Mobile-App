import Image from '../models/image.js';

class UploadImageController {
    async uploadImages(req) {
        const bookingId = req?.bookingId;
        const files = req?.files;

        if (!files || files.length === 0) {
            return {imageStatus: 'Please upload files.'};
        }

        try {
            const imageRecords = files?.map(file => ({
                bookingId,
                path: file?.path,
                originalName: file?.originalname
            }));

            for (const imageRecord of imageRecords) {
                await Image?.create(imageRecord);
            }

            return {
                imageStatus: {
                    message: 'Files uploaded successfully',
                    files: files.map(file => file?.filename)
                }
            };
        }
        catch (error) {
            return {imageStatus: error?.message};
        }
    }
}

export default new UploadImageController();