import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { API_SUBJECT } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import Grid from "@mui/material/Grid";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function SubjectDetailPage({ token }) {
  const [subject, setData] = useState(null);

  const fetchSubjectById = async (subjectId) => {
    const res = await fetch(`${API_SUBJECT.GetSubject}/${subjectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setData(data.data[0]);
      console.log('data', data.data)
    }
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchSubjectById(id);
  }, []);

  return (
    <Layout title="Subject-Detail">
      <h1>Detail - Subject</h1>
     
      <Box m={2} p={3}>
        <Grid container spacing={8}>
            {subject && (
                <Grid item xs={4}>
                <TextField
                  label="Client"
                  defaultValue={subject.client_name}
                  variant="standard"
                  fullWidth 
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

            )}
            {subject && (
                <Grid item xs={4}>
                <TextField
                  label="Client"
                  defaultValue={subject.title}
                  variant="standard"
                  fullWidth 
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

            )}
            {subject && (
                <Grid item xs={4}>
                <TextField
                  label="Color"
                  defaultValue={subject.color}
                  variant="standard"
                  fullWidth 
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

            )}
            {subject && (
                <Grid item xs={4}>
                <TextField
                  label="Order No"
                  defaultValue={subject.order_no}
                  variant="standard"
                  fullWidth 
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

            )}
            <Grid item xs={8}></Grid>
            {subject && (
                <Grid item xs={4}>
                <FormControlLabel
                  id="is_active"
                  name="is_active"
                  control={
                    <Checkbox defaultChecked={subject.is_active} disabled />
                  }
                  label="Is Active"
                />
              </Grid>

            )}
        </Grid>
      </Box>
    </Layout>
  );
}
