import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { API_FEED, API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function FeedDetailPage({ token }) {
  const [feed, setData] = useState(null);

  const fetchFeedById = async (feedId) => {
    const response = await axios.get(`${API_FEED.GetFeeds}/${feedId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.data);
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchFeedById(id);
  }, []);

  return (
    <Layout title="Feed-View">
      <h1>Detail - Feed</h1>
      <Box m={2} p={3}>
        <Grid container spacing={6}>
          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Client"
                defaultValue={feed.client_name}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Media"
                defaultValue={feed.media_name}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Media"
                defaultValue={feed.media_name}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Media"
                defaultValue={feed.taken_date}
                variant="standard"
                fullWidth
                InputProps={
                  ({
                    readOnly: true,
                  },
                  {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon />
                      </InputAdornment>
                    ),
                  })
                }
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Media"
                defaultValue={feed.posted_date}
                variant="standard"
                fullWidth
                InputProps={
                  ({
                    readOnly: true,
                  },
                  {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon />
                      </InputAdornment>
                    ),
                  })
                }
              />
            </Grid>
          )}

          <Grid item xs={4}></Grid>

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Keyword"
                defaultValue={feed.keyword}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Title"
                defaultValue={feed.title}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          <Grid item xs={4}></Grid>

          {feed && (
            <Grid item xs={12}>
              <TextField
                id="standard-multiline-static"
                label="Caption"
                multiline
                fullWidth
                rows={3}
                defaultValue={feed.caption}
                variant="standard"
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Content"
                defaultValue={feed.content}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Permalink"
                defaultValue={feed.permalink}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={4}>
              <TextField
                label="Thumblink"
                defaultValue={feed.thumblink}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={2}>
              <TextField
                label="Total Replies"
                defaultValue={feed.replies}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={2}>
              <TextField
                label="Total Views"
                defaultValue={feed.views}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={2}>
              <TextField
                label="Total Favs"
                defaultValue={feed.favs}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={2}>
              <TextField
                label="Total Likes"
                defaultValue={feed.likes}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={2}>
              <TextField
                label="Total Comments"
                defaultValue={feed.comment}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}

          <Grid item xs={2}></Grid>

          {feed && (
            <Grid item xs={2}>
              <FormControlLabel
                control={<Checkbox defaultChecked={feed.is_active} disabled />}
                label="Is Active"
              />
            </Grid>
          )}

          {feed && (
            <Grid item xs={2}>
              <FormControlLabel
                control={<Checkbox defaultChecked={feed.spam} disabled />}
                label="Spam"
              />
            </Grid>
          )}

          <Grid item xs={8}></Grid>
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
                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Subject"
                        defaultValue={feed.subject_name}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Talk About"
                        defaultValue={feed.talk_about}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Conversation Type"
                        defaultValue={feed.conversation_type}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Tags"
                        defaultValue={feed.tags}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Corporate"
                        defaultValue={feed.corporate}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Education"
                        defaultValue={feed.education}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Gender"
                        defaultValue={feed.gender}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Gender"
                        defaultValue={feed.age}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}

                  {feed && (
                    <Grid item xs={4}>
                      <TextField
                        label="Location"
                        defaultValue={feed.location}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </Layout>
  );
}
