import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

type SignupFormProps = {
  onSuccess: (message: string) => void;
};

const SignupForm = ({ onSuccess }: SignupFormProps): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [school, setSchool] = useState<string>("");

  // Dummy schools array, you can replace this with the actual array
  const schools = [
    { name: "School 1" },
    { name: "School 2" },
    { name: "School 3" },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email, password, companyId } = event.currentTarget.elements as any;

    setError("");
    onSuccess("Account created successfully. Please log in");
    navigate('/login');  // Navigate to login page after successful signup
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
      <Box mb={2}>
        <TextField
          placeholder="The name of your company"
          label="Company ID"
          type="text"
          name="companyId"
          required
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: '500px' } }}
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="school-label">School</InputLabel>
          <Select
            labelId="school-label"
            value={school}
            onChange={(event) => setSchool(event.target.value as string)}
            sx={{ minWidth: { xs: '100%', sm: '500px' } }}
          >
            {schools.map((school, index) => (
              <MenuItem key={index} value={school.name}>
                {school.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box mb={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
