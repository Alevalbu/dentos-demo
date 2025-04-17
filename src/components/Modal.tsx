'use client';
import React, {useRef } from "react";
import { ModalOverlay, ModalContent, ModalClose } from "./Modal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose} role='dialog' aria-modal={true}>
      <ModalContent onClick={(e) => e.stopPropagation()} ref={modalRef}>
        {children}
        <ModalClose onClick={onClose} aria-label="close modal">×</ModalClose>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
