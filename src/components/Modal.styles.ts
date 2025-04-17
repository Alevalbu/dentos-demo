import { styled } from "@stitches/react";

export const ModalOverlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const ModalContent = styled("div", {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  position: "relative",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
});

export const ModalClose = styled("div", {
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "0 8px",
  cursor: "pointer",
});
