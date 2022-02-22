import Link from "next/link";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function Neighborhoods({ neighborhoods }) {
  return (
    <Table variant="simple" mt={10}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Residents</Th>
          <Th>Proposals</Th>
        </Tr>
      </Thead>
      <Tbody>
        {neighborhoods.map((neighborhood) => (
          <Link
            href={`/neighborhood/${neighborhood.address}`}
            passHref
            id={neighborhood.address}
            key={neighborhood.address}
          >
            <Tr
              key={neighborhood.address}
              sx={{
                ":hover": {
                  backgroundColor: "#d53f8c47",
                  cursor: "pointer",
                },
              }}
            >
              <Td>{neighborhood.name}</Td>
              <Td>{neighborhood.residentsCount}</Td>
              <Td>{neighborhood.proposalId}</Td>
            </Tr>
          </Link>
        ))}
      </Tbody>
    </Table>
  );
}

export default Neighborhoods;
