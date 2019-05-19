import React from 'react'

const FileHeader = ({ selectedFile, openDrawerHandler }) => {
    return (
        <div className='File_Header d-flex align-items-center'>
            <div className="Menu__Icon ml-3" onClick={openDrawerHandler}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h2 className="m-0 Title">{selectedFile.name}</h2>
        </div>
    )
}

export default FileHeader
