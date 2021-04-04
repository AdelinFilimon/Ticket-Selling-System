import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {CSRFToken} from "../../authentication/csrftoken";
import {authService} from '../../service/authService';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login() {
  const classes = useStyles();

  const [userState, setUserState] = useState({
    "isLoggedIn": false,
    "isUnauthorized": false,
    "isNotFound": false,
    "role": ""
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    const data = new FormData(evt.target);

    let response = authService.login(data.get('username'), data.get('password'));
    response.then((result) => {
      
      if (result['id']) {
        setUserState({
          "isLoggedIn": true,
          "isUnauthorized": false,
          "isNotFound": false,
          "role": result["role"]
        });
        return;
      };

      if (result['message'] === "Bad credentials") {
        setUserState({
          "isLoggedIn": false,
          "isUnauthorized": true,
          "isNotFound": false,
          "role": ""
        });
        return;
      };

      if (result['message'] === "User not found") {
        setUserState({
          "isLoggedIn": false,
          "isUnauthorized": false,
          "isNotFound": true,
          "role": ""
        });
        return;
      };
    });
  }

  if (userState["isLoggedIn"]) {
    return <Redirect to={"/" + userState["role"]}/>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
          <CSRFToken />
          <TextField
            error={userState["isNotFound"]}
            required
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            helperText = {userState['isNotFound'] ? "User not found" : ""}
          />
          <TextField
            error={userState["isUnauthorized"]}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText= {userState["isUnauthorized"] ? "Incorrect password" : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}