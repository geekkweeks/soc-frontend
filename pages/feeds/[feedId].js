import React, { useState, useEffect, useQuery } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import axios from "axios";

export default function FeedDetailPage() {
    const [feed, setData] = useState(null);

    const fetchFeedById = async (feedId) => {
        const response = await axios.get(`${API_URL.GetFeeds}/${feedId}`);
        setData(response.data.data);
      };

      useEffect(() => {
        const id = window.location.href.split("/").pop();
        fetchFeedById(id);
      }, []);

    return (
        <Layout title="Feed-View">

        </Layout>
    )
}
