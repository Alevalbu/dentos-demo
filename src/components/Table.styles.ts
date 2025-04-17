import { styled } from "@stitches/react";

export const TableContainer = styled("div", {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
});

export const StyledTable = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
  backgroundColor: "white",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

export const Th = styled("th", {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f5f5f5",
  fontWeight: 600,
});

export const Td = styled("td", {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
});

export const PaginationContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginTop: "20px",
});

export const ModalDetails = styled("div", {
  //marginTop: '20px',
});

export const ModalTitle = styled("div", {
  fontSize: "22px",
  marginBottom: "20px",
  color: "#333",
  borderBottom: "2px solid #f0f0f0",
  paddingBottom: "10px",
});

export const DetailsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
});

export const AddressDetails = styled("div", {
  marginTop: "5px",
  "& > div": {
    margin: "2px 0",
  },
});

export const DetailLink = styled("a", {
  color: "#646cff",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});