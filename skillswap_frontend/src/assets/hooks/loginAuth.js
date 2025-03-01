export const loginAuth = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      
      const token = await response.json(); // Read as text instead of JSON
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
      localStorage.setItem("token", token[0]);
      localStorage.setItem("user_id", token[1]); // Store the token in local storage
      return token; // Return the token directly
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };
  