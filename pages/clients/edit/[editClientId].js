import React from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function ClientEditPage({ client }) {
  const router = useRouter();
  console.log(router.query.editClientId);
  console.log(client);
  return (
    <Layout title="Client-View">
      <form>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <div>
            <TextField
              label="Name"
              id="standard-size-normal"
              defaultValue={client.Name}
              variant="standard"
            />
          </div>
          <div>
            <TextField
              label="Short Name"
              id="standard-size-normal"
              defaultValue={client.ShortName}
              variant="standard"
            />
          </div>
          <div>
            <TextField
              label="Website"
              id="standard-size-normal"
              defaultValue={client.Website}
              variant="standard"
            />
          </div>
          <div>
            <TextField
              label="PageTitle"
              id="standard-size-normal"
              defaultValue={client.Website}
              variant="standard"
            />
          </div>
          <div>
            <TextField
              label="Description"
              id="standard-size-normal"
              defaultValue={client.Description}
              variant="standard"
            />
          </div>
          <div>
            <TextField
              label="Logo Url"
              id="standard-size-normal"
              defaultValue={client.LogoUrl}
              variant="standard"
            />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox defaultChecked={client.IsPublished} />}
              label="Label"
            />
          </div>
          <div>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </Box>
      </form>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL.GetClients}`);
  const clients = await res.json();
  console.log(clients);
  const paths = clients.map((cl) => ({
    params: { editClientId: cl.Id },
  }));
  return {
    paths,
    fallback: true,
  };
}

//pass funtion with context
export async function getStaticProps({ params: { editClientId } }) {
  const res = await fetch(`${API_URL.GetClients}/${editClientId}`);

  const client = await res.json();
  return {
    props: {
      client: client,
    },
    revalidate: 3,
  };
}
