import React from "react";
import Header from "./Header";

//Material
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

//ACTIONS y librerias de REDUX
import { useDispatch, useSelector } from "react-redux";
import { closeMensajeAction } from "../../redux/snackBarDuck";






const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
};

const Layout = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.snackbar.open);
  const severity = useSelector((state) => state.snackbar.severity);
  const msg = useSelector((state) => state.snackbar.msg);

  const snackbarComponent = (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      onClose={() => dispatch(closeMensajeAction())}
    >
      <Alert onClose={() => dispatch(closeMensajeAction())} severity={severity}>
        {<span id="message-id">{msg && msg}</span>}
      </Alert>
    </Snackbar>
  );

  return (
    <div>
      {snackbarComponent}
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
