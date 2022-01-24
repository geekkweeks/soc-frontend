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
import { API_URL, API_SUBJECT } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
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

export default function SubjectsPage({ token }) {
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

  const fetchSubjects = async (page, size = perPage) => {
    setLoading(true);

    const payLoad = {
      search: values.search,
      pageNo: page,
      pageSize: size,
    };

    console.log(payLoad);

    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${API_SUBJECT.SearchSubject}`,
      data: payLoad,
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

  const handleSearchSubject = () => {
    fetchSubjects(1);
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

  const handleDeleteSubject = useCallback(
    (row) => async () => {
      const resDelete = await axios.delete(
        `${API_SUBJECT.DeleteSubject}/${row.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        `${API_SUBJECT.GetSubject}/${currentPage}/${perPage}`,
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

  useEffect(() => {
    fetchSubjects(1);
  }, []);

  const columns = useMemo(() => [
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
      name: "Order No",
      selector: "order_no",
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
          <Link href={`/subjects/${row.id}`}>
            <ExpandMoreIcon fontSize="inherit" />
          </Link>
        </IconButton>,
        <IconButton aria-label="edit" size="small">
          <Link href={`/subjects/edit/${row.id}`}>
            <EditIcon fontSize="inherit" />
          </Link>
        </IconButton>,
        <IconButton aria-label="delete" size="small">
          <a href="#" onClick={handleDeleteSubject(row)}>
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
  ]);
  

  return (
    <Layout title="subjects">
      <h1>Subjects</h1>
      <br />
      <Button variant="outlined" startIcon={<AddIcon />}>
        <Link href={`/subjects/add`}>Add</Link>
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
                  <a href="#" onClick={() => handleSearchSubject()}>
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
