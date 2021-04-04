const cashierColumns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'username', headerName: 'Username', width: 233},
    { field: 'first_name', headerName: 'First name', width: 250 },
    { field: 'last_name', headerName: 'Last name', width: 250 },
    { field: 'email', headerName: 'Email', width: 300},
    { field: 'password', headerName: 'Password', width: 200 }
];

const showColumns = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'artist', headerName: 'Artist Name', width: 300 },
    { field: 'date', headerName: 'Date', width: 200},
    { field: 'title', headerName: 'Title', width: 400},
    { field: 'genre', headerName: 'Genre', width: 180},
    { field: 'nr_of_tickets', headerName: 'Nr Tickets', width: 150}
];

export const tableColumns = {
    cashierColumns,
    showColumns
}