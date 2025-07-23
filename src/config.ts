import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        port: process.env.PORT,
        env: process.env.ENV,
        appName: process.env.APP_NAME,
        database: {
            uri: process.env.MONGODB_URI
        },
        apiKey: process.env.API_KEY,
        jwtSecret: process.env.JWT_SECRET,
        encryptionKey: process.env.ENCRYPTION_KEY,
        iv: process.env.IV,
    }
});