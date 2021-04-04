import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {adminService} from '../../service/adminService';
import {CSRFToken} from '../../authentication/csrftoken';
import * as AiIcons from 'react-icons/ai';
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

  update_field: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center"
  },

  button: {
    margin: theme.spacing(3, 0, 2),
    marginRight: "1rem",
  },

  edit_button: {
      width: "30px",
      height: "30px",
      "&:hover": {
          cursor: "pointer",
      }
  }

}));

export default function UpdateCashierModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userNameExists, setUsernameExists] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shouldEdit, setShouldEdit] = useState({
      "username": false,
      "password": false,
      "first_name": false,
      "last_name": false,
      "email": false
  })

  const handleClose = () => {
      setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
    setUsernameExists(false);
    setShouldEdit({username: false, password: false, first_name: false, last_name: false, email: false});
    setSuccess(false);
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();
    const data = new FormData(evt.target);

    adminService.updateCashier(props.user['id'], data)
      .then(response => {
        if (!response.ok)
          setUsernameExists(true);
        else {
          props.sendUpdatedUser(props.user["id"], data);
          setShouldEdit({username: false, first_name: false, last_name: false, password: false, email: false});
          setUsernameExists(false);
          setSuccess(true);
        }
      })
    return;
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Update Cashier
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
            <div className={classes.update_field}>
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
                    defaultValue={props.user ? props.user['username'] : ""}
                    disabled={!shouldEdit['username']}
                    helperText = {userNameExists ? "This username is taken" : ""}
                    />
                <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"username": !shouldEdit["username"]})}/>
                </div>
            </div>

            <div className={classes.update_field}>
                <TextField className={classes.field}
                    required
                    size="small"
                    variant="outlined"
                    margin="normal"
                    id="password"
                    label="Password"
                    name="password"
                    autoFocus
                    defaultValue={props.user ? props.user['password'] : ""}
                    disabled={!shouldEdit['password']}
                    />
                <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"password": !shouldEdit["password"]})}/>
                </div>
            </div>

            <div className={classes.update_field}>
                <TextField className={classes.field}
                    required
                    size="small"
                    variant="outlined"
                    margin="normal"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    defaultValue={props.user ? props.user['first_name'] : ""}
                    disabled={!shouldEdit['first_name']}
                    />
                <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"first_name": !shouldEdit["first_name"]})}/>
                </div>
            </div>

            <div className={classes.update_field}>
                <TextField className={classes.field}
                    required
                    size="small"
                    variant="outlined"
                    margin="normal"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoFocus
                    defaultValue={props.user ? props.user['last_name'] : ""}
                    disabled={!shouldEdit['last_name']}
                    />
                <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"last_name": !shouldEdit["last_name"]})}/>
                </div>
            </div>

            <div className={classes.update_field}>
                <TextField className={classes.field}
                    required
                    size="small"
                    variant="outlined"
                    margin="normal"
                    id="email"
                    label="Email"
                    name="email"
                    autoFocus
                    defaultValue={props.user ? props.user['email'] : ""}
                    disabled={!shouldEdit['email']}
                    />
                <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"email": !shouldEdit["email"]})}/>
                </div>
            </div>
          
            <Button
            className={classes.field + " " + classes.button}
            type="submit"
            variant="contained"
            size= "small"
            color="primary"
            >
            Update Cashier
          </Button>
          {success ? <Alert severity="success">The cashier was updated successfully!</Alert> : ""}
        </form>
        </Fade>
      </Modal>
    </>
  );
}
