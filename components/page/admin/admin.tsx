
import MainAdminPage from "./rotes/main/main";
import NotesManagement from "./notes-management";
import UserManagement from "./user-management";

export default function Admin({ subRoute }: { subRoute?: string }) {
  
  if (subRoute == "null") {
    return <MainAdminPage />;
  }
  if(subRoute == "NM"){
    return <NotesManagement/>
  }
  if(subRoute == "UM"){
    return <UserManagement />
  }
  return (null)
}
