import database from '../config/database.js';

class Image {
    static async create(imageData) {
        const query = 'INSERT INTO images (bookingId, path, originalName) VALUES (?, ?, ?)';
        const values = [imageData?.bookingId, imageData?.path, imageData?.originalName];
        return database?.executeQuery(query, values);
    }

    static async findAllByBookingId(bookingId) {
        return database?.executeQuery('SELECT path FROM images WHERE bookingId = ?', [bookingId]);
    }
}

export default Image;