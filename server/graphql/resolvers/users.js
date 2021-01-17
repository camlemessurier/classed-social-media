const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserInputError } = require("apollo-server");
const {
	validateLoginInput,
	validateRegisterInput,
} = require("../../utils/validators");

dotenv.config();

function generateToken(res) {
	return jwt.sign(
		{
			id: res.id,
			email: res.email,
			username: res.username,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "1h" }
	);
}

module.exports = {
	Mutation: {
		async login(parents, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });
			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("Wrong creds", { errors });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = "Wrong credentials";
				throw new UserInputError("Wrong creds", { errors });
			}

			const token = generateToken(user);
			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		async register(
			parents,
			{ registerInput: { username, email, password, confirmPassword } }
		) {
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError("Username already exists", {
					errors: {
						username: "This username is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
