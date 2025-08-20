import { useUser } from '@clerk/clerk-react';
import { createContext, useContext, useEffect, useState } from 'react';

export const FinancialRecordsContext = createContext(undefined);

export const FinancialRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user, isLoaded } = useUser();

  // Base API URL for local development
  const API_URL = "https://finance-track-dqer.onrender.com";

  // Fetch records when user is loaded
  const fetchRecord = async () => {
    if (!user || !user.id) {
      console.log("User not exist");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/getAllByUserID/${user.id}`);
      console.log("Response status: ", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched record:", data);
        setRecords(data);
      } else {
        console.error("Failed to fetch records:", response.status);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchRecord();
    }
  }, [isLoaded, user]);

  const addRecord = async (record) => {
    try {
      const response = await fetch(`${API_URL}/`, {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const updateRecord = async (id, newRecord) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => (record.userId === id ? updatedRecord : record))
        );
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deleted = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deleted._id)
        );
      }
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);
  if (!context) {
    throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
  }
  return context;
};

export default FinancialRecordsProvider;
