// context/TeamNameProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";

const TeamNameContext = createContext();

export function TeamNameProvider({ children }) {
  // in-memory only; will reset on reload/close
  const [teamName, setTeamName] = useState("");

  const saveTeamName = (name) => {
    const clean = String(name || "").trim().slice(0, 64);
    setTeamName(clean);
  };

  const clearTeamName = () => {
    setTeamName("");
  };

  return (
    <TeamNameContext.Provider value={{ teamName, saveTeamName, clearTeamName }}>
      {children}
    </TeamNameContext.Provider>
  );
}

export function useTeamName() {
  const ctx = useContext(TeamNameContext);
  if (!ctx) throw new Error("useTeamName must be used within TeamNameProvider");
  return ctx;
}
