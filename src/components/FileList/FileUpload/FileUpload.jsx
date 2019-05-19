import React from 'react'
import UploadImage from '../../../assets/images/upload.png';
import FileUploadModal from '../../FileUploadModal/FileUploadModal';

const FileUpload = ({ fileUploadHandler, fileChangeHandler, openModal, closeModal, file, modalIsOpen, progress, showProgress, uploadStart }) => {
    return (
        <React.Fragment>
            <FileUploadModal
                uploadStart={uploadStart}
                showProgress={showProgress}
                progress={progress}
                openModal={openModal}
                closeModal={closeModal}
                file={file}
                modalIsOpen={modalIsOpen}
                fileUpload={fileUploadHandler}
            />
            <div className="Upload-Btn-Wrapper">
                <button className="Btn Upload_Button" onClick={fileUploadHandler}>Upload <img src={UploadImage} className="ml-2" alt="upload" width="15" /></button>
                <input type="file" onChange={fileChangeHandler} accept=".pdf,.doc,.docx" />
            </div>
        </React.Fragment>
    )
}

export default FileUpload
