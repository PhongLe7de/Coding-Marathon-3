import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (object) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return;
    }
    const user = await response.json();

    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
    return user;
  };

  return { login, isLoading, error };
}
