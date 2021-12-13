import React, { useState, useEffect, useQuery } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientEditPage() {
  const [client, setData] = useState(null);

  const router = useRouter();

  const fetchClientById = async (clientId) => {
    // axios
    //   .get(`${API_URL.GetClients}/${clientId}`)
    //   .then((response) => response.data);
    const response = await axios.get(`${API_URL.GetClients}/${clientId}`);
    setData(response.data.data);
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchClientById(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldsRequired = { ...client };    
    delete fieldsRequired.IsPublished; //ispublished is not mandatory

    const hasEmptyField = Object.values(fieldsRequired).some(
      (element) => element === ""
    );

    if (hasEmptyField) {
      toast.error("Please fill all fields");
      return;
    }

    const id = window.location.href.split("/").pop();
    const res = await fetch(`${API_URL.UpdateClient}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
      return;
    } else {
      toast.success("Data has been updated");
      router.push(`/clients/${id}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...client, [name]: value });
  };


  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setData({ ...client, [name]: checked });
  };

  return (
    <Layout title="Client-Edit">
      <form onSubmit={handleSubmit} method="PUT">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          {client && (
            <div>
              <TextField
                label="Name"
                id="Name"
                name="Name"
                value={client.Name}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          )}

          {client && (
            <div>
              <TextField
                label="Short Name"
                id="ShortName"
                name="ShortName"
                value={client.ShortName}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          )}

          {client && (
            <div>
              <TextField
                label="Website"
                id="Website"
                name="Website"
                value={client.Website}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          )}

          {client && (
            <div>
              <TextField
                label="Page Title"
                id="PageTitle"
                name="PageTitle"
                value={client.PageTitle}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          )}

          {client && (
            <div>
              <TextField
                label="Description"
                id="Description"
                name="Description"
                value={client.Description}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          )}

          {client && (
            <div>
              <TextField
                label="Logo Url"
                id="LogoUrl"
                name="LogoUrl"
                value={client.LogoUrl}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          )}

          {client && (
            <div>
              <FormControlLabel
                id="IsPublished"
                name="IsPublished"
                control={
                  <Checkbox
                    defaultChecked={client.IsPublished}
                    onChange={handleCheckBoxChange}
                  />
                }
                label="Label"
              />
            </div>
          )}

          <div>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
            <ToastContainer />
          </div>
        </Box>
      </form>
    </Layout>
  );
}
