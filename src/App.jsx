import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Endpoints } from "./apis/constants";
import { instance } from "./apis/request";
import AddUser from "./Pages/AddUser";

const App = () => {
  const [users, setUsers] = useState([]);

  const [editData, setEditData] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    instance
      .get(Endpoints.GetUser)
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.log("the err is : ", err));
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between m-4">
        <h1 className="text-gray-600 text-2xl font-bold">Reqres</h1>
        <>
          <Button variant="contained" onClick={()=>{
            handleOpen();
            setEditData(undefined)
          }}>
            Add
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <AddUser closeDialog={handleCloseDialog} editData={editData} />
            </DialogContent>
          </Dialog>
        </>
      </div>

      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">
                  <img
                    src={user.avatar}
                    alt={`${user.avatar}${index}`}
                    className="h-14 rounded-full w-14"
                  />
                </TableCell>
                <TableCell align="center">{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleOpen();
                      setEditData(user);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
