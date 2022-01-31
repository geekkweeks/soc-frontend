import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL, API_FEED } from "@/config/index";
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
import { parseCookies, getFullDate } from "@/helpers/index";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function FeedEditPage({ token }) {
  const router = useRouter();

  const [progress, setProgress] = useState(false);

  const [feed, setFeed] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [conversationtype, setConversationtype] = useState([]);
  const [talkAbout, setTalkAbout] = useState([]);
  const [client, setClient] = useState([]);
  const [subject, setSubject] = useState([]);
  const [media, setMedia] = useState([]);

  const [takenDate, setTakenDate] = useState(null);
  const [postedDate, setPostedDate] = useState(null);

  const [clientSelected, setClientSelected] = useState(null);
  const [mediaSelected, setMediaSelected] = useState(null);
  const [subjectSelected, setSubjectSelected] = useState(null);
  const [talkAboutSelected, setTalkAboutSelected] = useState(null);
  const [conversationTypeSelected, setConversationTypeSelected] = useState(null);
  const [ageSelected, setAgeSelected] = useState(null);
  const [genderSelected, setGenderSelected] = useState(null);
  const [educationSelected, setEducationSelected] = useState(null);
  const [corporateSelected, setCorporateSelected] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeed({ ...feed, [name]: value });
  };

  const handleInputAnalysisChange = (e) => {
    const { name, value } = e.target;
    setAnalysis({ ...analysis, [name]: value });
  };

  const handleOptionsClientChange = (event, value) => {
    //reset subject value
    setSubject([]);
    if (value != null) {
      feed.client_id = value.value;
      fetchSubjects(value.value);
    } else feed.client_id = null;
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
      setClient(customData);
      const bindingClientSelected = customData?.find(f => f.value == clientId);
      setClientSelected(bindingClientSelected);
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
          label: obj.title,
          value: obj.id,
        };
      });
      setSubject(customData);
    }
  };

  const fetchFeedById = async (feedId) => {
    const response = await axios.get(`${API_FEED.GetFeeds}/${feedId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const restData = response.data.data
    setFeed(restData?.feed);
    setAnalysis(restData?.analysis);
    //set options selected  
    fetchClients(restData?.feed?.client_id);  
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchFeedById(id);
    fetchConversationTypes();
    fetchTalksAbout();    
    fetchMedias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    const payLoad = { feed, analysis };

    const hasEmptyField = Object.values(feed).some(
      (element) => element === "" || element === null
    );

    const hasEmptyAnalysisFields = Object.values(analysis).some(
      (element) => element === "" || element === null
    );

    let callAPINeeded = true;
    if (hasEmptyField) {
      toast.error("Please fill all fields");
      callAPINeeded = false;
    }

    if (callAPINeeded) {
      //CALL API
      const res = await fetch(`${API_FEED.AddFeed}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payLoad),
      });

      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        const media = await res.json();
        toast.success("Data has been inserted");
        router.push(`/feeds`);
      }
    }

    setProgress(false);
  };

  return (
    <Layout title="Feed-Edit">
      <h1>Edit - Feed</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box m={2} p={3}>
          <form onSubmit={handleSubmit} method="post">
            <Grid container spacing={8}>
              {feed, client, clientSelected  && (
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={client}
                    getOptionLabel={(option) => option.label}
                    defaultValue={clientSelected}
                    onChange={(event, value) =>
                      value !== null
                        ? (feed.client_id = value["value"])
                        : (feed.client_id = null)
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
              )}

              {feed && (
                <Grid item xs={3}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={media}
                    onChange={(event, value) =>
                      value !== null
                        ? (feed.media_id = value["value"])
                        : (feed.media_id = null)
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
              )}

              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              {feed && (
                <Grid item xs={3}>
                  <DatePicker
                    label="Taken Date"
                    value={takenDate}
                    dateFromat="YYYY-MM-dd"
                    onChange={(newValue) => {
                      setFeed({ ...feed, taken_date: getFullDate(newValue) });
                      setTakenDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={3}>
                  <DatePicker
                    label="Posted Date"
                    value={postedDate}
                    dateFromat="YYYY-MM-dd"
                    onChange={(newValue) => {
                      setFeed({
                        ...feed,
                        posted_date: getFullDate(newValue),
                      });
                      setPostedDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              )}

              <Grid item xs={6}></Grid>

              {feed && (
                <Grid item xs={3}>
                  <TextField
                    label="Keyword"
                    id="keyword"
                    name="keyword"
                    defaultValue={feed.keyword}
                    value={feed.keyword}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={3}>
                  <TextField
                    label="Title"
                    id="title"
                    name="title"
                    defaultValue={feed.title}
                    value={feed.title}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              <Grid item xs={6}></Grid>
              {feed && (
                <Grid item xs={6}>
                  <TextField
                    label="Caption"
                    id="caption"
                    name="caption"
                    fullWidth
                    multiline
                    maxRows={10}
                    defaultValue={feed.caption}
                    value={feed.caption}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              <Grid item xs={6}></Grid>
              {feed && (
                <Grid item xs={3}>
                  <TextField
                    label="Content"
                    id="content"
                    name="content"
                    defaultValue={feed.content}
                    value={feed.content}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={3}>
                  <TextField
                    label="permalink"
                    id="permalink"
                    name="permalink"
                    defaultValue={feed.permalink}
                    value={feed.permalink}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={3}>
                  <TextField
                    label="Thumblink"
                    id="thumblink"
                    name="thumblink"
                    defaultValue={feed.thumblink}
                    value={feed.thumblink}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              <Grid item xs={3}></Grid>
              {feed && (
                <Grid item xs={2}>
                  <TextField
                    label="Total Replies"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    id="replies"
                    name="replies"
                    defaultValue={feed.thumblink}
                    value={feed.replies}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={2}>
                  <TextField
                    label="Total Views"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    id="views"
                    name="views"
                    defaultValue={feed.views}
                    value={feed.views}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={2}>
                  <TextField
                    label="Total Favs"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    id="favs"
                    name="favs"
                    defaultValue={feed.favs}
                    value={feed.favs}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={2}>
                  <TextField
                    label="Total Likes"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    id="likes"
                    name="likes"
                    value={feed.likes}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={2}>
                  <TextField
                    label="Total Comments"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    id="comment"
                    name="comment"
                    value={feed.comment}
                    variant="standard"
                    onChange={handleInputChange}
                  />
                </Grid>
              )}

              <Grid item xs={2}></Grid>
              {feed && (
                <Grid item xs={2}>
                  <FormControlLabel
                    id="spam"
                    name="spam"
                    control={
                      <Checkbox
                        defaultChecked={feed.spam}
                        onChange={(e) => (feed.spam = e.target.checked)}
                      />
                    }
                    label="Spam"
                  />
                </Grid>
              )}

              {feed && (
                <Grid item xs={4}>
                  <FormControlLabel
                    id="is_active"
                    name="is_active"
                    control={
                      <Checkbox
                        defaultChecked={feed.is_active}
                        onChange={(e) => (feed.is_active = e.target.checked)}
                      />
                    }
                    label="Is Active"
                  />
                </Grid>
              )}
            </Grid>
            <br />
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Analysis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box m={2} p={3}>
                    <Grid container spacing={3}>
                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="disable-close-on-select"
                            size="small"
                            options={subject}
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.subject_id = value["value"])
                                : (analysis.subject_id = null)
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
                      )}

                      <Grid timers xs={9}></Grid>
                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="talkabout"
                            size="small"
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.talk_about = value["value"])
                                : (analysis.talk_about = null)
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
                      )}

                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="disable-close-on-select"
                            size="small"
                            options={conversationtype}
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.conversation_type = value["value"])
                                : (analysis.conversationtype = null)
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
                      )}

                      <Grid item xs={6}></Grid>

                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="disable-close-on-select"
                            size="small"
                            options={ageList}
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.age = value["value"])
                                : (analysis.age = null)
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
                      )}

                      {/* TODO: using Chip component */}
                      {analysis && (
                        <Grid item xs={6}>
                          <TextField
                            label="Tags"
                            id="tags"
                            name="tags"
                            fullWidth
                            value={analysis.tags}
                            variant="standard"
                            onChange={handleInputAnalysisChange}
                          />
                        </Grid>
                      )}

                      <Grid item xs={3}></Grid>

                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="disable-close-on-select"
                            size="small"
                            options={sexList}
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.gender = value["value"])
                                : (analysis.gender = null)
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
                      )}

                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="disable-close-on-select"
                            size="small"
                            options={educationList}
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.education = value["value"])
                                : (analysis.education = null)
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
                      )}

                      {analysis && (
                        <Grid item xs={3}>
                          <Autocomplete
                            id="disable-close-on-select"
                            size="small"
                            options={corporateList}
                            onChange={(event, value) =>
                              value !== null
                                ? (analysis.corporate = value["value"])
                                : (analysis.corporate = null)
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
                      )}

                      {analysis && (
                        <Grid item xs={3}>
                          <TextField
                            label="Location"
                            id="location"
                            name="location"
                            value={analysis.location}
                            variant="standard"
                            onChange={handleInputAnalysisChange}
                          />
                        </Grid>
                      )}

                      {/* End Grid */}
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>

            <br />
            <Button
              type="submit"
              variant="contained"
              disabled={progress}
              endIcon={<SendIcon />}
            >
              Save
            </Button>
            <ToastContainer />
          </form>
        </Box>
      </LocalizationProvider>
    </Layout>
  );
}
