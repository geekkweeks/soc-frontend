import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Layout from "@/components/layout/layout";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
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
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import cookie from "cookie";
import { parseCookies } from "@/helpers/index";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  
  return {
    props: {
      token,
    }, // will be passed to the page component as props
  };
}

const removeItem = (array, item) => {
  const newArray = array.slice();
  newArray.splice(
    newArray.findIndex((a) => a === item),
    1
  );

  return newArray;
};

export default function ClientsPage({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [values, setValues] = useState({
    search: "",
  });

  const fetchClients = async (page, size = perPage) => {
    setLoading(true);

    const response = await axios.get(`${API_URL.GetClients}/${page}/${size}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    setData(response.data.data);
    setTotalRows(response.data.totalRows);
    setLoading(false);
  };

  const handleSearchClient = async () => {
    console.log("value", values.search);
    setLoading(true);
    const payLoad = {
      search: values.search,
      pageNo: 1,
      pageSize: 20,
    };
    

    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      url: `${API_URL.SearchClient}`,
      data: payLoad,
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

  useEffect(() => {
    fetchClients(1);
  }, []);

  const handleDeleteClient = useCallback(
    (row) => async () => {
      const resDelete = await axios.delete(
        `${API_URL.DeleteClient}/${row.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        `${API_URL.GetClients}/${currentPage}/${perPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(removeItem(response.data.data, row));
      setTotalRows(totalRows - 1);
    },
    [currentPage, perPage, totalRows]
  );

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: "id",
        sortable: true,
        omit: true,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "DB",
        selector: "db_name",
        sortable: true,
      },
      {
        name: "Short Name",
        selector: "short_name",
        sortable: true,
      },
      {
        name: "Website",
        selector: "website",
        sortable: true,
      },
      {
        name: "Page Title",
        selector: "pagetitle",
        sortable: true,
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
      },
      {
        name: "Active",
        selector: "is_active",
        cell: (row) =>
          row.is_active ? (
            <IconButton>
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton>
              <CloseIcon />
            </IconButton>
          ),
      },
      {
        cell: (row) => [
          <IconButton aria-label="add" size="small">
            <Link href={`/clients/${row.id}`}>
              <ExpandMoreIcon fontSize="inherit" />
            </Link>
          </IconButton>,
          <IconButton aria-label="edit" size="small">
            <Link href={`/clients/edit/${row.id}`}>
              <EditIcon fontSize="inherit" />
            </Link>
          </IconButton>,
          <IconButton aria-label="delete" size="small">
            <a href="#" onClick={handleDeleteClient(row)}>
              <DeleteIcon fontSize="inherit" />
            </a>
          </IconButton>,
          <IconButton aria-label="delete" size="small">
            <ArchiveIcon fontSize="inherit" />
          </IconButton>,
        ],
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [handleDeleteClient]
  );

  const handlePageChange = (page) => {
    fetchClients(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchClients(page, newPerPage);
    setPerPage(newPerPage);
  };

  const currentSelectedRows = (rows) => {
    console.log("rows", rows);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Clients">
      <h1>Clients</h1>
      <br />
      <Button variant="outlined" startIcon={<AddIcon />}>
        <Link href={`/clients/add`}>Add</Link>
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
                  <a href="#" onClick={() => handleSearchClient()}>
                    <SearchIcon />
                  </a>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <DataTable
        title="Clients"
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
