import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import api from "../api";

const UserProfile = () => {
  const location = useLocation();
  const userNumber = location.state?.userNumber;
  console.log(userNumber);
  const [crewDetails, setCrewDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const response = await api.get(`api/crew/${userNumber}/`);
        // This is initial loading employees ...
        // firstly the alloted values will be null, after the use the schedule method, it will change as discussed
        // yeah that is fine!
        setCrewDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching employee data!", error);
      }
    };

    fetchCrew();
  }, []); // Run once when the component mounts

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-6">
        DTC Delhi Crew Details
      </h1>
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg mb-24 mt-6">
        <h2 className="text-3xl font-bold text-center text-white mb-6 bg-indigo-600 rounded-md">
          Profile
        </h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form className="space-y-4">
            {[
              { label: "Crew ID", value: crewDetails.crew_id },
              { label: "Name", value: crewDetails.name },
              { label: "Age", value: crewDetails.age },
              { label: "Phone Number", value: crewDetails.phone },
              { label: "Join Date", value: crewDetails.join_date },
              { label: "Role", value: crewDetails.role },
              {
                label: "Years of Experience",
                value: crewDetails.years_of_experience,
              },
              { label: "Assigned Bus ID", value: crewDetails.assigned_bus_id },
              {
                label: "Assigned Route ID",
                value: crewDetails.assigned_route_id,
              },
              {
                label: "Shift Start Time",
                value: crewDetails.shift_start_time,
              },
              { label: "Shift End Time", value: crewDetails.shift_end_time },
            ].map((detail, index) => (
              <div key={index} className="flex items-center">
                <div className="w-1/3 p-2 bg-blue-100 rounded-md">
                  <span className="font-medium text-gray-700">
                    {detail.label}:
                  </span>
                </div>
                <input
                  type="text"
                  value={detail.value || "Na"} // Display data from backend
                  className="mt-1 ml-4 p-2 w-2/3 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                  readOnly
                />
              </div>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
