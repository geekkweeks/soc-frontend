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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const [conversationtype, setConversationtype] = useState([]);
  const [talkAbout, setTalkAbout] = useState([]);
  const [client, setClient] = useState([]);
  const [subject, setSubject] = useState([]);
  const [media, setMedia] = useState([]);

  const [takenDate, setTakenDate] = useState(null);
  const [postedDate, setPostedDate] = useState(null);
  //options selected
  const [clientSelected, setClientSelected] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(null);
  const [talkAboutSelected, setTalkAboutSelected] = useState(null);
  const [conversationTypeSelected, setConversationTypeSelected] =
    useState(null);
  const [corporateSelected, setCorporateSelected] = useState(null);
  const [educationSelected, setEducationSelected] = useState(null);
  const [genderSelected, setGenderSelected] = useState(null);
  const [ageSelected, setAgeSelected] = useState(null);
  const [mediaSelected, setMediaSelected] = useState(null);

  const corporateList = [
    {
      label: "Corporate",
      value: "corporate",
    },
    {
      label: "Individual",
      value: "individual",
    },
    {
      label: "Community",
      value: "community",
    },
    {
      label: "Organization",
      value: "organization",
    },
  ];

  const educationList = [
    {
      label: "Elementary School",
      value: "elementary",
    },
    {
      label: "Junior School",
      value: "junior",
    },
    {
      label: "High School",
      value: "high",
    },
    {
      label: "College",
      value: "college",
    },
  ];

  const sexList = [
    {
      label: "Male",
      value: "m",
    },
    {
      label: "Female",
      value: "f",
    },
  ];

  const ageList = [
    {
      label: "Child (5 - 12 years old)",
      value: "child",
    },
    {
      label: "Teenager (13 - 17 years old)",
      value: "teen",
    },
    {
      label: "Young (18 - 25 years old)",
      value: "young",
    },
    {
      label: "Adult (26 - 65 years old)",
      value: "adult",
    },
    {
      label: "Elder (65+ years old)",
      value: "elder",
    },
  ];

  const [values, setValues] = useState({
    client: "",
    client_id: "",
    media_id: "",
    taken_date: "",
    posted_date: "",
    Keyword: "",
    title: "",
    caption: "",
    content: "",
    permalink: "",
    thumblink: "",
    replies: "",
    views: "",
    favs: "",
    likes: "",
    comment: "",
    subject_id: "",
    talk_about_id: "",
    conversation_type_id: "",
    tags: "",
    corporate: "",
    education: "",
    gender: "",
    age: "",
    location: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientSelected);
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

  const fetchMedias = async () => {
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
      const customData = data.data.map((obj, idx) => {
        return {
          label: obj.name,
          value: obj.id,
        };
      });
      setMedia(customData);
    }
  };

  const fetchSubjects = async (clientid) => {
    //get conversationtype
    const res = await fetch(`${API_URL.GetSubjectByClient}/${clientid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      const customData = data.data.map((obj, idx) => {
        return {
          label: obj.title,
          value: obj.id,
        };
      });
      setSubject(customData);
    }
  };

  useEffect(() => {
    fetchConversationTypes();
    fetchTalksAbout();
    fetchClients();
    fetchMedias();
  }, []);

  return (
    <Layout title="Feed-Add">
      <h1>Add New Feed</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box m={2} p={3}>
          <form onSubmit={handleSubmit} method="post">
            <Grid container spacing={8}>
              <Grid item xs={3}>
                <Autocomplete
                  id="disable-close-on-select"
                  size="small"
                  options={client}
                  onChange={(event, value) =>
                    value !== null
                      ? setClientSelected(value["value"])
                      : setClientSelected(null)
                  } // prints the selected value
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
                  size="small"
                  options={media}
                  onChange={(event, value) =>
                    value !== null
                      ? setMediaSelected(value["value"])
                      : setMediaSelected(null)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Media"
                      name="media_id"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}></Grid>
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
                  maxRows={10}
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
                  id="comment"
                  name="comment"
                  value={values.comment}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <br />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Analysis</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={subject}
                    onChange={(event, value) =>
                      value !== null
                        ? setSubjectSelected(value["value"])
                        : setSubjectSelected(null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subject"
                        name="subject"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="talkabout"
                    size="small"
                    onChange={(event, value) =>
                      value !== null
                        ? setTalkAboutSelected(value["value"])
                        : setTalkAboutSelected(null)
                    }
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
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={conversationtype}
                    onChange={(event, value) =>
                      value !== null
                        ? setConversationTypeSelected(value["value"])
                        : setConversationTypeSelected(null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Conversation Type"
                        name="conversation_type"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Tags"
                    id="tags"
                    name="tags"
                    value={values.tags}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={corporateList}
                    onChange={(event, value) =>
                      value !== null
                        ? setCorporateSelected(value["value"])
                        : setCorporateSelected(null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Corporate"
                        name="corporate"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={educationList}
                    onChange={(event, value) =>
                      value !== null
                        ? setEducationSelected(value["value"])
                        : setEducationSelected(null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Education"
                        name="education"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={sexList}
                    onChange={(event, value) =>
                      value !== null
                        ? setGenderSelected(value["value"])
                        : setGenderSelected(null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Gender"
                        name="gender"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={ageList}
                    onChange={(event, value) =>
                      value !== null
                        ? setAgeSelected(value["value"])
                        : setAgeSelected(null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Age"
                        name="age"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Location"
                    id="location"
                    name="location"
                    value={values.location}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
            <br />
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Save
            </Button>
          </form>
        </Box>
      </LocalizationProvider>
    </Layout>
  );
}
