import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import db from "../config/db.js";

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

function generateTokens(user) {
	const accessToken = jwt.sign({ userId: user.userId, role: user.role }, ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
	const refreshToken = jwt.sign({ userId: user.userId, role: user.role }, REFRESH_TOKEN_SECRET, {
		expiresIn: "30d",
	});

	return { accessToken, refreshToken };
}

export async function register(req, res) {
	// recieve info from user
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ error: "Invalid sign in credentials." });

	try {
		// check if email is already used
		const [user] = await db.query(
			`
			SELECT email
			FROM users
			WHERE email = ?
			`,
			[email]
		);

		// respond with error
		if (user.length > 0)
			return res
				.status(409)
				.json({ error: "Email address is already used.", isEmailAlreadyUsed: true });

		// encrypt password
		const hashedPassword = await bcrypt.hash(password, 8);

		// insert new account to db
		await db.query(
			`
			INSERT INTO users (email, password, role)
			VALUES (?, ?, ?)
			`,
			[email, hashedPassword, "student"] // values
		);

		// respond with success
		return res.status(200).json({ message: "Account registered." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}

export async function signIn(req, res) {
	// recieve info from user
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ error: "Invalid sign in credentials." });

	try {
		// check if email matches in db
		const [user] = await db.query(
			`
			SELECT userId, email, password, role
			FROM users
			WHERE email = ?
			`,
			[email] // value
		);

		// respond with error
		if (user.length === 0) return res.status(401).json({ error: "Invalid sign in credentials." });

		// check if passwords match
		const isPasswordMatched = await bcrypt.compare(password, user[0].password);

		// respond with error
		if (!isPasswordMatched) return res.status(401).json({ error: "Invalid sign in credentials." });

		// create tokens
		const { accessToken, refreshToken } = generateTokens(user[0]);

		// save refresh token as httpOnly cookie
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.ENV === "production",
			maxAge: 30 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
		});

		// respond with success
		return res.status(200).json({
			userId: user[0].userId,
			role: user[0].role,
			accessToken,
			message: "Account signed in.",
		});
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}

export function validateAccess(req, res) {
	const { userId, role } = req.user;
	if (!userId || !role) return res.status(401).json({ error: "Invalid token, user not authenticated." });

	return res.status(200).json({ userId, role, message: "Access validated." });
}

export function logOut(_, res) {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: process.env.ENV === "production",
		sameSite: "strict",
	});

	return res.status(200).json({ message: "Logged out successfully." });
}
