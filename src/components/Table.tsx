import Client from "../core/Client";
import { IconEdit, IconTrash } from "./Icons";

interface TableProps {
  clients: Client[];
  clientSelected?: (client: Client) => void;
  clientRemoved?: (client: Client) => void;
}

const Table = (props: TableProps) => {
  const showActions = props.clientSelected || props.clientRemoved;

  const renderHeader = () => {
    return (
      <tr>
        <th className="text-left p-4">ID</th>
        <th className="text-left p-4">Name</th>
        <th className="text-left p-4">Age</th>
        {showActions ? <th className="p-4">Actions</th> : false}
      </tr>
    );
  };

  const renderData = () => {
    return props.clients?.map((client, index) => {
      return (
        <tr
          key={client.id}
          className={`${index % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="text-left p-4">{client.id}</td>
          <td className="text-left p-4">{client.name}</td>
          <td className="text-left p-4">{client.age}</td>
          {showActions ? renderActions(client) : false}
        </tr>
      );
    });
  };

  const renderActions = (client: Client) => {
    return (
      <td className="flex justify-center">
        {props.clientSelected ? (
          <button
            onClick={() => props.clientSelected?.(client)}
            className={`
          flex justify-center items-center
          text-green-600 rounded-full p-2 m-1
          hover:bg-purple-50
        `}
          >
            {IconEdit}
          </button>
        ) : (
          false
        )}
        {props.clientRemoved ? (
          <button
            onClick={() => props.clientRemoved?.(client)}
            className={`
          flex justify-center items-center
          text-red-500 rounded-full p-2 m-1
          hover:bg-purple-50
        `}
          >
            {IconTrash}
          </button>
        ) : (
          false
        )}
      </td>
    );
  };

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead
        className={`
        text-gray-100
        bg-gradient-to-r from-purple-500 to-purple-800
      `}
      >
        {renderHeader()}
      </thead>
      <tbody>{renderData()}</tbody>
    </table>
  );
};

export default Table;
