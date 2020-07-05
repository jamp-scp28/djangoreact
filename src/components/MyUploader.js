import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
const uploadapi = 'api/v1/product/'


const MyUploader = (props) => {
    // specify upload params and url for your files
    
    
  
    return (
      
      <Dropzone
        //getUploadParams={getUploadParams}
        onChangeStatus={props.handleChangeStatus}
        //onSubmit={props.handleSubmit}
        //submitButtonDisabled={files => files.length < 3}
        accept="image/*,audio/*,video/*"
      />
      
    )
  }
  
export default MyUploader;