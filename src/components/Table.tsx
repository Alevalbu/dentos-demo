'use client';
import { useState, useEffect, useCallback } from "react";
import { User, TableProps } from "../types/user";
import Modal from "./Modal";
import { useFilters } from "../hook/filter";
import {
  TableContainer,
  StyledTable,
  Th,
  Td,
  ModalTitle,
  DetailsGrid,
  AddressDetails,
  DetailLink,
} from "./Table.styles";
import { styled } from "@stitches/react";

const Flex = styled("div", {
  display: "flex",
  "flex-direction": "row",
  gap: "8px",
  alignItems: "center",
  justifyContent: "center",
  margin: "16px 0",
  color: 'white',
});

const FilterContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "16px",
  marginBottom: "20px",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  color: 'black',
});

const FilterGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  color: 'black',
});

const Table: React.FC<TableProps> = ({
  data = [],
  pageSize = 10,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentData, setCurrentData] = useState<User[]>([]);

  const { filteredData, filterValues, handleFilterChange, resetFilters } =
    useFilters(data);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData.length]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);
    setCurrentData(filteredData.slice(startIndex, endIndex))
  }, [currentPage, filteredData, pageSize]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return "Invalid date";
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const renderUserDetails = useCallback(
    (user: User) => {
      return (
        <div>
          <ModalTitle>Full Details</ModalTitle>
          <DetailsGrid>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Date of Birth:</strong> {formatDate(user.dob)}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Telephone:</strong> {user.telephone}
            </div>
            <div>
              <strong>Verified:</strong> {user.verified ? "✓" : "✗"}
            </div>
            <div>
              <strong>Salary:</strong> {user.salary}
            </div>
            <div>
              <strong>Score:</strong> {user.score}
            </div>
            <div>
              <strong>URL:</strong>
              <DetailLink
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.url}
              </DetailLink>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong>Address:</strong>
              <AddressDetails>
                {Object.values(user.address).join(", ")}
              </AddressDetails>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong>Pets:</strong> {user.pets.join(", ")}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong>Description:</strong> {user.description}
            </div>
          </DetailsGrid>
        </div>
      );
    },
    [formatDate]
  );

  if (isLoading) {
    return <div>Is Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No Data Available</div>;
  }

  return (
    <div style={{width: '60vw'}}>
      <FilterContainer>
        <FilterGroup>
          <label htmlFor="name-filter">Name</label>
          <input
            id="name-filter"
            name="name"
            type="text"
            value={filterValues.name}
            onChange={handleFilterChange}
            placeholder="Filter by name"
          />
        </FilterGroup>

        <FilterGroup>
          <label htmlFor="email-filter">Email</label>
          <input
            id="email-filter"
            name="email"
            type="text"
            value={filterValues.email}
            onChange={handleFilterChange}
            placeholder="Filter by email"
          />
        </FilterGroup>

        <FilterGroup>
          <label htmlFor="verified-filter">Verification Status</label>
          <select
            id="verified-filter"
            name="verified"
            value={filterValues.verified}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Score Range</label>
          <Flex>
            <input
              name="scoreMin"
              min={0}
              type="number"
              value={filterValues.scoreMin}
              onChange={handleFilterChange}
              placeholder="Min"
              style={{ width: "80px" }}
            />
            <span>to</span>
            <input
              name="scoreMax"
              max={10}
              type="number"
              value={filterValues.scoreMax}
              onChange={handleFilterChange}
              placeholder="Max"
              style={{ width: "80px" }}
            />
          </Flex>
        </FilterGroup>

        <FilterGroup>
          <label>Salary Range</label>
          <Flex>
            <input
              name="salaryMin"
              type="number"
              value={filterValues.salaryMin}
              onChange={handleFilterChange}
              placeholder="Min"
              style={{ width: "80px" }}
            />
            <span>to</span>
            <input
              name="salaryMax"
              type="number"
              value={filterValues.salaryMax}
              onChange={handleFilterChange}
              placeholder="Max"
              style={{ width: "80px" }}
            />
          </Flex>
        </FilterGroup>

        <FilterGroup style={{ justifyContent: "flex-end" }}>
          <button onClick={resetFilters}>Reset Filters</button>
        </FilterGroup>
      </FilterContainer>

      {filteredData.length === 0 ? (
        <div>No Data Found with current filters</div>
      ) : (
        <TableContainer>
          <StyledTable role="table" aria-label="Users table">
            <thead>
              <tr>
                <Th></Th>
                <Th>Name</Th>
                <Th>Date of Birth</Th>
                <Th>Email</Th>
                <Th>Verified</Th>
                <Th>Salary</Th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user) => (
                <tr
                  key={user._id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleRowClick(user);
                    }
                  }}
                  role="row"
                  aria-label={user.name}
                  aria-selected={selectedUser?._id === user._id}
                  style={{ cursor: "pointer" }}
                >
                    <Th><input type='checkbox'/></Th>
                  <Td onClick={() => handleRowClick(user)}>{user.name}</Td>
                  <Td onClick={() => handleRowClick(user)}>{formatDate(user.dob)}</Td>
                  <Td onClick={() => handleRowClick(user)}>{user.email}</Td>
                  <Td onClick={() => handleRowClick(user)} aria-label={user.verified ? "Verified" : "Not Verified"}>
                    {user.verified ? "✓" : "✗"}
                  </Td>
                  <Td onClick={() => handleRowClick(user)}>{user.salary}</Td>
                </tr>
              ))}
            </tbody>
          </StyledTable>

          <Flex>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </Flex>

          <Modal
            isOpen={selectedUser !== null}
            onClose={closeModal}
            aria-labelledby="user-details-modal"
          >
            {selectedUser && renderUserDetails(selectedUser)}
          </Modal>
        </TableContainer>
      )}
    </div>
  );
};

export default Table;
