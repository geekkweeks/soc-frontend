import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { parseCookies } from "@/helpers/index";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function FeedAddPage({ token }) {
  const [takenDate, setTakenDate] = useState(null);
  const [postedDate, setPostedDate] = useState(null);
  const [conversationtype, setConversationtype] = useState(null);
  const [talkAbout, setTalkAbout] = useState(null);
  const [client, setClient] = useState(null);

  const [values, setValues] = useState({
    name: "",
    short_name: "",
    website: "",
    pagetitle: "",
    description: "",
    logo_url: "",
    is_active: "",
    media: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleOptionsConversationTypeChange = (event, value) => {
    const { name } = "media";
    setValues({ ...values, [name]: value["value"] });
    console.log(value["value"]);
    console.log(values);
  };
  const handleOptionsTalksAboutChange = (event, value) => {
    console.log(value["value"]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const fetchConversationTypes = async () => {
    //get conversationtype
    const res = await fetch(`${API_URL.GetConversationTypes}`, {
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
      setConversationtype(customData);
    }
  };

  const fetchTalksAbout = async () => {
    //get conversationtype
    const res = await fetch(`${API_URL.TalksAbout}`, {
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
      setTalkAbout(customData);
    }
  };

  const fetchClients = async () => {
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
      setClient(customData);
    }
  };

  useEffect(() => {
    fetchConversationTypes();
    fetchTalksAbout();
    fetchClients();
  }, []);

  return (
    <Layout title="Feed-Add">
      <h1>Add New Feed</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit} method="post">
            <Grid container spacing={8}>
              <Grid item xs={3}>
                <Autocomplete
                  id="disable-close-on-select"
                  options={conversationtype}
                  onChange={handleOptionsConversationTypeChange} // prints the selected value
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
              <Grid item xs={3}>
                <Autocomplete
                  id="disable-close-on-select"
                  options={conversationtype}
                  onChange={handleOptionsConversationTypeChange} // prints the selected value
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="media"
                      name="media"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  sx={{ width: 300 }}
                  id="talkabout"
                  options={talkAbout}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Talk About"
                      name="talkabout"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <DatePicker
                  label="Taken Date"
                  value={takenDate}
                  onChange={(newValue) => {
                    setTakenDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={3}>
                <DatePicker
                  label="Posted Date"
                  value={postedDate}
                  onChange={(newValue) => {
                    setPostedDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
                <TextField
                  label="Keyword"
                  id="keyword"
                  name="keyword"
                  value={values.keyword}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Title"
                  id="title"
                  name="title"
                  value={values.title}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <TextField
                  label="Caption"
                  id="caption"
                  name="caption"
                  fullWidth
                  multiline
                  rows={2}
                  maxRows={Infinity}
                  value={values.caption}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
                <TextField
                  label="Content"
                  id="content"
                  name="content"
                  value={values.content}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="permalink"
                  id="permalink"
                  name="permalink"
                  value={values.permalink}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Thumblink"
                  id="thumblink"
                  name="thumblink"
                  value={values.thumblink}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                <TextField
                  label="Total Replies"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="replies"
                  name="replies"
                  value={values.replies}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Total Views"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="views"
                  name="views"
                  value={values.views}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Total Favs"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="favs"
                  name="favs"
                  value={values.favs}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Total Likes"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="likes"
                  name="likes"
                  value={values.likes}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Total Comments"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="comments"
                  name="comments"
                  value={values.comments}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <TextField
                  label="Age"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="age"
                  name="age"
                  value={values.age}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Education"
                  id="edu"
                  name="edu"
                  value={values.edu}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </LocalizationProvider>
    </Layout>
  );
}
