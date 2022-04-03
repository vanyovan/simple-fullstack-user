import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import AlertTitle from "@mui/material/AlertTitle";

const AddUser = () => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClose = () => setOpen(false);

  const savedUser = async (e) => {
    e.preventDefault();
    let error = false;

    if (name == "" || sex == "" || DOB == "" || address == "" || role == "") {
      error = true;
      console.log("truefalse", name == "");
      setAlertContent("Please fill all data");
      setAlert(true);
      setOpen(true);
    } else {
      if (validateEmail(email) && !error) {
        await axios
          .post("http://localhost:5000/users/addUser", {
            name: name,
            sex: sex,
            DOB: DOB,
            address: address,
            email: email,
            role: role,
          })
          .then((res) => {
            navigate("/");
          })
          .catch((error) => {
            if (error) {
              setAlertContent("Input data failed.");
              setAlert(true);
              setOpen(true);
            }
          });
      } else {
        setAlertContent("Please input correct email");
        setAlert(true);
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <form onSubmit={savedUser}>
        <div>
          <Modal open={open} onClose={handleClose}>
            {alert ? (
              <Alert severity="error">
                <AlertTitle>Error!</AlertTitle>
                <center>
                  <strong>{alertContent}</strong>
                </center>
              </Alert>
            ) : (
              <></>
            )}
          </Modal>
        </div>
        <div className="field mt-2">
          <label className="label">Name</label>
          <input
            class="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="columns">
          <div className="field column is-one-fifth">
            <label className="label">Sex</label>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Sex
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                label="Sex"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="field column is-one-fifth">
            <label className="label">DOB</label>
            <TextField
              id="DOB"
              label="Date of Birth"
              type="date"
              onChange={(e) => {
                setDOB(e.target.value);
              }}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Address</label>
          <input
            class="input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            class="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label className="label">Role</label>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"QA"}>QA</MenuItem>
              <MenuItem value={"developer"}>Developer</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="field">
          <button className="button is-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
