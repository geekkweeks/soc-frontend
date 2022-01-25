import React, { useState } from "react";
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
import { parseCookies } from "@/helpers/index";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default function ClientAddPage({ token }) {
  const [progress, setProgress] = useState(false);
  const [values, setValues] = useState({
    name: "",
    short_name: "",
    website: "",
    pagetitle: "",
    description: "",
    logo_url: "",
    is_active: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    const fieldsRequired = { ...values };
    delete fieldsRequired.is_active; //ispublished is not mandatory

    const hasEmptyField = Object.values(fieldsRequired).some(
      (element) => element === ""
    );

    let needCallAPI = true;
    if (hasEmptyField) {
      toast.error("Please fill all fields");
      needCallAPI = false;
    }

    if (!/^[a-zA-Z]+$/.test(values.short_name)) {
      toast.error("Short name allowed letter and without space only");
      needCallAPI = false;
    }

    if (needCallAPI) {
      //check DB by shortName is exist
      const resCheckDb = await fetch(`${API_URL.ClientCheckDBExist}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shortName: values.short_name }),
      });

      if (!resCheckDb.ok) {
        toast.error("Something went wrong");
      } else {
        const dataCheckDb = await resCheckDb.json();
        if (dataCheckDb && !dataCheckDb.data) {
          //call api insert new data
          const res = await fetch(`${API_URL.AddClient}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          });

          if (!res.ok) {
            toast.error("Something went wrong");
          } else {
            const client = await res.json();
            toast.success("Data has been inserted");
            router.push(`/clients`);
          }
        } else
          toast.error(
            `Database with name db_${values.short_name} already exist`
          );
      }
    }

    setProgress(false);
  };
  return (
    <Layout title="Client-Add">
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit} method="post">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <div>
            <TextField
              label="Name"
              id="name"
              name="name"
              value={values.name}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Short Name"
              id="short_name"
              name="short_name"
              value={values.short_name}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Website"
              id="website"
              name="website"
              value={values.website}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="PageTitle"
              id="pagetitle"
              name="pagetitle"
              value={values.pagetitle}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Description"
              id="description"
              name="description"
              style={{ width: 500 }}
              multiline
              rows={2}
              maxRows={Infinity}
              value={values.description}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Logo Url"
              id="logo_url"
              name="logo_url"
              value={values.logo_url}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <FormControlLabel
              id="is_active"
              name="is_active"
              control={
                <Checkbox
                  defaultChecked={false}
                  onChange={handleCheckBoxChange}
                />
              }
              label="Is Active"
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              disabled={progress}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
            <ToastContainer />
          </div>
        </Box>
      </form>
    </Layout>
  );
}
