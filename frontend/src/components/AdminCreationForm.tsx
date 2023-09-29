import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query"; 

const createUser = async (user: {
  fullname: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:5000/create-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Something went wrong");
  }

  return response.json();
};

const AdminCreationForm = (): JSX.Element => {
  const navigate = useNavigate();

  const mutation = useMutation(createUser); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { fullname, email, password } = event.currentTarget.elements as any;

    mutation.mutate(
      {
        fullname: fullname.value,
        email: email.value,
        password: password.value,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
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
          sx={{ minWidth: { xs: "100%", sm: "500px" } }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Email"
          type="email"
          name="email"
          required
          fullWidth
          sx={{ minWidth: { xs: "100%", sm: "500px" } }}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Password"
          type="password"
          name="password"
          required
          fullWidth
          sx={{ minWidth: { xs: "100%", sm: "500px" } }}
        />
      </Box>
      {mutation.isError ? (
        <Box mb={2}>
          <Alert severity="error">
            {(mutation.error as { message?: string })?.message || "Failed to create admin account. Please try again."}
          </Alert>
        </Box>
      ) : null}
      <Box mb={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Admin
        </Button>
      </Box>
    </form>
  );
};

export default AdminCreationForm;
