import React, { Component } from 'react'
import FileList from '../FileList/FileList';
import { withRouter } from "react-router-dom";
import Route from '../Route'
import firebase from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import * as _ from 'lodash'

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = {
        modalIsOpen: false,
        file: null,
        url: '',
        fileList: [],
        listLoading: false,
        singleFile: null,
        firstFile: null,
        openDrawer: false,
        progress: 0,
        showProgress: false,
        uploadStart: false
    }

    //for modal
    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, uploadStart: false });
    }

    // get file and save in state
    fileChangeHandler = (e) => {
        const file = e.target.files[0];
        this.setState({ file })
        this.openModal()
    }

    // upload to firebase
    fileUploadHandler = () => {
        const storage = firebase.storage();
        const { file } = this.state;
        this.setState({ showProgress: true, uploadStart: true })
        const uploadTask = storage.ref(`files/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({ progress })
            },
            (error) => {
                this.notifyError()
                this.setState({ uploadStart: false, progress: 0, showProgress: false })
            },
            () => {
                this.closeModal();
                this.notifySuccess();
                storage.ref('files').child(file.name).getDownloadURL().then(url => {
                    const data = {
                        url: url,
                        name: this.state.file.name,
                        id: Date.now() + Math.random()
                    }
                    firebase.database().ref('/files').push(data)
                        .then((data) => {
                            this.getFiles()
                            this.setState({ uploadStart: false, progress: 0, showProgress: false })
                        }).catch(error => {
                            this.notifyError();
                            this.setState({ uploadStart: false, progress: 0, showProgress: false })
                        });
                })
            }
        )
    }

    // getFiles from firebase
    getFiles = () => {
        this.setState({ listLoading: true })
        firebase.database().ref('/files').once('value', snapshot => {
            this.setState({ listLoading: false })
            const fileList = _.values(snapshot.val());
            this.setState({ fileList, firstFile: fileList[0] });
        });
    }

    // to notify about update
    notifySuccess = () => {
        toast.success("Successfully added :)", {
            position: toast.POSITION.TOP_CENTER
        });
    }
    
    // to notify about error
    notifyError = () => {
        toast.error("Something went wring please try again later :(", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    componentWillMount () {
        this.getFiles();
    }

    // for drawer
    openDrawerHandler = () => {
        this.setState({
            openDrawer: true
        });
    }

    closeDrawerHandler = () => {
        this.setState({
            openDrawer: false
        });
    }

    render () {
        const { showProgress, progress, openDrawer, fileList, file, modalIsOpen, listLoading, uploadStart } = this.state;

        if (fileList.length > 0) {
            const id = this.state.firstFile.id
            if (this.props.history.location.pathname === "/") {
                this.props.history.push(`/file/${id}`);
            }
        }

        return (
            <div className="Layout d-flex" style={{ height: '100%' }}>
                <ToastContainer autoClose={2000} />
                <FileList
                    uploadStart={uploadStart}
                    listLoading={listLoading}
                    showProgress={showProgress}
                    progress={progress}
                    openDrawer={openDrawer}
                    closeDrawerHandler={this.closeDrawerHandler}
                    fileList={fileList}
                    file={file}
                    fileChangeHandler={this.fileChangeHandler}
                    fileUploadHandler={this.fileUploadHandler}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    modalIsOpen={modalIsOpen}
                />
                <div className="Layout" style={{ marginLeft: '20%', width: '100%' }}>
                    <Route
                        openDrawerHandler={this.openDrawerHandler}
                        fileList={fileList} />
                </div>
            </div>
        );
    }
}
export default withRouter(App);