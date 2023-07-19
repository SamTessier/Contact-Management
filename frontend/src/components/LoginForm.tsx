import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/'); 

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
