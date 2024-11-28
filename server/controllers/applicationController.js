import db from "../config/db.js";

export async function getApplications(req, res) {
	// receive info from user
	const { lastDate, limit, page, sort } = req.query;

	// check if user is admin
	const { role } = req.user;
	if (role !== "admin") return res.status(403).json({ error: "Forbidden: Access denied." });

	// create query params
	const params = [];

	if (lastDate) params.push(lastDate);

	params.push(parseInt(limit, 10) || 10);
	params.push(((parseInt(page, 10) || 1) - 1) * (parseInt(limit, 10) || 10));

	const columns = [
		"applications.*",
		"students.givenName",
		"students.middleName",
		"students.familyName",
		"students.suffix",
	];

	try {
		// query for applications
		const [applications] = await db.query(
			`
				SELECT ${columns.join(", ")}
				FROM applications
				JOIN students
				ON applications.userId = students.userId
				${lastDate ? `WHERE dateSubmitted ${sort === "desc" ? "<" : ">"} ?` : ""}
				ORDER BY dateSubmitted ${sort === "desc" ? "DESC" : "ASC"}
				LIMIT ? OFFSET ?
			`,
			params
		);

		// reformat data for client
		const payload = applications.map((application) => ({
			userId: application.userId,
			fullName:
				application.familyName +
				", " +
				application.givenName +
				" " +
				application.middleName +
				" " +
				(application.suffix !== null ? application.suffix : ""),
			applicantType: application.applicantType,
			appliedProgram: application.preferredProgram,
			dateSubmitted: application.dateSubmitted.toISOString().split("T")[0],
			applicantStatus: application.applicantStatus,
		}));

		// count total pages
		const [totalRecords] = await db.query(
			`
				SELECT COUNT(*) AS totalCount
				FROM applications
			`
		);

		// respond with success
		return res
			.status(200)
			.json({ payload, totalPages: Math.ceil(totalRecords[0].totalCount / limit) });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}

export async function postApplication(req, res) {
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
