import React from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

export default function ClientDetailPage({ client }) {
  const router = useRouter();
  console.log(router.query.clientId);
  return (
    <Layout title="Client-View">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <div>
          <TextField
            label="Name"
            id="standard-size-normal"
            defaultValue={client.Name}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Short Name"
            id="standard-size-normal"
            defaultValue={client.ShortName}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Website"
            id="standard-size-normal"
            defaultValue={client.Website}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="PageTitle"
            id="standard-size-normal"
            defaultValue={client.Website}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Description"
            id="standard-size-normal"
            defaultValue={client.Description}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <TextField
            label="Logo Url"
            id="standard-size-normal"
            defaultValue={client.LogoUrl}
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
        <FormControlLabel control={<Checkbox defaultChecked={client.IsPublished} disabled  />} label="Label" />
        </div>
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL.GetClients}`);
  const clients = await res.json();
  console.log(clients);
  const paths = clients.map((cl) => ({
    params: { clientId: cl.Id },
  }));
  return {
    paths,
    fallback: true,
  };
}

//pass funtion with context
export async function getStaticProps({ params: { clientId } }) {
  const res = await fetch(`${API_URL.GetClients}/${clientId}`);

  const client = await res.json();
  return {
    props: {
      client: client,
    },
    revalidate: 3,
  };
}

// export async function getServerSideProps() {
//   const router = useRouter();
//   const res = await fetch(`${API_URL.GetClients}/${router.query.clientId}`);
//   const client = await res.json();
//   return {
//     props: { client }
//   };
// }
