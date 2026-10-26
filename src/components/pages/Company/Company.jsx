import { Navigate } from "react-router-dom";

// Preserve the old component API for historical company links.
export default function Company({ company }) {
  const anchor = company === "kailor" ? "kailor" : "kailor-insider";
  return <Navigate to={`/companies/kailor#${anchor}`} replace />;
}
