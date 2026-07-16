// Yahan koi import useNavigate nahi aayega!

// 🟢 navigate ko as argument (parameter) accept karein
const handleLogout = async (navigate) => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (!confirmLogout) return;

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST", 
      credentials: "include", 
    });
  } catch (error) {
    console.error("Logout API failed:", error);
  } finally {
    localStorage.removeItem("isAdminLoggedIn");
    
    // Yahan passed argument use ho raha hai
    navigate("/admin/login", { replace: true });
  }
};

export default handleLogout;