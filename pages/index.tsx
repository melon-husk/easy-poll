import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  const handleCreatePoll = () => {
    router.push(`/poll/create`);
  };
  //TODO: Fix semibold font behavior
  return (
    <div className="grid h-screen text-light-purple place-items-center">
      <div className="grid grid-flow-row gap-y-16">
        <h1 className="mb-2 text-5xl font-normal text-center">Easy Poll</h1>
        <button
          className="px-5 py-2 text-4xl font-normal text-black transition-all duration-200 bg-light-purple rounded-2xl hover:bg-opacity-75 active:bg-opacity-50"
          onClick={handleCreatePoll}
        >
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default Home;
