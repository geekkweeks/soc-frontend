import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Layout from "@/components/layout/layout";
import DataTable from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {parseCookies} from '@/helpers/index'

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  
  return {
    props: {
      token,
    }, // will be passed to the page component as props
  };
}

export default function FeedsPage({token}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [values, setValues] = useState({
    search: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const fetchFeeds = async (page, size = perPage) => {
    setLoading(true);

    const params = {
      search: values.search,
      pageNo: page,
      pageSize: size,
    };

    axios({
      method: 'post',
      headers:{
        Authorization: `Bearer ${token}`
      },
      url: `${API_URL.SearchFeed}`,
      data: params,
    }).then(
      (response) => {
        console.log(response);
        setData(response.data.data);
        setTotalRows(response.data.totalRows);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchFeeds(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handlePageChange = (page) => {
    fetchFeeds(page);
    setCurrentPage(page);
  };

  const currentSelectedRows = (rows) => {
    console.log("rows", rows);
  };


  useEffect(() => {
    fetchFeeds(1);
  }, []);


  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: "id",
        sortable: true,
        omit: true,
      },
      {
        name: "Client",
        selector: "client_name",
        sortable: true,
      },
      {
        name: "Title",
        selector: "title",
        sortable: true,
      },
      {
        name: "Media",
        selector: "media_name",
        sortable: true,
      },
      {
        name: "Taken Date",
        selector: "taken_date",
        sortable: true,
      },
      {
        name: "Posted Date",
        selector: "posted_date",
        sortable: true,
      },
      {
        name: "Keyword",
        selector: "keyword",
        sortable: true,
      },
      {
        cell: (row) => [
          <IconButton size="small">
            <Link href={`/feeds/${row.id}`}>
              <ExpandMoreIcon fontSize="inherit" />
            </Link>
          </IconButton>
        ],
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },      
    ]
  );

  const handleSearchFeed = () => {
    fetchFeeds(1);
  }

  return (
    <Layout title="clients">
      <h1>Feeds</h1>
      <br />
      <Button variant="outlined" startIcon={<AddIcon />}>
        <Link href={`/feeds/add`}>Add</Link>
      </Button>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        <TextField
          fullWidth
          label="search"
          id="search"
          name="search"
          value={values.search}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <a href="#" onClick={() => handleSearchFeed()}>
                    <SearchIcon />
                  </a>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <DataTable
        title=""
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) =>
          currentSelectedRows(selectedRows)
        }
      />
      <ToastContainer />
    </Layout>
  );
}
