import db from "../config/db.js";

export async function postAppointment(req, res) {
	// recieve info from user
	const { appointmentType, appointmentDate } = req.body;
	const { userId } = req.user;
	if (!appointmentType || !appointmentDate || !userId)
		return res.status(401).json({ error: "Invalid request, complete credentials required." });

	try {
		const [appointment] = await db.query(
			`
			SELECT * FROM appointments 			
			WHERE userId = ? 
			AND appointmentStatus != "Completed"
			`,
			[userId]
		);

		if (appointment.length > 0)
			return res
				.status(401)
				.json({ error: "Invalid request, you can only schedule one appointment." });

		await db.query(
			`
			INSERT INTO appointments (userId, appointmentType, appointmentDate)
			VALUES (?, ?, ?)
			`,
			[userId, appointmentType, appointmentDate]
		);

		// respond with success
		return res
			.status(200)
			.json({ message: "You have successfully scheduled an appointment." });
	} catch (err) {
		// respond with error
		console.error(err);
		return res.status(500).json({ error: "Internal server error." });
	}
}
