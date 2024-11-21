import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(express.json());
server.use(
	cors({
		origin:
			process.env.ENV !== "production" ? "http://localhost:5173" : "https://cvsu-bacoor.vercel.app",
		methods: ["GET", "POST"],
		credentials: true,
	})
);

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	// waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

server.get("/", (_, res) => {
	res.json("good mourning.");
});

server.post("/api/register-student-account", async (req, res) => {
	// recieve info from user
	const { email, password } = req.body;

	try {
		// check if email is already used
		const [getAccount] = await db.query(
			`
			SELECT email
			FROM users
			WHERE email = ?
			`,
			[email]
		);

		// respond with error
		if (getAccount.length > 0) {
			return res.status(404).json({
				message: "Email address is already used.",
				isEmailAlreadyUsed: true,
			});
		}

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
		return res.status(500).json({ error: "An error occurred while querying the database." });
	}
});

server.post("/api/sign-in", async (req, res) => {
	// recieve info from user
	const { email, password } = req.body;

	try {
		// check if email matches in db
		const [getAccount] = await db.query(
			`
			SELECT email, password
			FROM users
			WHERE email = ?
			`,
			[email] // value
		);

		// respond with error
		if (getAccount.length === 0) {
			return res.status(404).json({ message: "Invalid sign in credentials." });
		}

		// check if passwords match
		const isPasswordMatched = await bcrypt.compare(password, getAccount[0].password);

		// respond with error
		if (!isPasswordMatched) {
			return res.status(404).json({ message: "Invalid sign in credentials." });
		}

		// respond with success
		return res.status(200).json({ message: "Account signed in." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "An error occurred while querying the database." });
	}
});

server.post("/api/submit-application", async (req, res) => {
	// recieve info from user
	const { email, formData } = req.body;

	// format data
	const applicationColumns = ["applicantType", "preferredProgram"];
	const applicationValues = [formData.applicantType, formData.preferredProgram];

	const studentColumns = [
		"givenName",
		"middleName",
		"familyName",
		"suffix",
		"sexAtBirth",
		"dateOfBirth",
		"civilStatus",
		"contactNum",
		"religion",
		"nationality",
		"addressLine1",
		"addressLine2",
		"city",
		"stateProvinceRegion",
		"postalCode",
		"country",
		"disability",
		"indigenousGroup",
		"numOfSiblings",
		"incomeBracket",
	];
	const studentValues = [
		formData.givenName,
		formData.middleName,
		formData.familyName,
		formData.suffix,
		formData.sexAtBirth,
		formData.dateOfBirth,
		formData.civilStatus,
		formData.contactNum,
		formData.religion,
		formData.nationality,
		formData.addressLine1,
		formData.addressLine2,
		formData.city,
		formData.stateProvinceRegion,
		formData.postalCode,
		formData.country,
		formData.disability,
		formData.indigenousGroup,
		formData.numOfSiblings,
		formData.incomeBracket,
	];

	const familyColumns = [
		"familyType",
		"familyName",
		"contactNum",
		"occupation",
	];
	const fatherValues = [
		formData.fatherName,
		formData.fatherContactNum,
		formData.fatherOccupation,
	];
	const motherValues = [
		formData.motherName,
		formData.motherContactNum,
		formData.motherOccupation,
	];
	const guardianValues = [
		formData.guardianName,
		formData.guardianContactNum,
		formData.guardianOccupation,
	];

	const educationColumns = [
		"level",
		"schoolName",
		"schoolAddress",
		"schoolType",
		"yearGraduated",
	];
	const elementaryValues = [
		formData.elementarySchoolName,
		formData.elementarySchoolAddress,
		formData.elementarySchoolType,
		formData.elementaryYearGraduated,
	];
	const juniorHighValues = [
		formData.juniorHighSchoolName,
		formData.juniorHighSchoolAddress,
		formData.juniorHighSchoolType,
		formData.juniorHighYearGraduated,
	];
	const seniorHighValues = [
		formData.seniorHighSchoolName,
		formData.seniorHighSchoolAddress,
		formData.seniorHighSchoolType,
		formData.seniorHighYearGraduated,
	];

	try {
		const [getUserID] = await db.query(
			`
			SELECT userID
			FROM users
			WHERE email = ?
			`,
			[email]
		);

		// respond with error
		if (getUserID.length === 0) {
			return res.status(404).json({ message: "Invalid email, user not found." });
		}

		// application
		await db.query(
			`
			INSERT INTO applications (userID, ${applicationColumns.join(", ")})
			VALUES (?, ${applicationValues.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, ...applicationValues]
		);

		// students
		await db.query(
			`
			INSERT INTO students (userID, ${studentColumns.join(", ")})
			VALUES (?, ${studentValues.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, ...studentValues]
		);

		// family
		await db.query(
			`
			INSERT INTO family (userID, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, "father", ...fatherValues]
		);
		await db.query(
			`
			INSERT INTO family (userID, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, "mother", ...motherValues]
		);
		await db.query(
			`
			INSERT INTO family (userID, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, "guardian", ...guardianValues]
		);

		// education
		await db.query(
			`
			INSERT INTO education (userID, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, "elementary", ...elementaryValues]			
		);
		await db.query(
			`
			INSERT INTO education (userID, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, "juniorHigh", ...juniorHighValues]			
		);
		await db.query(
			`
			INSERT INTO education (userID, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[getUserID[0].userID, "seniorHigh", ...seniorHighValues]			
		);
		
		// respond with success
		return res.status(200).json({ message: "You have successfully submitted your application." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "An error occurred while querying the database." });
	}
});

server.listen(8080, () => {
	console.log("Connected to the server.");
});
