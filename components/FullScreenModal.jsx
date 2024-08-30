import { Modal } from "native-base"
import React, { createContext } from "react"

const FullModelContext = createContext(null)


export default function FullScreenModal ({ children, useState}){
    const onClose = () => useState.setShowModal(false)

    console.log("FullScreenModal")
    console.log(useState)
    return (

        <FullModelContext.Provider value={useState}>
            <Modal 
                isOpen={useState.showModal} 
                size="full"
                >
                <Modal.Content width="100%" height="100%" maxWidth="100%" maxHeight="100%">
                    {children}
                </Modal.Content>
            </Modal>
        </FullModelContext.Provider>
    )
    
}