import type { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { Container, Button, Row, Col } from "react-bootstrap";
const Home: NextPage = () => {
  const router = useRouter();
  const handleCreatePoll = () => {
    const id = uuidv4();
    router.push(`/polls/${id}`);
    console.log({ id });
  };
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1>Easy Poll</h1>
      <Button onClick={handleCreatePoll}>Create Poll</Button>
    </div>
  );
};

export default Home;
