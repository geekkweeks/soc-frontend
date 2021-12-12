import React, { useState,useEffect  } from "react";
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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientAddPage() {
  const [values, setValues] = useState({
    name: "",
    shortName: "",
    website: "",
    pageTitle: "",
    description: "",
    logoUrl: "",
    isPublished: "",
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
    console.log(values);

    const hasEmptyField = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyField) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch(`${API_URL.AddClient}`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });

    if(!res.ok){
      toast.error("Something went wrong");
    }else{
      const client = await res.json();
      console.log(client);
      toast.success("Data has been inserted");
      router.push(`/clients/${client.data.Id}`);
    }

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
              id="shortName"
              name="shortName"
              value={values.shortName}
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
              id="pageTitle"
              name="pageTitle"
              value={values.pageTitle}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Description"
              id="description"
              name="description"
              value={values.description}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              label="Logo Url"
              id="logoUrl"
              name="logoUrl"
              value={values.logoUrl}
              variant="standard"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <FormControlLabel
              id="isPublished"
              name="isPublished"
              control={
                <Checkbox
                  defaultChecked={false}
                  onChange={handleCheckBoxChange}
                />
              }
              label="Label"
            />
          </div>
          <div>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
            <ToastContainer />
          </div>
        </Box>
      </form>
    </Layout>
  );
}


