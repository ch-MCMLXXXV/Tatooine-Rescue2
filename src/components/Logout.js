import React from "react";
import { useHistory } from "react-router-dom";

const Logout = ({setIsLoggedIn, setToken }) => {
    const navigate = useHistory();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken();
        alert("You have successfully logged out.");
        navigate("/")
    };

    return (
        <div ClassName="title">
            <h1>See you next time!</h1>
            <button className="logout-button" onClick={handleLogout}>
                Click here to log out.
            </button>
        </div>
    );
};

export default Logout;