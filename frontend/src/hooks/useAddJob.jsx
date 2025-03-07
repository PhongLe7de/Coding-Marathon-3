import { useState } from "react";

export default function useAddJob(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const addjob = async (object) => {
        setIsLoading(true);
        setError(null);
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        });
        console.log(response);
        const job = await response.json();
        if (!response.ok) {
          setError(user.error);
          setIsLoading(false);
          return error;
        }
    
        // localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
      };

      return { login, isLoading, error };
}