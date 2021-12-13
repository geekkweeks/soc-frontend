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
import "react-toastify/dist/ReactToastify.css";


const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(newArray.findIndex(a => a === item), 1);
  
    return newArray;
  };

export default function ClientsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchClients = async (page, size = perPage) => {
    console.log("called");
    setLoading(true);

    const response = await axios.get(`${API_URL.GetClients}/${page}/${size}`);
    console.log(response);

    setData(response.data.data);
    setTotalRows(response.data.totalRows);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients(1);
  }, []);

  //   async function handleDeleteClient(clientId) {
  //     console.log("delete client", clientId);
  //     if (confirm("Are you sure?")) {
  //       const res = await fetch(`${API_URL.DeleteClient}/${clientId}`, {
  //         method: "DELETE",
  //       });

  //       if (!res.ok) {
  //         toast.error("Something went wrong");
  //       } else {
  //         const client = await res.json();
  //         toast.success("Data has been removed");
  //       }
  //     }
  //   }

  const handleDeleteClient = useCallback(
    (row) => async () => {
      const resDelete = await axios.delete(`${API_URL.DeleteClient}/${row.Id}`);
      const response = await axios.get(
        `${API_URL.GetClients}/${currentPage}/${perPage}`
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
        selector: "Id",
        sortable: true,
        omit: true,
      },
      {
        name: "Name",
        selector: "Name",
        sortable: true,
      },
      {
        name: "Short Name",
        selector: "ShortName",
        sortable: true,
      },
      {
        name: "Website",
        selector: "Website",
        sortable: true,
      },
      {
        name: "Page Title",
        selector: "PageTitle",
        sortable: true,
      },
      {
        name: "Description",
        selector: "Description",
        sortable: true,
      },
      {
        cell: (row) => [
          <IconButton aria-label="add" size="small">
            <Link href={`/clients/${row.Id}`}>
              <ExpandMoreIcon fontSize="inherit" />
            </Link>
          </IconButton>,
          <IconButton aria-label="edit" size="small">
            <Link href={`/clients/edit/${row.Id}`}>
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

  return (
    <Layout title="Clients">
      <h1>Clients</h1>
      <br />
      <Button variant="outlined" startIcon={<AddIcon />}>
        <Link href={`/clients/add`}>Add</Link>
      </Button>
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
        onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
      />
      <ToastContainer />
    </Layout>
  );
}
