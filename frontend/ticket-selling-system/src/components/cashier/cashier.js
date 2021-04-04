import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles'
import {DataGrid} from '@material-ui/data-grid'
import {cashierService} from '../../service/cashierService'
import getAllShows from '../../service/adminService'
import './cashier.css'
import {CSRFToken} from '../../authentication/csrftoken'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

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
}))

const ticketColumns = [
    { field: 'id', headerName: 'ID', width: 150},
    { field: 'show', headerName: 'Show title', width: 350},
    { field: 'nr_of_places', headerName: "Nr places", width: 200}
];

const CashierPage = () => {
    const classes = useStyles()

    const [rows, setRows] = useState([])
    const [selectedRow, setSelectedRow] = useState([])
    const [shows, setShows] = useState([])
    const [isAddModalOpened, setIsAddModalOpened] = useState(false)
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false)
    const [show, setShow] = useState("")
    const [fullShow, setFullShow] = useState(false)

    useEffect(() => {
        (async function getRows() {
            setRows(await cashierService.getAllTickets())
            let shows = await getAllShows();
            setShows(shows)
        })()
    }, [])

    const handleAdd = (evt) => {
        setIsAddModalOpened(true)
    }

    const handleUpdate = (evt) => {
        if (selectedRow.length > 0)
            setIsUpdateModalOpened(true)
    }

    const handleDelete = (evt) => {
        (async function deleteRow() {
            if (selectedRow[0].length > 0) {
                await cashierService.deleteTicket(parseInt(selectedRow[0]))
            }
        })()
    }

    const handleRowSelection = (evt) => {
        setSelectedRow(evt.selectionModel)
    }

    const handleCloseAddModal = () => {
        setIsAddModalOpened(false)
        setFullShow(false)
    }

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpened(false)
        setFullShow(false)
    }

    const handleSubmitAdd = (evt) => {

        evt.preventDefault()
        const data = new FormData(evt.target)

        let obj = {}
        obj['nrOfPlaces'] = parseInt(data.get('nr_of_places'))

        let show1 = shows.filter(row => row['title'] === show)[0]

        obj['show'] = {'id': show1['id']}

        const reducer = (accumulator, item) => {
            return accumulator + item;
        };
        
        let reservedPlaces = rows.filter(row => row['show'] === show)
                            .map(row => parseInt(row["nr_of_places"]))
                            .reduce(reducer, 0)
        
        if (reservedPlaces + obj['nrOfPlaces'] > show1['nr_of_tickets']) {
            setFullShow(true)
        }
        else
            cashierService.addTicket(obj)

    }

    const handleSubmitUpdate = (evt) => {
        evt.preventDefault()
        const data = new FormData(evt.target)

        let obj = {}
        obj['nrOfPlaces'] = parseInt(data.get('nr_of_places'))

        let showId = shows.filter(row => row['title'] === show)[0]['id']
        
        obj['show'] = {'id': showId}

        cashierService.updateTicket(parseInt(selectedRow[0]), obj)
    }

    const getItemsAsMenus = () => {
        const menus = [];
        let showsTitles = shows.map(show => show['title'])
        for (let i in showsTitles) {
            menus.push(<MenuItem key={ Math.random().toString(36).substr(2, 9) } value={showsTitles[i]}>{showsTitles[i]}</MenuItem>)
        }
        return menus;    
    }

    const handleShowChange = (evt) => {
        setShow(evt.target.value)
    }

    return (
        <div className = 'cashier_page'>   
            
            <Box className={classes.root}>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    >Sell Ticket
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    >Update Ticket
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    >Delete Ticket
                </Button>
                
            </Box>

            <Box>
                <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={isAddModalOpened}
                onClose={handleCloseAddModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                    <Fade in={isAddModalOpened}>
                    <form className={classes.paper} onSubmit={handleSubmitAdd} autoComplete="off">
                        <CSRFToken/>
                        <InputLabel className={classes.genreLabel} id="show">Show Title</InputLabel>
                        <Select
                            required
                            className={classes.field}
                            labelId="artistLabel"
                            id="artistSelect"
                            value={show}
                            onChange={handleShowChange}
                        >
                            {getItemsAsMenus()}
                        </Select>
                        <TextField className={classes.field}
                            required
                            type="number"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                inputProps: { 
                                    max: 8, min: 1 
                                }
                            }}
                            id="nr_of_places1"
                            label="Number of places"
                            name="nr_of_places"
                            autoFocus
                        />

                        <Button
                        className={classes.field + " " + classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        >
                        Sell Ticket
                        </Button>
                        {fullShow ? <Alert severity="error">There are no more places for this show!</Alert> : ""}
                    </form>
                    </Fade>
                </Modal>

                <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={isUpdateModalOpened}
                onClose={handleCloseUpdateModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                    <Fade in={isUpdateModalOpened}>
                    <form className={classes.paper} onSubmit={handleSubmitUpdate} autoComplete="off">
                        <CSRFToken/>
                        <InputLabel className={classes.genreLabel} id="show">Show Title</InputLabel>
                        <Select
                            required
                            className={classes.field}
                            labelId="artistLabel"
                            id="artistSelect"
                            value={show}
                            onChange={handleShowChange}
                        >
                            {getItemsAsMenus()}
                        </Select>
                        <TextField className={classes.field}
                            required
                            type="number"
                            size="small"
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                inputProps: { 
                                    max: 8, min: 1 
                                }
                            }}
                            id="nr_of_places2"
                            label="Number of places"
                            name="nr_of_places"
                            autoFocus
                        />

                        <Button
                        className={classes.field + " " + classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        >
                        Update Ticket
                        </Button>
                    </form>
                    </Fade>
                </Modal>

            </Box>    
            <div style={{ height: 400, width: '50%' }}>
                <DataGrid rows={rows} columns={ticketColumns} pageSize={50} onSelectionModelChange = {handleRowSelection} />
            </div>
            
        </div>
    )
}

export default CashierPage;