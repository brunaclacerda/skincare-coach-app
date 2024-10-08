import { Modal } from "native-base";
import React, { createContext } from "react";

const FullModelContext = createContext(null);

export default function FullScreenModal({
  children,
  useState,
  cbOnClose = null,
}) {
  const onClose = () => {
    if (cbOnClose) cbOnClose();
    console.log("OnClose Modal");
  };

  console.log("FullScreenModal");
  console.log(useState);
  return (
    <FullModelContext.Provider value={useState}>
      <Modal
        style={{ zIndex: 999 }}
        isOpen={useState.showModal}
        size="full"
        onClose={onClose}
      >
        <Modal.Content
          width="100%"
          height="100%"
          maxWidth="100%"
          maxHeight="100%"
        >
          {children}
        </Modal.Content>
      </Modal>
    </FullModelContext.Provider>
  );
}
