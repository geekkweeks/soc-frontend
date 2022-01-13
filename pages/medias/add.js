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

export default function MediaAddPage() {
  const [values, setValues] = useState({
    name: "",
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
    const fieldsRequired = { ...values };
    delete fieldsRequired.is_active; //ispublished is not mandatory

    console.log("fieldRequired", fieldsRequired);

    const hasEmptyField = Object.values(fieldsRequired).some(
      (element) => element === ""
    );

    if (hasEmptyField) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch(`${API_URL.AddMedia}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const media = await res.json();
      toast.success("Data has been inserted");
      router.push(`/media/${media.data.id}`);
    }
  };

  return (
    <Layout title="Media-Add">
      <h1>Add Media</h1>
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
