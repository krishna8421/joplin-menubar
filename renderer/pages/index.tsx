import HomeLayout from "../layouts/HomeLayout";
import { useData } from "../hooks/useData";
import MyNotes from "../layouts/MyNotes";
import AddNotes from "../layouts/AddNotes";
import Errors from "../components/Errors";
import GetToken from "../components/GetToken";

const IndexPage = () => {
  const { isJoplinRunning, token } = useData();

  const { activeMenu } = useData();
  if (!isJoplinRunning || !token) {
    return (
      <Errors message="Joplin MenuBar requires Joplin to be running. Please start Joplin and Clipper service and refresh." />
    );
  }
  if (!token) {
    return <GetToken />;
  }
  return (
    <HomeLayout>
      {activeMenu === "add" && <AddNotes />}
      {activeMenu === "all" && <MyNotes />}
    </HomeLayout>
  );
};

export default IndexPage;
