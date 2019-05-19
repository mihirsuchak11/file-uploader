import React from 'react'
import Modal from 'react-modal';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
}

const FileUploadModal = ({ file, fileUpload, closeModal, modalIsOpen, afterOpenModal, progress, showProgress, uploadStart }) => {
    
    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="Modal_Header">
                <h3>Upload Document</h3>
            </div>
            <div className="Modal_Body my-5">
                <p>Are you sure you want to upload <strong>{file && file.name}</strong></p>
            </div>
            {showProgress &&
                <Progress percent={progress} />
            }
            <div className="mt-5">
                <button className={`Button mr-3 Primary_Button ` + (uploadStart ? 'disabled' : '')} onClick={fileUpload} >Submit</button>
                <button className="Button Secondary_Button" onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
    )
}

export default FileUploadModal;