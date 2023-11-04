import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";

type SignupFormProps = {
  onSuccess: (message: string) => void;
};

const SignupForm = ({ onSuccess }: SignupFormProps): JSX.Element => {
  const [error, setError] = useState<string>("");
  const [school, setSchool] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email, password, companyId } = event.currentTarget.elements as any;

    setError("");
    onSuccess("Account created successfully. Please log in");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box mb={2}>
        <TextField
          label="Full Name"
          type="username"
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
          autoFocus
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
      {companyId && (
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="school-label">School</InputLabel>
            <Select
              labelId="school-label"
              value={school}
              onChange={(event) => setSchool(event.target.value)}
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
      )}
      {!companyId && (
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
      )}
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
