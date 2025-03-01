export const signup = async (email, password,location, name, skills) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, location,name, skills}),
      });
  
      
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      return true; // Return true if successful
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };
  