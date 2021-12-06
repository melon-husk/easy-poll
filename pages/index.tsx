import type { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
const Home: NextPage = () => {
  const router = useRouter();
  const handleCreatePoll = () => {
    router.push(`/poll/create`);
  };
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1>Easy Poll</h1>
      <Button onClick={handleCreatePoll}>Create Poll</Button>
    </div>
  );
};

export default Home;
