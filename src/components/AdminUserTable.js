import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';

const AdminUserTable = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const getAllUsers = async () => {
         const result = await getUser();
         console.log(result);
         setUsers(result);
      };
      getAllUsers().catch(console.error);
   }, [setUsers]);
};

const columns = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'firstName', headerName: 'First Name', width: 130 },
   { field: 'lastName', headerName: 'Last Name', width: 130 },
];
