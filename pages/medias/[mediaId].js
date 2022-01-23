import React, { useState, useEffect, useQuery } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { API_URL } from "@/config/index";
import axios from "axios";
import { parseCookies } from "@/helpers/index";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}

export default function MediaDetailPage({ token }) {
  const [media, setData] = useState(null);

  const fetchMediaByid = async (mediaId) => {
    const res = await fetch(`${API_URL.GetMedias}/${mediaId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    });

    const data = await res.json();
    if (data && data.status === "success") {
      setData(data.data);
      console.log(media);
    }
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchMediaByid(id);
  }, []);

  return (
    <Layout title="Media-Detail">
      <h1>Media - Detail</h1>
      <form>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          {media && (
            <div>
              <TextField
                label="Media"
                id="standard-size-normal"
                variant="standard"
                defaultValue={media.name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          )}

          {media && (
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked={media.is_active} disabled />}
                label="Is Active"
              />
            </div>
          )}
        </Box>
      </form>
    </Layout>
  );
}
