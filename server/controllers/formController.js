import db from "../config/db.js";

export async function submitApplication(req, res) {
	// recieve info from user
	const { formData } = req.body;
	const { userId } = req.user;
	if (!formData || !userId)
		return res.status(401).json({ error: "Invalid request, complete credentials required." });

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

	const familyColumns = ["familyType", "familyName", "contactNum", "occupation"];
	const fatherValues = [formData.fatherName, formData.fatherContactNum, formData.fatherOccupation];
	const motherValues = [formData.motherName, formData.motherContactNum, formData.motherOccupation];
	const guardianValues = [
		formData.guardianName,
		formData.guardianContactNum,
		formData.guardianOccupation,
	];

	const educationColumns = ["level", "schoolName", "schoolAddress", "schoolType", "yearGraduated"];
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
		// application
		await db.query(
			`
			INSERT INTO applications (userId, ${applicationColumns.join(", ")})
			VALUES (?, ${applicationValues.map(() => "?").join(", ")})
			`,
			[userId, ...applicationValues]
		);

		// students
		await db.query(
			`
			INSERT INTO students (userId, ${studentColumns.join(", ")})
			VALUES (?, ${studentValues.map(() => "?").join(", ")})
			`,
			[userId, ...studentValues]
		);

		// family
		await db.query(
			`
			INSERT INTO family (userId, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[userId, "father", ...fatherValues]
		);
		await db.query(
			`
			INSERT INTO family (userId, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[userId, "mother", ...motherValues]
		);
		await db.query(
			`
			INSERT INTO family (userId, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[userId, "guardian", ...guardianValues]
		);

		// education
		await db.query(
			`
			INSERT INTO education (userId, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[userId, "elementary", ...elementaryValues]
		);
		await db.query(
			`
			INSERT INTO education (userId, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[userId, "juniorHigh", ...juniorHighValues]
		);
		await db.query(
			`
			INSERT INTO education (userId, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[userId, "seniorHigh", ...seniorHighValues]
		);

		// respond with success
		return res.status(200).json({ message: "You have successfully submitted your application." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}
