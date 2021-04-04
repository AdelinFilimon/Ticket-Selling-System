import React, {useState} from 'react';
import RadioButtonsGroup from './radioBtn';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './administrator.css';
import { makeStyles } from '@material-ui/core/styles';
import AddCashierModal from './AddCashierModal';
import UpdateCashierModal from './UpdateCashierModal'
import {DataGrid} from '@material-ui/data-grid';
import {tableColumns} from './table';
import {adminService} from '../../service/adminService';
import AddShowModal from './AddShowModal';
import UpdateShowModal from './UpdateShowModal';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));


const AdministratorPage = () => {
    const classes = useStyles();
    const [value, setValue] = useState("cashiers");
    const [cashierRows, setCashierRows] = React.useState([]);
    const [showsRows, setShowsRows] = React.useState([]);
    const [select, setSelect] = React.useState([]);
    const [artists, setArtists] = React.useState([]);
    const [genres, setGenres] = React.useState([]);

    const handleChange = event => {
        setValue(event.target.value);
    }

    const handleRowSelection = (e) => {
        setSelect(e.selectionModel);
    }

    async function handleDelete (e) {

      if (select.length === 0) return;

      const res = (value === "cashiers") ?
       await adminService.deleteCashier(select[0]) : await adminService.deleteShow(select[0]);

      if (!res.ok) console.log("Error on delete"); 
      else {
        if (value === "cashiers") {
          let newCashiers = cashierRows.filter(cashier => parseInt(cashier['id']) !== parseInt(select[0]));
          setCashierRows(newCashiers);
        } else {
          let newShows = showsRows.filter(cashier => parseInt(cashier['id']) !== parseInt(select[0]));
          setShowsRows(newShows);
        }
      }
    }
      
    React.useEffect(() => {
        async function fun () {
            let cRows, sRows;
            sRows = await adminService.getAllShows();
            cRows = await adminService.getAllCashiers();
            setCashierRows(cRows);
            setShowsRows(sRows);
            setArtists(await adminService.getAllArtists());
            setGenres(await adminService.getAllGenres());
        }
        fun();
    }, [])

    function getSelectedRow() {

      if (select.length === 0)
        return null;

      if (value === "cashiers") {
        let res = cashierRows.filter(cashier => parseInt(cashier["id"]) === parseInt(select[0]));
        return res[0];
      }

      let res = showsRows.filter(show => parseInt(show['id']) === parseInt(select[0]));
      return res[0];
    }

    async function handleAdd(response) {
      const row = await response;
      if (value === "cashiers") setCashierRows([...cashierRows, row]);
      else setShowsRows([...showsRows, row]);
    }

    async function handleUpdate(id, data) {
      
      if (value === "cashiers") {

        let object = {};
        data.forEach(function(value, key){
        object[key] = value;
        });
        delete object["csrfmiddlewaretoken"];
        let cashiers = cashierRows.concat();

        for (let i = 0; i < cashiers.length; i++) {

          if (parseInt(cashierRows[i]['id']) === parseInt(id)) {

            for (const property in object) {
              if (!["userName", "firstName", "lastName"].includes(property))
              {
                cashiers[i][property] = object[property];
              }
    
              if (property === "userName")
                cashiers[i]["username"] = object[property];
    
              if (property === "firstName")
                cashiers[i]["first_name"] = object[property]
              
              if (property === "lastName")
                cashiers[i]["last_name"] = object[property];
            }
            break;
          }
        }
        setCashierRows(cashiers);

      } else {
        let updatedRow = await data;
        let newShows = showsRows.filter(show => parseInt(show['id']) !== parseInt(id));
        setShowsRows([...newShows, updatedRow]);
      }
    }

    const handleDownload = () => {
      if (select[0]) adminService.downloadTickets(select[0])
    }
   
    return (
        <div className = 'administrator_page'>   
        
            <RadioButtonsGroup value={value} onChange={handleChange}/>  
            <Box className={classes.root}>
                {value === "cashiers" ? <AddCashierModal sendAddedUser={handleAdd}/> : <AddShowModal sendAddedShow={handleAdd} artists={artists} genres={genres}/> }
                {value === "cashiers" ? <UpdateCashierModal user={getSelectedRow()} sendUpdatedUser={handleUpdate}/> : <UpdateShowModal show={getSelectedRow()} sendUpdatedShow={handleUpdate} artists={artists} genres={genres}/>  }
        
                <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                >{value === "cashiers" ? "Delete Cashier" : "Delete Show"}
                </Button>
                {value === "cashiers" ? "" :
                 <Button
                 variant="contained"
                 color="primary"
                 onClick={handleDownload}
                 >Export Sold Tickets 
                 </Button>}
            </Box>    
            <div style={{ height: 400, width: '90%' }}>
              { value === "cashiers" ? <DataGrid rows={cashierRows} columns={tableColumns.cashierColumns} pageSize={10} onSelectionModelChange = {handleRowSelection} /> :
                <DataGrid rows={showsRows} columns={tableColumns.showColumns} pageSize={10} onSelectionModelChange = {handleRowSelection} />
              }
            </div>
            
        </div>
    )
}

export default AdministratorPage;