import React from 'react'
import FileHeader from './FileHeader/FileHeader';


import './selectedFile.scss';

const SelectedFile = (props) => {
    const id = Number(props.match.params.id);
    let fileList = props.fileList;
    let selectedFile = fileList.find(file => {
        return file.id === id
    });

    return (
        selectedFile !== undefined &&
        <React.Fragment>
            <FileHeader openDrawerHandler={props.openDrawerHandler} selectedFile={selectedFile} />
            <div className="File h-100">
                <iframe title={selectedFile.name} width="100%" height="100%" src={selectedFile.url}></iframe>
            </div>
        </React.Fragment>
    );
}

export default SelectedFile;