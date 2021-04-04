import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {adminService} from '../../service/adminService';
import {CSRFToken} from '../../authentication/csrftoken';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "600px",
    width: "400px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  field: {
    width: "80%",
  },

  button: {
    margin: theme.spacing(3, 0, 2),
  }

}));

export default function AddCashierModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [passNotMatch, setPassNotMatch] = useState(false);
  const [userNameExists, setUsernameExists] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClose = () => {
      setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
    setPassNotMatch(false);
    setUsernameExists(false);
    setSuccess(false);
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();
    const data = new FormData(evt.target);
    if (data.get('password') !== data.get('password2')) {
      setPassNotMatch(true);
      return;
    }

    adminService.addCashier(data)
      .then(response => {
        let user = response.json();
        if (!response.ok) {
          setUsernameExists(true);
        }
        else {
          props.sendAddedUser(user);
          setSuccess(true);
        }
      })

    return;
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add Cashier
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <form className={classes.paper} onSubmit={handleSubmit} autoComplete="off">
            <CSRFToken/>
            <TextField className={classes.field}
            required
            error = {userNameExists}
            size="small"
            variant="outlined"
            margin="normal"
            id="userName"
            label="Username"
            name="userName"
            autoFocus
            helperText = {userNameExists ? "This username is taken" : ""}
            />

            <TextField className={classes.field}
            required
            error = {passNotMatch}
            type="password"
            size="small"
            variant="outlined"
            margin="normal"
            id="password"
            label="Password"
            name="password"
            autoFocus
            />

            <TextField className={classes.field}
            required
            error = {passNotMatch}
            type="password"
            size="small"
            variant="outlined"
            margin="normal"
            id="password2"
            label="Confirm Password"
            name="password2"
            autoFocus
            helperText = {passNotMatch ? "The passwords do not match!" : ""}
            />

            <TextField className={classes.field}
            required
            size="small"
            variant="outlined"
            margin="normal"
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            />

            <TextField className={classes.field}
            required
            size="small"
            variant="outlined"
            margin="normal"
            id="lastName"
            label="Last Name"
            name="lastName"
            autoFocus
            />

            <TextField className={classes.field}
            type="email"
            size="small"
            variant="outlined"
            margin="normal"
            id="email"
            label="Email"
            name="email"
            autoFocus
            />

            <Button
            className={classes.field + " " + classes.button}
            type="submit"
            variant="contained"
            color="primary"
            >
            Add Cashier
          </Button>
          {success ? <Alert severity="success">The cashier was inserted successfully!</Alert> : ""}
        </form>
        </Fade>
      </Modal>
    </>
  );
}
