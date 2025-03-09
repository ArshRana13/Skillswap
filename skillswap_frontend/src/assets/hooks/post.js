const post = async ({ offer, requirement, description, type }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage (if applicable)
  
      const response = await fetch("http://localhost:8080/api/users/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token if needed
        },
        body: JSON.stringify({ offer, requirement, description, type }),
      });
  
      if (response.ok) {
        alert("Post created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to create post: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("An error occurred while posting.");
    }
  };
  
  export default post;
  