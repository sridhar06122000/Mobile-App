import Image from '../models/image.js';
import fs from 'fs';
import path from 'path';
import config from '../config/config.js';

class GetImageController {
    async getImages(req, res) {
        const bookingId = req?.query?.bookingId;

        try {
            const images = await Image.findAllByBookingId(bookingId);

            if (images.length === 0) {
                return res.status(404).json({ message: 'No images found for this bookingID' });
            }

            const baseUrl = `${req?.protocol}://${req?.get('host')}/uploads/`;
            const imagesWithFullPath = images.map(image => ({
                url: baseUrl + path?.basename(image.path)
            }));

            res.status(200).json(imagesWithFullPath);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    getImage(req, res) {
        const { filename } = req.params;
        const filepath = path.join(config.uploadDir, filename);

        if (fs.existsSync(filepath)) {
            res.sendFile(filepath);
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    }
}

export default new GetImageController();