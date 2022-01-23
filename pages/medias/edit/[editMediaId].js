import React, { useState, useEffect, useQuery } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import { parseCookies } from "@/helpers/index";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    }, 
  };
}

export default function MediaEditPage() {
  return <div></div>;
}
