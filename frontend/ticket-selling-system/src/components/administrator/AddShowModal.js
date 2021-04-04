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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

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
  },

  genreLabel: {
    "margin-top": "1rem"
  }

}));

export default function AddCashierModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [showExists, setShowExists] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleClose = () => {
      setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
    setArtist("");
    setGenre("");
    setSelectedDate(new Date());
    setShowExists(false);
    setSuccess(false);
  }

  const handleGenreChange = (evt) => {
    setGenre(evt.target.value);
  }

  const handleArtistChange = (evt) => {
    setArtist(evt.target.value);
  }

  function getItemsAsMenus(items, field) {
    const menus = [];
    for (const i in items) {
      menus.push(<MenuItem key={ Math.random().toString(36).substr(2, 9) } value={items[i][field]}>{items[i][field]}</MenuItem>)
    }
    return menus;    
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();
    const data = new FormData(evt.target);

    let object = {};
    data.forEach(function(value, key){
    object[key] = value;
    });

    object['date'] = selectedDate.toISOString().substr(0, 16)

    object['artist'] = {
      'id': props.artists.filter(artist1 => artist1['djName'] === artist)[0]['id']
    }

    object['genre'] = {
      'id': props.genres.filter(genre1 => genre1['genre'] === genre)[0]['id']
    }

    adminService.addShow(object)
      .then(response => {
        let show = response.json();
        if (!response.ok) {
          setShowExists(true);
        }
        else {
          props.sendAddedShow(show);
          setSuccess(true);
        }
      })
    return;
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add Show
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
            size="small"
            variant="outlined"
            margin="normal"
            id="title"
            label="Title"
            name="title"
            error = {showExists}
            helperText = {showExists ? "This show title is taken" : ""}
            autoFocus
            />

          <InputLabel className={classes.genreLabel} id="artistLabel">Artist</InputLabel>
          <Select
            required
            className={classes.field}
            labelId="artistLabel"
            id="artistSelect"
            value={artist}
            onChange={handleArtistChange}
          >
            {getItemsAsMenus(props.artists, "djName")}
          </Select>

          <InputLabel className={classes.genreLabel} id="genreLabel">Genre</InputLabel>
          <Select
            required
            className={classes.field}
            labelId="genreLabel"
            id="genreSelect"
            value={genre}
            onChange={handleGenreChange}
          >
            {getItemsAsMenus(props.genres, "genre")}
          </Select>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              required
              disableToolbar
              variant="inline"
              margin="normal"
              id="date-time-picker-inline"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}

            />
          </MuiPickersUtilsProvider>

          <TextField className={classes.field}
            required
            type="number"
            size="small"
            variant="outlined"
            margin="normal"
            id="nrOfTickets"
            label="Number of tickets"
            name="nrOfTickets"
            autoFocus
            />

          <Button
          className={classes.field + " " + classes.button}
          type="submit"
          variant="contained"
          color="primary"
          >
          Add Show
          </Button>
          {success ? <Alert severity="success">The cashier was inserted successfully!</Alert> : ""}
        </form>
        </Fade>
      </Modal>
    </>
  );
}
