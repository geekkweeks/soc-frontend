import React, { useEffect  } from "react";
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
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ClientsPage({ clients }) {

  async function deleteClient(clientId) {
    console.log('delete client', clientId);
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL.DeleteClient}/${clientId}`,{
        method: "DELETE"
      });
  
      if(!res.ok){
        toast.error("Something went wrong");
      }else{
        const client = await res.json();
        toast.success("Data has been removed");
        
      }
    }
  }

  useEffect(() => {
  });

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      omit: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row) => row.shortName,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.website,
      sortable: true,
    },
    {
      name: "Page Title",
      selector: (row) => row.pageTitle,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
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
          <a href="#" onClick={() => deleteClient(row.id)}>
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
  ];

  const data = clients.map((item) => {
    const container = {};
    container.id = item.Id;
    container.name = item.Name;
    container.shortName = item.ShortName;
    container.website = item.PageTitle;
    container.pageTitle = item.PageTitle;
    container.description = item.Description;
    return container;
  });

  return (
    <Layout title="Clients">
      <h1>Clients</h1>
      <br />
      {clients.length === 0 && <h3>No clients to show</h3>}
      <Button variant="outlined" startIcon={<AddIcon />}>
        <Link href={`/clients/add`}>Add</Link>
      </Button>
      <DataTable columns={columns} data={data} pagination />
      <ToastContainer />
    </Layout>
  );
}

//CALL API
export async function getServerSideProps() {
  const res = await fetch(API_URL.GetClients);
  const clients = await res.json();
  return {
    props: { clients },
  };
}
