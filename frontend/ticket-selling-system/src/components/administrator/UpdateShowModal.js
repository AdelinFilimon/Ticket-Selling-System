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
import * as AiIcons from 'react-icons/ai';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
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

  update_field: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center"
  },

  select_field: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
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
  },

  genreLabel: {
    "margin-top": "1rem"
  }

}));

export default function UpdateShowModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showExists, setShowExists] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shouldEdit, setShouldEdit] = useState({
      "title": false,
      "artist": false,
      "genre": false,
      "date": false,
  })

  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  React.useEffect(() => {
    function parseDate() {
      let newDate = new Date()
      newDate.setFullYear(parseInt(props.show['date'.slice(0, 4)], 10))
      newDate.setMonth(parseInt(props.show['date'].slice(5, 7), 10) - 1)
      newDate.setDate(parseInt(props.show['date'].slice(8, 10), 10))
      newDate.setHours(parseInt(props.show['date'].slice(11, 13), 10))
      newDate.setMinutes(parseInt(props.show['date'].slice(14, 16), 10))
      newDate.setSeconds(0)
      setSelectedDate(newDate)
    }

    if (props.show) {
      setGenre(props.show['genre'])
      setArtist(props.show['artist'])
      parseDate()
    }
    
  }, [props.show])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
      setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
    setShowExists(false);
    setShouldEdit({
        title: false,
        artist: false,
        genre: false,
        date: false,

    });
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

    let object = {}

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

    adminService.updateShow(props.show['id'], object)
      .then(response => {
        if (!response.ok) {
          setSuccess(false)
        }
        else {
          let show = response.json();
          props.sendUpdatedShow(props.show["id"], show);
          setShouldEdit({
            title: false,
            artist: false,
            genre: false,
            date: false,
            nr_of_tickets: false
            });
          setShowExists(false);
          setSuccess(true);
        }
      })
    return;
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Update Show
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
                size="small"
                variant="outlined"
                margin="normal"
                id="title"
                label="Title"
                name="title"
                error = {showExists}
                defaultValue = {props.show ? props.show['title'] : ""}
                disabled={!shouldEdit['title']}
                helperText = {showExists ? "This show title is taken" : ""}
                autoFocus
                />
                <div className={classes.edit_button}>
                    <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"title": !shouldEdit["title"]})}/>
                </div>
            </div>

          <div className={classes.select_field}>
                    <InputLabel className={classes.genreLabel} id="artistLabel">Artist</InputLabel>
                    <div className={classes.update_field}>
                        <Select
                            className={classes.field}
                            required
                            labelId="artistLabel"
                            id="artistSelect"
                            disabled = {!shouldEdit['artist']}
                            value={artist}
                            onChange={handleArtistChange}
                        >
                            {getItemsAsMenus(props.artists, "djName")}
                        </Select>
                        <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"artist": !shouldEdit["artist"]})}/>
                        </div>
                    </div>
           </div>  
            
        <div className={classes.select_field}>
            <InputLabel className={classes.genreLabel} id="genreLabel">Genre</InputLabel>
            <div className={classes.update_field}>
                <Select
                    className={classes.field}
                    required
                    labelId="genreLabel"
                    id="genreSelect"
                    value={genre}
                    onChange={handleGenreChange}
                    disabled = {!shouldEdit['genre']}
                >
                    {getItemsAsMenus(props.genres, "genre")}
                </Select>
                <div className={classes.edit_button}>
                            <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"genre": !shouldEdit["genre"]})}/>
                </div>
            </div>
        </div>
        

        
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.update_field}>
                <DateTimePicker
                className={classes.field}
                required
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-time-picker-inline"
                label="Date"
                value={selectedDate}
                disabled = {!shouldEdit['date']}
                onChange={handleDateChange}
                />
                <div className={classes.edit_button}>
                        <AiIcons.AiFillEdit size="20" onClick={() => setShouldEdit({"date": !shouldEdit["date"]})}/>
                </div>
            </div>
          </MuiPickersUtilsProvider>

          <div className= {classes.update_field}>
            <TextField className={classes.field}
                required
                type="number"
                size="small"
                variant="outlined"
                margin="normal"
                id="nrOfTickets"
                label="Number of tickets"
                name="nrOfTickets"
                defaultValue = {props.show ? props.show['nr_of_tickets'] : ""}
                autoFocus
                />
            </div>
            
          <Button
          className={classes.field + " " + classes.button}
          type="submit"
          variant="contained"
          color="primary"
          >
          Update Show
          </Button>
          {success ? <Alert severity="success">The show was updated successfully!</Alert> : ""}
        </form>
        </Fade>
      </Modal>
    </>
  );
}
