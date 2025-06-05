import { useEffect, useState } from "react";
import api from "../../../api";

const UsersTab = () => {
    const [applications, setApplications] = useState([]);
	const [errors, setErrors] = useState([]);

    const fetchApplications = async () => {
		try {
			const res = await api.get("/application/pending");
			setApplications(res.data.applications);
		} catch (error) {
			setErrors(["Nie udało się pobrać aplikacji."]);
		}
	};

    useEffect(() => {
		fetchApplications();
	}, []);

    const handleAccept = async (id) => {
		try {
			await api.post(`/application/${id}/accept`);
			await fetchApplications(); // odśwież dane
		} catch (error) {
			setErrors([error?.response?.data?.message || "Błąd podczas akceptacji."]);
		}
	};

    const handleReject = async (id) => {
		try {
			await api.post(`/application/${id}/reject`);
			await fetchApplications();
		} catch (error) {
			setErrors([error?.response?.data?.message || "Błąd podczas odrzucenia."]);
		}
	};

    return (
		<div className="admin-tab-content">
			<h3>Nowe wnioski o rejestrację schroniska</h3>

			{errors.length > 0 && (
				<div className="admin-errors">
					{errors.map((err, index) => (
						<p key={index} style={{ color: "red" }}>{err}</p>
					))}
				</div>
			)}

			<div className="table-container">
				<table className="shelter-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Schronisko - nazwa</th>
							<th>Schronisko - miasto</th>
							<th>Email schroniska</th>
							<th>Moderator</th>
							<th>Email moderatora</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{applications.length > 0 ? (
							applications.map((app) => (
								<tr key={app.id_application}>
									<td>{app.id_application}</td>
									<td>{app.shelter_name}</td>
									<td>{app.shelter_city}</td>
									<td>{app.shelter_email}</td>
									<td>{`${app.moderator_firstname} ${app.moderator_lastname}`}</td>
									<td>{app.moderator_email}</td>
									<td>
										<button onClick={() => handleAccept(app.id_application)}>Akceptuj</button>
										<button onClick={() => handleReject(app.id_application)} style={{ marginLeft: "10px" }}>Odrzuć</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="7">Brak oczekujących wniosków.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UsersTab;
