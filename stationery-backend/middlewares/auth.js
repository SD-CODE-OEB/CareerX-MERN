import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
configDotenv()
const SECRET_KEY = process.env.SECRET_JWT_KEY

const authorize = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, SECRET_KEY)
            req.userId = user._id
            req.role = user.role
            next();
        }
        else {
            res.status(500).json({ message: " Unauthorized access" });
        }
    } catch (error) {
        res.send(error).json({ message: "Unauthorized" })
    }
}
export default authorize