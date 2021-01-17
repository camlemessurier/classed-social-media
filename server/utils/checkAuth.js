const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { AuthenticationError } = require("apollo-server");
dotenv.config();

module.exports = (context) => {
	const authHeader = context.req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];

		if (token) {
			try {
				const user = jwt.verify(token, process.env.SECRET_KEY);
				return user;
			} catch (err) {
				throw new AuthenticationError("Invalid/Expired Token");
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]'");
	}
	throw new Error("Authorizatio header must be preseneted");
};
