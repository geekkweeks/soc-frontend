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

export default function KeywordEditPage({ token }) {
  const [progress, setProgress] = useState(false);

  const [client, setClient] = useState([]);

  const [media, setMedia] = useState([]);

  const router = useRouter();

  const [values, setValues] = useState(null);

  const [mediaSelected, setMediaSelected] = useState(null);

  const [clientSelected, setClientSelected] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const fetchMedias = async (mediaId) => {
    const res = await fetch(`${API_URL.GetAllMedia}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      const customData = data.data.map((obj, idx) => {
        return {
          label: obj.name,
          value: obj.id,
        };
      });

      if (customData && customData.length > 0) {
        setMedia(customData);
        const clientDefaultSelected = customData.find(
          (f) => f.value == mediaId
        );
        setMediaSelected(clientDefaultSelected);
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
      const customData = data.data.map((obj, idx) => {
        return {
          label: obj.name,
          value: obj.id,
        };
      });

      if (customData && customData.length > 0) {
        setClient(customData);
        const clientDefaultSelected = customData.find(
          (f) => f.value == clientId
        );
        setClientSelected(clientDefaultSelected);
      }
    }
  };

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

      const customKeywordData = {
        id: data.data.id,
        client_id: data.data.client_id,
        is_active: data.data.is_active,
        keyword: data.data.keyword,
        media_id: data.data.media_id,
        sequence: data.data.sequence,
      };

      console.log(customKeywordData);

      setValues(customKeywordData);
      console.log(values);
    }
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchKeywordById(id);
  }, []);

  const handleSubmit = async (e) => {
    console.log(values);
    e.preventDefault();
    console.log(values);
    setProgress(true);

    const fieldsRequired = { ...values };
    delete fieldsRequired.is_active; //ispublished is not mandatory

    const hasEmptyField = Object.values(fieldsRequired).some(
      (element) => element === "" || element === null
    );

    if (hasEmptyField) {
      toast.error("Please fill all fields");
      setProgress(false);
      return;
    }

    //CALL API
    const res = await fetch(`${API_KEYWORD.UpdateKeyword}/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const media = await res.json();
      toast.success("Data has been inserted");
      router.push(`/keywords`);
    }

    setProgress(false);
  };

  return (
    <Layout title="Keyword-Update">
      <h1>Update Keyword</h1>
      <Box m={2} p={3}>
        <form onSubmit={handleSubmit} method="post">
          <Grid container spacing={8}>
            {
              (values,
              client,
              clientSelected && (
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={client}
                    defaultValue={clientSelected}
                    onChange={(event, value) =>
                      value !== null
                        ? (values.client_id = value["value"])
                        : (values.client_id = null)
                    }
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
              (values,
              client,
              mediaSelected && (
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={media}
                    defaultValue={mediaSelected}
                    onChange={(event, value) =>
                      value !== null
                        ? (values.media_id = value["value"])
                        : (values.media_id = null)
                    }
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
            {values && (
              <Grid item xs={6}>
                <TextField
                  label="Keyword"
                  id="keyword"
                  name="keyword"
                  value={values.keyword}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            )}

            <Grid item xs={6}></Grid>
            {values && (
              <Grid item xs={4}>
                <TextField
                  label="Sequence"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="sequence"
                  name="sequence"
                  defaultValue={values.sequence}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            )}

            <Grid item xs={8}></Grid>
            {values && (
              <Grid item xs={4}>
                <FormControlLabel
                  id="is_active"
                  name="is_active"
                  control={
                    <Checkbox
                      defaultChecked={values.is_active}
                      onChange={(e) => (values.is_active = e.target.checked)}
                    />
                  }
                  label="Is Active"
                />
              </Grid>
            )}

            <Grid item xs={8}></Grid>
            {values && (
              <Grid item xs={3}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={progress}
                  endIcon={<SendIcon />}
                >
                  Save
                </Button>
                <ToastContainer />
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}
