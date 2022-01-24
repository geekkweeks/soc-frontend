import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_KEYWORD, API_URL } from "@/config/index";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function KeywordDetailPage({ token }) {
  const [keyword, setData] = useState(null);
  const [client, setClient] = useState([]);
  const [media, setMedia] = useState([]);
  const [mediaSelected, setMediaSelected] = useState(null);
  const [clientSelected, setClientSelected] = useState(null);

  const fetchKeywordById = async (keywordId) => {
    const res = await fetch(`${API_KEYWORD.GetKeywords}/${keywordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      fetchMedias(data.data.media_id);
      fetchClients(data.data.client_id);
      setData(data.data);
    }
  };

  const fetchMedias = async (mediaId) => {
    console.log("media id", mediaId);
    //get conversationtype
    const res = await fetch(`${API_URL.GetAllMedia}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      const customData = data.data
        .filter((p) => p.id === mediaId)
        .map((obj, idx) => {
          return {
            label: obj.name,
            value: obj.id,
          };
        });

      if (customData && customData.length > 0) {
        setMedia(customData);
        setMediaSelected(mediaId);
      }
    }
  };

  const fetchClients = async (clientId) => {
    //get conversationtype
    const res = await fetch(`${API_URL.GetAllClient}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      const customData = data.data
        .filter((p) => p.id === clientId)
        .map((obj, idx) => {
          return {
            label: obj.name,
            value: obj.id,
          };
        });

      if (customData && customData.length > 0) {
        console.log(customData);
        setClient(customData);
        setClientSelected(clientId);
      }
    }
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchKeywordById(id);
  }, []);

  return (
    <Layout title="Keyword-Detail">
      <h1>Keyword Detail</h1>
      <Box m={2} p={3}>
        <form>
          <Grid container spacing={8}>
            {
              (keyword,
              client,
              clientSelected && (
                <Grid item xs={3}>
                  <Autocomplete
                    size="small"
                    options={client}
                    getOptionLabel={(option) => option.label}
                    defaultValue={client[0]}
                    disabled
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Client"
                        name="client"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              ))
            }

            {
              (keyword,
              media,
              mediaSelected && (
                <Grid item xs={3}>
                  <Autocomplete
                    size="small"
                    options={media}
                    getOptionLabel={(option) => option.label}
                    defaultValue={media[0]}
                    disabled
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Media"
                        name="media"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              ))
            }

            <Grid item xs={6}></Grid>
            {keyword && (
              <Grid item xs={6}>
                <TextField
                  label="Keyword"
                  id="keyword"
                  name="keyword"
                  defaultValue={keyword.keyword}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}

            <Grid item xs={6}></Grid>

            {keyword && (
              <Grid item xs={4}>
                <TextField
                  label="Sequence"
                  type="number"
                  id="sequence"
                  name="sequence"
                  variant="standard"
                  value={keyword.sequence}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}

            <Grid item xs={8}></Grid>
            {keyword && (
              <Grid item xs={4}>
                <FormControlLabel
                  id="is_active"
                  name="is_active"
                  control={
                    <Checkbox defaultChecked={keyword.is_active} disabled />
                  }
                  label="Is Active"
                />
              </Grid>
            )}

            <Grid item xs={8}></Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}
