import db from "../config/db.js";

export async function getApplicantInfo(req, res) {
	// receive info from user
	const { userId } = req.user;

	try {
		// check if user exists
		const [user] = await db.query(
			`
				SELECT *
				FROM users
				WHERE userId = ?
			`,
			userId
		);

		// respond with error
		if (user.length === 0) return res.status(404).json({ error: "User is not found." });

		// query for application info
		const [application] = await db.query(
			`
			SELECT *
			FROM applications
			WHERE userId = ?
			`,
			userId
		);

		// query for student info
		const [student] = await db.query(
			`
			SELECT *
			FROM students
			WHERE userId = ?
			`,
			userId
		);

		// query for family info
		const [father] = await db.query(
			`
			SELECT *
			FROM family
			WHERE userId = ? AND familyType = "Father"
			`,
			userId
		);
		const [mother] = await db.query(
			`
			SELECT *
			FROM family
			WHERE userId = ? AND familyType = "Mother"
			`,
			userId
		);
		const [guardian] = await db.query(
			`
			SELECT *
			FROM family
			WHERE userId = ? AND familyType = "Guardian"
			`,
			userId
		);

		// query for education info
		const [elementary] = await db.query(
			`
				SELECT *
				FROM education
				WHERE userId = ? AND level = "Elementary"
			`,
			userId
		);
		const [juniorHigh] = await db.query(
			`
				SELECT *
				FROM education
				WHERE userId = ? AND level = "Junior High"
			`,
			userId
		);
		const [seniorHigh] = await db.query(
			`
			SELECT *
			FROM education
			WHERE userId = ? AND level = "Senior High"
			`,
			userId
		);

		// format data for client
		const info = {
			applicantType: application[0].applicantType,
			preferredProgram: application[0].preferredProgram,
			applicantStatus: application[0].applicantStatus,
			dateSubmitted: application[0].dateSubmitted,
			//
			givenName: student[0].givenName,
			middleName: student[0].middleName,
			familyName: student[0].familyName,
			suffix: student[0].suffix,
			sexAtBirth: student[0].sexAtBirth,
			dateOfBirth: student[0].dateOfBirth,
			civilStatus: student[0].civilStatus,
			contactNum: student[0].contactNum,
			religion: student[0].religion,
			nationality: student[0].nationality,
			addressLine1: student[0].addressLine1,
			addressLine2: student[0].addressLine2,
			city: student[0].city,
			stateProvinceRegion: student[0].stateProvinceRegion,
			postalCode: student[0].postalCode,
			country: student[0].country,
			disability: student[0].disability,
			indigenousGroup: student[0].indigenousGroup,
			numOfSiblings: student[0].numOfSiblings,
			incomeBracket: student[0].incomeBracket,
			profileImageLink: student[0].profileImageLink,
			//
			fatherName: father[0].familyName,
			fatherContactNum: father[0].contactNum,
			fatherOccupation: father[0].occupation,
			motherName: mother[0].familyName,
			motherContactNum: mother[0].contactNum,
			motherOccupation: mother[0].occupation,
			guardianName: guardian[0].familyName,
			guardianContactNum: guardian[0].contactNum,
			guardianOccupation: guardian[0].occupation,
			//
			elementarySchoolName: elementary[0].schoolName,
			elementarySchoolAddress: elementary[0].schoolAddress,
			elementarySchoolType: elementary[0].schoolType,
			elementaryYearGraduated: elementary[0].yearGraduated,
			juniorHighSchoolName: juniorHigh[0].schoolName,
			juniorHighSchoolAddress: juniorHigh[0].schoolAddress,
			juniorHighSchoolType: juniorHigh[0].schoolType,
			juniorHighYearGraduated: juniorHigh[0].yearGraduated,
			seniorHighSchoolName: seniorHigh[0].schoolName,
			seniorHighSchoolAddress: seniorHigh[0].schoolAddress,
			seniorHighSchoolType: seniorHigh[0].schoolType,
			seniorHighYearGraduated: seniorHigh[0].yearGraduated,
			// colegeSchoolName: college[0].schoolName,
			// colegeSchoolAddress: college[0].schoolAddress,
			// colegeSchoolType: college[0].schoolType,
			// colegeYearGraduated: college[0].yearGraduated,
		};

		// respond with success
		return res.status(200).json({ info, message: "Applicant info found." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}

export async function getStudentInfo(req, res) {
	// receive info from user
	const { userId } = req.user;

	try {
		// check if user exists
		const [user] = await db.query(
			`
				SELECT *
				FROM users
				WHERE userId = ?
			`,
			userId
		);

		// respond with error
		if (user.length === 0) return res.status(404).json({ error: "User is not found." });

		// query for student info
		const [student] = await db.query(
			`
			SELECT *
			FROM students
			WHERE userId = ?
			`,
			userId
		);

		// query for family info
		const [father] = await db.query(
			`
			SELECT *
			FROM family
			WHERE userId = ? AND familyType = "father"
			`,
			userId
		);
		const [mother] = await db.query(
			`
			SELECT *
			FROM family
			WHERE userId = ? AND familyType = "mother"
			`,
			userId
		);
		const [guardian] = await db.query(
			`
			SELECT *
			FROM family
			WHERE userId = ? AND familyType = "guardian"
			`,
			userId
		);

		// query for education info
		const [elementary] = await db.query(
			`
				SELECT *
				FROM education
				WHERE userId = ? AND level = "elementary"
			`,
			userId
		);
		const [juniorHigh] = await db.query(
			`
				SELECT *
				FROM education
				WHERE userId = ? AND level = "juniorHigh"
			`,
			userId
		);
		const [seniorHigh] = await db.query(
			`
			SELECT *
			FROM education
			WHERE userId = ? AND level = "seniorHigh"
			`,
			userId
		);

		// format data for client
		const info = {
			givenName: student[0].givenName,
			middleName: student[0].middleName,
			familyName: student[0].familyName,
			suffix: student[0].suffix,
			sexAtBirth: student[0].sexAtBirth,
			dateOfBirth: student[0].dateOfBirth,
			civilStatus: student[0].civilStatus,
			contactNum: student[0].contactNum,
			religion: student[0].religion,
			nationality: student[0].nationality,
			addressLine1: student[0].addressLine1,
			addressLine2: student[0].addressLine2,
			city: student[0].city,
			stateProvinceRegion: student[0].stateProvinceRegion,
			postalCode: student[0].postalCode,
			country: student[0].country,
			disability: student[0].disability,
			indigenousGroup: student[0].indigenousGroup,
			numOfSiblings: student[0].numOfSiblings,
			incomeBracket: student[0].incomeBracket,
			academicStatus: student[0].academicStatus,
			program: student[0].program,
			profileImageLink: student[0].profileImageLink,
			//
			fatherName: father[0].familyName,
			fatherContactNum: father[0].contactNum,
			fatherOccupation: father[0].occupation,
			motherName: mother[0].familyName,
			motherContactNum: mother[0].contactNum,
			motherOccupation: mother[0].occupation,
			guardianName: guardian[0].familyName,
			guardianContactNum: guardian[0].contactNum,
			guardianOccupation: guardian[0].occupation,
			//
			elementarySchoolName: elementary[0].schoolName,
			elementarySchoolAddress: elementary[0].schoolAddress,
			elementarySchoolType: elementary[0].schoolType,
			elementaryYearGraduated: elementary[0].yearGraduated,
			juniorHighSchoolName: juniorHigh[0].schoolName,
			juniorHighSchoolAddress: juniorHigh[0].schoolAddress,
			juniorHighSchoolType: juniorHigh[0].schoolType,
			juniorHighYearGraduated: juniorHigh[0].yearGraduated,
			seniorHighSchoolName: seniorHigh[0].schoolName,
			seniorHighSchoolAddress: seniorHigh[0].schoolAddress,
			seniorHighSchoolType: seniorHigh[0].schoolType,
			seniorHighYearGraduated: seniorHigh[0].yearGraduated,
			// colegeSchoolName: college[0].schoolName,
			// colegeSchoolAddress: college[0].schoolAddress,
			// colegeSchoolType: college[0].schoolType,
			// colegeYearGraduated: college[0].yearGraduated,
		};

		// respond with success
		return res.status(200).json({ info, message: "Student info found." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}

export async function getApplications(req, res) {
	// receive info from user
	const { lastDate, limit, page, sort } = req.query;

	// check if user is admin
	const { role } = req.user;
	if (role !== "Admin") return res.status(403).json({ error: "Forbidden: Access denied." });

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

		// format data for client
		const payload = applications.map((application) => ({
			userId: application.userId,
			fullName:
				application.familyName +
				", " +
				application.givenName +
				" " +
				application.middleName +
				(application.suffix !== null ? " " + application.suffix : ""),
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
			[userId, "Father", ...fatherValues]
		);
		await db.query(
			`
			INSERT INTO family (userId, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[userId, "Mother", ...motherValues]
		);
		await db.query(
			`
			INSERT INTO family (userId, ${familyColumns.join(", ")})
			VALUES (?, ${familyColumns.map(() => "?").join(", ")})
			`,
			[userId, "Guardian", ...guardianValues]
		);

		// education
		await db.query(
			`
			INSERT INTO education (userId, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[userId, "Elementary", ...elementaryValues]
		);
		await db.query(
			`
			INSERT INTO education (userId, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[userId, "Junior High", ...juniorHighValues]
		);
		await db.query(
			`
			INSERT INTO education (userId, ${educationColumns.join(", ")})
			VALUES (?, ${educationColumns.map(() => "?").join(", ")})
			`,
			[userId, "Senior High", ...seniorHighValues]
		);

		const [application] = await db.query(
			`
			SELECT applicationId
			FROM applications
			WHERE userId = ? 
			AND ${applicationColumns.map((column) => `${column} = ?`).join(" AND ")}
			`,
			[userId, ...applicationValues]
		);

		const controlNum = `CN-${Date.now()}-${application[0].applicationId}`;

		await db.query(
			`
			UPDATE users
			SET controlNum = ?
			WHERE userId = ?
			`,
			[controlNum, userId]
		);

		// respond with success
		return res
			.status(200)
			.json({ controlNum, message: "You have successfully submitted your application." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}
