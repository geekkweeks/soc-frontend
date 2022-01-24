import React, { useState, useEffect, useQuery } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index";
import SendIcon from "@mui/icons-material/Send";
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

export default function MediaEditPage({ token }) {
  const [progress, setProgress] = useState(false);
  const [values, setValues] = useState(null);

  const router = useRouter();

  const fetchMediaByid = async (mediaId) => {
    const res = await fetch(`${API_URL.GetMedias}/${mediaId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    });

    const data = await res.json();
    if (data && data.status === "success") {
      setValues(data.data)
      console.log(values)
    }
    
  };

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
    delete fieldsRequired.is_active; //isactive is not mandatory

    const hasEmptyField = Object.values(fieldsRequired).some(
      (element) => element === ""
    );

    let needSubmit = true;
    if (hasEmptyField) {
      toast.error("Please fill all fields");
      needSubmit = false;
    }

    if (needSubmit) {
      const res = await fetch(`${API_URL.UpdateMedia}/${values.id}`, {
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
        toast.success("Data has been updated");
        router.push(`/medias`);
      }
    }
    setProgress(false);
  };

  useEffect(() => {
    const id = window.location.href.split("/").pop();
    fetchMediaByid(id);
  }, []);

  return (
    <Layout title="Media-Update">
      <h1>Media - Update</h1>
      <form onSubmit={handleSubmit} method="post">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          {values && (
            <div>
              <TextField
                label="Media"
                id="name"
                name="name"
                variant="standard"
                defaultValue={values.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          {values && (
            <div>
            <FormControlLabel
                id="is_active"
                name="is_active"
                control={
                  <Checkbox
                    defaultChecked={values.is_active}
                    onChange={handleCheckBoxChange}
                  />
                }
                label="Is Active"
              />
            </div>
          )}
        </Box>

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
      </form>
    </Layout>
  );
}
