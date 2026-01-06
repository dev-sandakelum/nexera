import React from "react";
import UserProfile from "./Profile-Management";
import { nexeraUsersR } from "@/public/json/users";
import { NexeraUser } from "@/components/types";

export default function Settings() {
  return <UserProfile user={{} as NexeraUser}  />;
}
