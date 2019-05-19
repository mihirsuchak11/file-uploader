import React from 'react'
import SingleFile from './SingleFile/SingleFile';
import FileUpload from './FileUpload/FileUpload';

import './fileList.scss';

const FileList = ({ fileList, openDrawer, modalIsOpen, closeDrawerHandler, file, openModal, closeModal, fileChangeHandler, fileUploadHandler, progress, showProgress, listLoading, uploadStart }) => {

    return (
        <div className={`File_List ` + (openDrawer ? 'open' : '')} style={{ height: '100vh' }}>
            <div className="File_List_Header align-items-center d-flex justify-content-between">
                <h5 className="m-0 text-uppercase">Files</h5>
                <button className="Close_Button" onClick={closeDrawerHandler}>X</button>
                <FileUpload
                    uploadStart={uploadStart}
                    showProgress={showProgress}
                    progress={progress}
                    modalIsOpen={modalIsOpen}
                    file={file}
                    openModal={openModal}
                    closeModal={closeModal}
                    fileChangeHandler={fileChangeHandler}
                    fileUploadHandler={fileUploadHandler}
                />
            </div>
            <ul className="List">
                {listLoading ? <p className="Message">Wait list is loading...</p> :
                    fileList && fileList.length > 0 ?
                        fileList.map(({ name, id }) => (
                            <SingleFile name={name} id={id} key={id} />
                        ))
                        :
                        <p className="Message">There is no file addded yet, start uploading :)</p>
                }
            </ul>
        </div>
    )

}
export default FileList;