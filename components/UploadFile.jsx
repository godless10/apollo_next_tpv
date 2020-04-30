import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

//ACTIONS y librerias de REDUX
import { useDispatch } from "react-redux";
import { agregarFotoAction } from "../redux/categoriasDuck";



const UploadFile = () => {
  //funcion dispatch
  const dispatch = useDispatch();


  const handleChangeUpload = async ([file]) => {
    //await singleUploadStream({ variables: { file } });
    //console.log(file);
    dispatch(agregarFotoAction(file));
  };

  return (
    <div>
      <DropzoneArea
        onChange={handleChangeUpload}
        acceptedFiles={["image/*"]}
        dropzoneText={"Arrastra o haz click Aqui"}
        filesLimit={1}
        showPreviewsInDropzone={false}
        showPreviews={true}
        useChipsForPreview={false}
        multiple={false}
        showAlerts={false}
        disabled={true}
      />
    </div>
  );
};

export default UploadFile;
