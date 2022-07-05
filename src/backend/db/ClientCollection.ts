import { dataBase } from "../config";
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";

export default class ClientCollection implements ClientRepository {
  #converter = {
    toFirestore: (client: Client) => {
      return {
        name: client.name,
        age: client.age,
      };
    },
    fromFirestore: (
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      return new Client(data.name, data.age, snapshot.id);
    },
  };

  #clientCollection = collection(dataBase, "clients").withConverter(
    this.#converter
  );

  async save(client: Client): Promise<Client> {
    if (client?.id) {
      await setDoc(
        doc(dataBase, "clients", client.id).withConverter(this.#converter),
        client
      );
      return client;
    } else {
      const docRef = await addDoc(this.#clientCollection, client);
      const doc = await getDoc(docRef);
      return doc.data();
    }
  }

  async delete(client: Client): Promise<void> {
    return await deleteDoc(doc(dataBase, "clients", client.id));
  }

  async getAll(): Promise<Client[]> {
    const clientsCol = this.#clientCollection;
    const clientsSnapshot = await getDocs(clientsCol);
    const clientsList = clientsSnapshot.docs.map((doc) => doc.data()) ?? [];
    return clientsList;
  }
}
