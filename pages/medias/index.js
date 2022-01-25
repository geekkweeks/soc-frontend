import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Layout from "@/components/layout/layout";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { API_URL } from "@/config/index";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { parseCookies } from "@/helpers/index";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
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

export default function MediaPage({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [values, setValues] = useState({
    search: "",
  });

  const fetchMedias = async (page, size = perPage) => {
    setLoading(true);

    const params = {
      search: values.search,
      pageNo: page,
      pageSize: size,
    };

    axios({
      method: "post",
      url: `${API_URL.SearchMedia}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: params,
    }).then(
      (response) => {
        setData(response.data.data);
        setTotalRows(response.data.totalRows);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSearchMedia = () => {
    fetchMedias(1);
  };

  useEffect(() => {
    fetchMedias(1);
  }, []);

  const handleDeleteMedia = useCallback(
    (row) => async () => {
      const resDelete = await axios.delete(`${API_URL.DeleteMedia}/${row.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get(
        `${API_URL.GetMedias}/${currentPage}/${perPage}`,
        {
          headers: {
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
        name: "Media",
        selector: "name",
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
          <IconButton aria-label="" size="small">
            <Link href={`/medias/${row.id}`}>
              <ExpandMoreIcon fontSize="inherit" />
            </Link>
          </IconButton>,
          <IconButton aria-label="" size="small">
            <Link href={`/medias/edit/${row.id}`}>
              <EditIcon fontSize="inherit" />
            </Link>
          </IconButton>,
          <IconButton aria-label="delete" size="small">
            <a href="#" onClick={handleDeleteMedia(row)}>
              <DeleteIcon fontSize="inherit" />
            </a>
          </IconButton>,
        ],
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [handleDeleteMedia]
  );

  const handlePageChange = (page) => {
    fetchMedias(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchMedias(page, newPerPage);
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
    <Layout title="">
      <h1>Media</h1>
      <br />
      <Button variant="outlined" startIcon={<AddIcon />}>
        <Link href={`/medias/add`}>Add</Link>
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
                  <a href="#" onClick={() => handleSearchMedia()}>
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
