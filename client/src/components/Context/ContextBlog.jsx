import { createContext } from "react";
import { useState } from "react";

export const Contextblog = createContext();

export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [user, setUser] = useState({});
  const [isShownav, setIsShownav] = useState(false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const parsedTheme = storedTheme === "dark" ? "dark" : "light";
    return parsedTheme;
  });

  return (
    <Contextblog.Provider
      value={{
        formData,
        setFormData,
        loading,
        setLoading,
        error,
        setErrorMessage,
        user,
        setUser,
        isShownav,
        setIsShownav,
        theme,
        setTheme,
      }}>
      {children};
    </Contextblog.Provider>
  );
};
