import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import { School, Person } from '@mui/icons-material';

export function IntroPage() {
  return (
    <div className="lg:px-40 md:px-10 sm:px-10 lg:text-2xl md:text-xl sm:text-lg">
      <div className="flex justify-center w-auto">
        <School className="h-20 w-20 m-12" />
      </div>
      <div className="font-nunito flex flex-col items-start mb-48">
        <div className="flex w-auto items-center flex-row">
          <h3 className="font-extrabold tracking-tight text-center lg:text-4xl md:text-3xl sm:text-3xl">
            Welcome to EdNet!
          </h3>
        </div>
        <div className="text-nunito-400 tracking-tight p-4">
          <p className="my-4">
          EdNet arises from a real-world challenge faced by businesses in the education industry. With hundreds of employees and clients comes need to efficiently manage a burgeoning contact list inclusive of staff, students, and their families, and the schools hosting the programs. EdNet is conceived as a user-friendly, spreadsheet-free interface designed to seamlessly store, edit, search, and filter contacts across various categories. It tailors data access based on the user's role and the company they belong to, ensuring a secure experience.
          </p>
        </div>
      </div>
      <div className="flex w-auto items-center flex-row">
          <h3 className="text-nunito-900 font-extrabold tracking-tight text-center lg:text-4xl md:text-3xl sm:text-3xl">
            Getting Started
          </h3>
        </div>
        <div className="text-nunito-400 tracking-tight p-4">
          <p className="my-4">
          To get started, you will be prompted to create a company profile during the signup process. You can then start adding schools, followed by staff and students who are systematically assigned to these schools. The data once saved, is ready for search and filter operations. EdNet differentiate users based on their roles, thus ensuring a tiered access control right from the get-go.
          </p>
        </div>
      <div className="font-nunito flex flex-col items-start mb-48">
        <div className="flex w-auto items-center flex-row">
          <School className="h-40 sm:h-56" />
          <h3 className="text-nunito-900 font-extrabold tracking-tight text-center lg:text-4xl md:text-3xl sm:text-3xl">
            Your First Steps on EdNet: A Visual Guide
          </h3>
        </div>

        <div className="text-nunito-400 tracking-tight p-4 text-grey">
          <div className="my-4">
            <h4>1. Sign-Up and Login:</h4>
            <Dialog open={true}>
              <DialogTitle>Sign Up</DialogTitle>
              <DialogContent>
                <TextField label="Company ID" defaultValue="EdTechCo" fullWidth />
                <TextField label="Email" defaultValue="admin@edtechco.com" fullWidth />
                <TextField label="Password" type="password" fullWidth />
              </DialogContent>
              <DialogActions>
                <Button color="primary">Save</Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="my-4">
            <h4>2. Adding Schools:</h4>
            <Dialog open={true}>
              <DialogTitle>Add School</DialogTitle>
              <DialogContent>
                <TextField label="School Name" defaultValue="Greenwood High" fullWidth />
                <TextField label="Address" defaultValue="123 Elm St" fullWidth />
                <TextField label="City" defaultValue="Springfield" fullWidth />
                <TextField label="State" defaultValue="IL" fullWidth />
                <TextField label="Zip Code" defaultValue="62704" fullWidth />
              </DialogContent>
              <DialogActions>
                <Button color="primary">Save</Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="my-4">
            <h4>3. Creating Contacts:</h4>
            <Dialog open={true}>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogContent>
                <TextField label="Name" defaultValue="John Doe" fullWidth />
                <TextField label="Role" defaultValue="Teacher" fullWidth />
                <TextField label="Email" defaultValue="john.doe@greenwoodhigh.com" fullWidth />
                <TextField label="Phone Number" defaultValue="(123) 456-7890" fullWidth />
              </DialogContent>
              <DialogActions>
                <Button color="primary">Save</Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="my-4">
            <h4>4. Viewing Your Lists:</h4>
            <List>
              <ListItem>
                <Avatar><Person /></Avatar>
                <ListItemText primary="John Doe" secondary="Greenwood High" />
              </ListItem>
              <ListItem>
                <Avatar><Person /></Avatar>
                <ListItemText primary="John Doe" secondary="Greenwood High" />
              </ListItem>
              <ListItem>
                <Avatar><Person /></Avatar>
                <ListItemText primary="John Doe" secondary="Greenwood High" />
              </ListItem>
              <ListItem>
                <Avatar><Person /></Avatar>
                <ListItemText primary="John Doe" secondary="Greenwood High" />
              </ListItem>
            </List>
          </div>

          <div className="my-4">
            <h4>5. User Profile Card:</h4>
            <Dialog open={true}>
              <DialogTitle>User Profile</DialogTitle>
              <DialogContent>
                <TextField label="Name" value="John Doe" fullWidth disabled />
                <TextField label="Role" value="Teacher" fullWidth disabled />
                <TextField label="Email" value="john.doe@greenwoodhigh.com" fullWidth disabled />
                <TextField label="Phone Number" value="(123) 456-7890" fullWidth disabled />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="font-nunito flex flex-col items-start mb-48">
    
        <div className="text-nunito-400 tracking-tight p-4">
          <p className="my-4">
            That's it! You're now ready to explore EdNet and discover how it can simplify your contact and profile management tasks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
