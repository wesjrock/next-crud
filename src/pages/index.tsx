import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";

export default function Home() {
  const {
    client,
    clients,
    newClient,
    selectClient,
    removeClient,
    saveClient,
    getAll,
    tableVisible,
    showTable,
  } = useClients();

  return (
    <div
      className={`
        flex justify-center items-center h-screen
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white 
    `}
    >
      <Layout title="Registration">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <Button color="blue" className="mb-4" onClick={newClient}>
                New Client
              </Button>
            </div>
            <Table
              clients={clients}
              clientSelected={selectClient}
              clientRemoved={removeClient}
            ></Table>
          </>
        ) : (
          <Form
            client={client}
            clientChanged={saveClient}
            cancelled={showTable}
          />
        )}
      </Layout>
    </div>
  );
}
