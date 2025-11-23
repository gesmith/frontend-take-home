import React from "react";
import { Tabs, Box } from "@radix-ui/themes";
const UsersTab = React.lazy(() => import("@/components/users/UsersTab"));
const RolesTab = React.lazy(() => import("@/components/roles/RolesTab"));

const UserRoleDirectoryPage = () => {
  return (
    <Tabs.Root defaultValue="users">
      <Tabs.List mb="5">
        <Tabs.Trigger value="users">Users</Tabs.Trigger>
        <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
      </Tabs.List>
      <Box>
        <UsersTab />
        <RolesTab />
      </Box>
    </Tabs.Root>
  );
};

export default UserRoleDirectoryPage;
