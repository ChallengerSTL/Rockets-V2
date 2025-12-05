import { Box } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import clientPromise from "../lib/mongodb";
import dynamic from "next/dynamic";

// BudgetRequest only runs in the client
const BudgetRequest = dynamic(
  () => import("../components/teacherView/BudgetRequest"),
  { ssr: false }
);

function Home({ requests, admin_code }) {

  return (
    <Box width="100%" position="relative">
      <Navbar />
      <Box width="100%" height="60px" />

      {/* Render real student requests */}
      {requests.length === 0 && (
        <Box color="gray.400" textAlign="center" mt="50px" fontSize="20px">
          No submitted requests yet.
        </Box>
      )}

      {requests.map((req, idx) => (
        <BudgetRequest key={idx} data={req} admin_code={admin_code} />
      ))}

    </Box>
  );
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db("main");

  // Load request submissions
  const requests = await db.collection("requests")
    .find({})
    .sort({ timestamp: -1 })   // newest first
    .toArray();

  // Load admin code
  const admin_code_result = await db.collection("code").find({}).toArray();

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
      admin_code: JSON.parse(JSON.stringify(admin_code_result))[0]["admin_code"],
    },
  };
}

export default Home;
