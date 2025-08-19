import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import { API_ENDPOINTS } from "../utils/api";

function Profile() {
  const { token } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUsername(data.username);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <h2>Welcome, {username || "Loading..."}</h2>
      )}
    </div>
  );
}

export default Profile;
