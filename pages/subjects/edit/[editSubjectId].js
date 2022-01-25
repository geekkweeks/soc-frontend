import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_SUBJECT, API_URL } from "@/config/index";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function EditSubjectPage({ token }) {
  const router = useRouter();

  const [progress, setProgress] = useState(false);

  const [subject, setData] = useState(null);
  const [client, setClient] = useState([]);
  const [clientSelected, setClientSelected] = useState(null);

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
      fetchClients(data.data[0].client_id);
      console.log("data", data.data);
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
      const bindingClientSelected = customData.find(f => f.value === clientId);
      setClientSelected(bindingClientSelected);
      
      console.log(client);
    }
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchSubjectById(id);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...subject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);

    const fieldsRequired = { ...subject };
    delete fieldsRequired.is_active; //ispublished is not mandatory

    const hasEmptyField = Object.values(fieldsRequired).some(
      (element) => element === "" || element === null
    );

    let callAPINeeded = true;
    if (hasEmptyField) {
      console.log("masuk", subject);
      toast.error("Please fill all fields");
      callAPINeeded = false;
    }

    if (callAPINeeded) {
      //CALL API
      const res = await fetch(`${API_SUBJECT.UpdateSubject}/${subject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subject),
      });

      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        const media = await res.json();
        toast.success("Data has been inserted");
        router.push(`/subjects`);
      }
    }

    setProgress(false);
  };

  return (
    <Layout title="Subject-Edit">
      <h1>Edit Subject</h1>

      <Box m={2} p={3}>
        <form onSubmit={handleSubmit} method="post">
          <Grid container spacing={8}>
            {
              (subject,
              client,
              clientSelected && (
                <Grid item xs={4}>
                  <Autocomplete
                    id="disable-close-on-select"
                    size="small"
                    options={client}
                    getOptionLabel={(option) => option.label}
                    defaultValue={clientSelected}
                    onChange={(event, value) =>
                      value !== null
                        ? (subject.client_id = value["value"])
                        : (subject.client_id = null)
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

            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            {subject && (
              <Grid item xs={4}>
                <TextField
                  label="Title"
                  id="title"
                  name="title"
                  value={subject.title}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            )}

            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            {subject && (
              <Grid item xs={4}>
                <TextField
                  label="Color"
                  id="color"
                  name="color"
                  value={subject.color}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            )}

            {subject && (
              <Grid item xs={4}>
                <TextField
                  label="Order No"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  id="order_no"
                  name="order_no"
                  defaultValue={0}
                  value={subject.order_no}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            )}

            <Grid item xs={4}></Grid>
            {subject && (
              <Grid item xs={4}>
                <FormControlLabel
                  id="is_active"
                  name="is_active"
                  control={
                    <Checkbox
                      defaultChecked={subject.is_active}
                      onChange={(e) => (subject.is_active = e.target.checked)}
                    />
                  }
                  label="Is Active"
                />
              </Grid>
            )}

            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
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
          </Grid>
        </form>
      </Box>
    </Layout>
  );
}
