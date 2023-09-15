import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const AdminCreationForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const { fullname, email, password } = event.currentTarget.elements as any;

    try {
        const response = await fetch('http://localhost:5000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: fullname.value,
                email: email.value,
                password: password.value,
            })
        });

        const data = await response.json();

        if (data.success) {
            ("Admin account created successfully. Please log in");
            navigate('/login');
        } else {
            setError(data.message || "Something went wrong");
        }
    } catch (error) {
        setError("Failed to create admin account. Please try again.");
    }
};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box mb={2}>
        <TextField
          label="Full Name"
          type="text"
          name="username"
          required
          fullWidth
          autoFocus
          sx={{ minWidth: { xs: '100%', sm: '500px' } }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Email"
          type="email"
          name="email"
          required
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: '500px' } }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Password"
          type="password"
          name="password"
          required
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: '500px' } }}
        />
      </Box>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box mb={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Admin
        </Button>
      </Box>
    </form>
  );
};

export default AdminCreationForm;
