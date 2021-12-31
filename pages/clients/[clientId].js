import React, { useState, useEffect, useQuery } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import axios from "axios";

export default function ClientDetailPage() {
  const [client, setData] = useState(null);

  const fetchClientById = async (clientId) => {
    const response = await axios.get(`${API_URL.GetClients}/${clientId}`);
    setData(response.data.data);
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchClientById(id);
  }, []);

  return (
    <Layout title="Client-View">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        {client && (
          <div>
            <TextField
              label="Name"
              id="standard-size-normal"
              defaultValue={client.name}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}

        {client && (
          <div>
            <TextField
              label="Short Name"
              id="standard-size-normal"
              defaultValue={client.short_name}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}

        {client && (
          <div>
            <TextField
              label="Website"
              id="standard-size-normal"
              defaultValue={client.website}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}

        {client && (
          <div>
            <TextField
              label="PageTitle"
              id="standard-size-normal"
              defaultValue={client.pagetitle}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}

        {client && (
          <div>
            <TextField
              label="Description"
              id="standard-size-normal"
              defaultValue={client.description}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}

        {client && (
          <div>
            <TextField
              label="Logo Url"
              id="standard-size-normal"
              defaultValue={client.logo_url}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )}

        {client && (
          <div>
            <FormControlLabel
              control={
                <Checkbox defaultChecked={client.is_active} disabled />
              }
              label="Is Active"
            />
          </div>
        )}
      </Box>
    </Layout>
  );
}
