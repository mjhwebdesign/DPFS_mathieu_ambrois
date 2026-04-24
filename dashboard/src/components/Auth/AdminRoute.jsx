import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default function AdminRoute({ children }) {
 const [status, setStatus] = useState("loading");

 useEffect(() => {
  const check = async () => {
   try {
    const res = await fetch(`${API_URL}/auth/me`, {
     credentials: "include",
    });

    if (res.status === 401) {
     setStatus("forbidden");
     return;
    }

    const data = await res.json();

    if (data.role !== 1) {
     setStatus("forbidden");
    } else {
     setStatus("allowed");
    }
   } catch (err) {
    setStatus("forbidden");
   }
  };

  check();
 }, []);

 if (status === "loading") return <p>Verificando acceso...</p>;

 if (status === "forbidden") {
  alert("No tenés permisos para acceder a esta sección");
  return <Navigate to="/" />;
 }

 return children;
}
