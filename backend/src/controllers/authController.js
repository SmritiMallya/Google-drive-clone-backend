import supabase from "../services/supabaseClient.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) return res.status(400).json({ error: error.message });
    
    res.json({
      message: "Signup successful",
      token: data.session.access_token,
      user: { 
        id: data.user.id, 
        email: data.user.email, 
        name: data.user.user_metadata.name 
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return res.status(400).json({ error: error.message });
    
    res.json({
      message: "Login successful",
      token: data.session.access_token,
      user: { 
        id: data.user.id, 
        email: data.user.email, 
        name: data.user.user_metadata?.name 
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NEW FUNCTION: verifyToken
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Use Supabase to verify the token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Token is valid, return user information (optional, but useful for client-side validation)
    res.json({
      message: "Token is valid",
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name // Use optional chaining in case name is not always present
      }
    });
  } catch (err) {
    // Catch any unexpected errors during the process
    res.status(500).json({ error: "Token verification failed: " + err.message });
  }
};
