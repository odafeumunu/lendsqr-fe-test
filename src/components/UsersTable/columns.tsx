import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../types/user";
import StatusBadge from "../StatusBadge/StatusBadge";
import ActionMenu from "../ActionMenu/ActionMenu";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "organization",
    header: "Organization",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <StatusBadge status={getValue() as User["status"]} />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <ActionMenu userId={row.original.id} />,
    enableSorting: false,
  },
];
