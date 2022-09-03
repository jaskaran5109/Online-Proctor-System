import React, { Fragment, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Sidebar from "../../Sidebar/Sidebar";
import { Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import "./UpdateUser.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
  let { id } = useParams();
  const history=useHistory()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);
  const response = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,{
            name,email,role
        },
        config
      );
      setSuccess(data.success);
    } catch (err) {
      alert(err.message);
    }
  };
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    response();
  };
  const getData = async () => {
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    console.log(data)
    setName(data.user.name);
    setEmail(data.user.email);
    setRole(data.user.role);
  };
  useEffect(() => {
    getData();
    if (success) {
      history.push("/admin/allusers");
      alert("User Updated Successfully");
    }
  }, [history,success]);

  return (
    <Fragment>
      <div className="user">
        <Sidebar />
        <div className="userContainer">
          <form className="classcontainer" onSubmit={updateUserSubmitHandler}>
            <h1>Update User</h1>

            <div className="formInput">
              <PersonIcon className="icon" />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="formInput">
              <MailOutlineIcon className="icon" />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="formInput">
              <VerifiedUserIcon className="icon" />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button id="createProductBtn" type="submit">
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
