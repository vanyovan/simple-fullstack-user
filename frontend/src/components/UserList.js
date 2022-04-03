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
    console.log("ID", id);
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
      {/* <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th onClick={sort}>Name</th>
            <th>Sex</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th className="has-text-weight-normal">{index + 1}</th>
              <th className="has-text-weight-normal">{user.name}</th>
              <th className="has-text-weight-normal">{user.sex}</th>
              <th className="has-text-weight-normal">{user.DOB}</th>
              <th className="has-text-weight-normal">{user.address}</th>
              <th className="has-text-weight-normal">{user.email}</th>
              <th className="has-text-weight-normal">{user.role}</th>
              <th>
                <Link
                  to={`/edit/${user.id}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table> */}
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
