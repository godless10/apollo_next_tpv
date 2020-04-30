// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import firebase from "../firebase/firebase";
// import { CircularProgress } from "@material-ui/core";
// import shortid from "shortid";

// const useUploadFile = (modificar) => {
//   const [msg, setMsg] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [fileUrl, setFileUrl] = useState(null);

//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       //nombre completo hasta el primer punto (ojala la extension)
//       //reemplazando cualquier espacio en blanco con '_'
//       const nombreFile = file.name.split(".")[0].replace(/\s/g, "_");
//       //nombre de la extension sin el punto
//       const extensionFile = file.name.split(".").pop();

//       if (file.size <= 10000000) {
//         //creamos el nombre para subir al storage convirtiendo todo el string a minusculas
//         const filename = `${nombreFile}_${shortid.generate()}.${extensionFile}`.toLowerCase();
//         //console.log(filename);
//         const storageRef = firebase.storage.ref(`pictures/${filename}`);
//         const task = storageRef.put(file);

//         //Executing the task we can execute functions on the property STATE_CHANGED
//         //FIRST function returns a snapshot of the progress in bytes
//         //SECOND will take no arguments and assign the download URL to a state
//         task.on(
//           "state_changed",
//           ///////////////////////////////////////////////FIRST
//           (snapshot) => {
//             let percentage =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             //console.log(percentage);
//             setProgress(percentage);
//           },
//           (error) => {
//             console.error(error.message);
//             setMsg(error.message);
//           },
//           ///////////////////////////////////////////////SECOND
//           async () => {
//             // Upload complete
//             await firebase.storage
//               .ref("pictures")
//               .child(filename)
//               .getDownloadURL()
//               .then(async (url) => {
//                 if (url) {
//                   console.log(url);
//                   setFileUrl(url);
//                   setMsg("Subida Exitosa");
//                 }
//               });
//           }
//         );
//       } else {
//         console.log("imagen muy grande");
//       }

//       //   const reader = new FileReader();

//       //   reader.onabort = () => console.log("file reading was aborted");
//       //   reader.onerror = () => console.log("file reading has failed");
//       //   reader.onload = () => {
//       //     // Do whatever you want with the file contents
//       //     const binaryStr = reader.result;
//       //     console.log(binaryStr);
//       //   };
//       //   reader.readAsArrayBuffer(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     disabled: !modificar,
//   });

//   const uploadFile = (
//     <div>
//       <div {...getRootProps({ className: "dropzone disabled" })}>
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here ...</p>
//         ) : modificar ? (
//           <p>Arrastra una imagen a ese espacio O da CLICK aqui para subir imagen</p>
//         ) : (
//           <p>Espacio para subir imagenes...</p>
//         )}
//       </div>
//       {!msg && (
//         <CircularProgress variant="static" color="inherit" value={progress} />
//       )}
//       {msg && <p>{msg}</p>}
//     </div>
//   );

//   return [uploadFile, fileUrl];
// };

// export default useUploadFile;
