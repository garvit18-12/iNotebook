var jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({error:`Please Authenticate using a valid token ;;';'  ${error}`})
    }
}

module.exports = fetchuser