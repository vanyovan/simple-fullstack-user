import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const UserList = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "sex", headerName: "Sex", flex: 1 },
    {
      field: "DOB",
      headerName: "DOB",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/edit/${params.id}`} className="button is-small is-info">
              Edit
            </Link>

            <button
              onClick={() => deleteUser(params.id)}
              className="button is-small is-danger ml-1"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/users/getUser");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/deleteUser/${id}`);
    getUser();
  };

  const searchUser = async (name) => {
    const response = await axios.get(
      `http://localhost:5000/users/getUser/${name}`
    );
    setUser(response.data);
  };

  return (
    <div>
      <Link to="/add" className="button is-primary mt-2">
        Add New
      </Link>
      <div className="field">
        <label className="label">Search by name</label>
        <input
          className="input"
          type="text"
          onChange={(e) => searchUser(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default UserList;
