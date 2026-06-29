"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Avatar, Button, Input, Table } from "@heroui/react";

import {
  Search,
  ShieldBan,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

import { toast } from "sonner";
import { updateUserBlockStatus } from "@/lib/actions/users";


export default function ManageUsersTable({ users }) {
  const [search, setSearch] = useState("");
  const [tableUsers, setTableUsers] = useState(users);
  const [loadingId, setLoadingId] = useState("");

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase();

    return tableUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword)
    );
  }, [search, tableUsers]);

  const handleBlockToggle = async (user) => {
    try {
      setLoadingId(user._id);

      const result = await updateUserBlockStatus(
        user._id,
        !user.isBlocked
      );

      if (result.modifiedCount) {
        setTableUsers((prev) =>
          prev.map((item) =>
            item._id === user._id
              ? {
                  ...item,
                  isBlocked: !item.isBlocked,
                }
              : item
          )
        );

        toast.success(
          user.isBlocked
            ? "User unblocked successfully."
            : "User blocked successfully."
        );
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId("");
    }
  };

    return (
          <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#0f1a0f]">
            Platform Users
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Block or unblock platform accounts.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Platform Users"
            className="min-w-[900px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>User</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {filteredUsers.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                     <Avatar>
  <Avatar.Image
    src={user.image}
    alt={user.name}
  />
  <Avatar.Fallback>
    {user.name?.charAt(0)?.toUpperCase() || "U"}
  </Avatar.Fallback>
</Avatar>
                      <span className="font-medium">
                        {user.name}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="capitalize">
                      {user.role}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>{user.email}</Table.Cell>

                  <Table.Cell>
                    <Button
                      variant="flat"
                      color={user.isBlocked ? "success" : "danger"}
                      isDisabled={loadingId === user._id}
                      onPress={() => handleBlockToggle(user)}
                    >
                      {loadingId === user._id ? (
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                      ) : user.isBlocked ? (
                        <>
                          <ShieldCheck size={18} />
                          Unblock
                        </>
                      ) : (
                        <>
                          <ShieldBan size={18} />
                          Block
                        </>
                      )}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}