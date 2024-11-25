import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";

AdminPage.propTypes = {
	email: PropTypes.string.isRequired,
};

export default function AdminPage({ email }) {
	return (
		<div className="">
			<Nav>
				<div className="w-full h-full bg-emerald-300">
					Admin
				</div>
			</Nav>
		</div>
	);
}
