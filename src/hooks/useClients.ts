import { useEffect, useState } from "react";
import ClientCollection from "../backend/db/ClientCollection";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import useTableOrForm from "./useTableOrForm";

const useClients = () => {
  const repo: ClientRepository = new ClientCollection();

  const { tableVisible, showForm, showTable } = useTableOrForm();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);

  const getAll = () => {
    repo.getAll().then((clients) => {
      setClients(clients);
      showTable();
    });
  };

  useEffect(getAll, []);

  const selectClient = (client: Client) => {
    setClient(client);
    showForm();
  };

  const removeClient = async (client: Client) => {
    await repo.delete(client);
    getAll();
  };

  const newClient = () => {
    setClient(Client.empty());
    showForm();
  };

  const saveClient = async (client: Client) => {
    await repo.save(client);
    getAll();
  };

  return {
    client,
    clients,
    newClient,
    selectClient,
    removeClient,
    saveClient,
    getAll,
    tableVisible,
    showTable,
  };
};

export default useClients;
