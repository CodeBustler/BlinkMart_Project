import { MyContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const { admin } = useContext(MyContext);
	const navigate = useNavigate();

	return (
		<>{admin ? <div>Dashboard</div> : (navigate("/login"), navigate(0))}</>
	);
}

export default Dashboard;
