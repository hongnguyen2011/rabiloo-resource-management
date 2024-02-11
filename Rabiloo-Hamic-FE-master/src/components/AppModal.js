import { Backdrop, Box, Modal, Typography, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppLanguage } from "../hooks";

function AppModal() { // render modal
  const { Strings } = useAppLanguage();
  const [data, setData] = useState({
    title: null,
    children: null,
    onCancel: null,
    onConfirm: null,
    textCancel: null,
    textConfirm: null,
    noFooter: false,
    wrapperStyle: null,
  });

  useEffect(() => {
    AppModalService.addEventListener("AppModal", (e) => {
      setData(e);
    });
  }, []);

  const {
    title,
    children,
    textConfirm,
    textCancel,
    wrapperStyle,
    onCancel,
    onConfirm,
    noFooter,
  } = data;

  const isOpen = title || children ? true : false;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => AppModalService.close()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}>
      <Box
        style={wrapperStyle}
        sx={{
          borderRadius: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          py: 2,
          px: 4,
        }}>
        <Typography sx={{ mb: 1, textAlign: "center" }} variant="h5">
          {title}
        </Typography>
        {children}
        {!noFooter && (
          <Grid sx={{ mt: 3, textAlign: "center" }}>
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              color="disabled"
              onClick={() => {
                AppModalService.close();
                onCancel && onCancel();
              }}>
              {textCancel || Strings.cancel}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                onConfirm && onConfirm();
              }}>
              {textConfirm || Strings.confirm}
            </Button>
          </Grid>
        )}
      </Box>
    </Modal>
  );
}

const changeObject = {};
let data = {};

const AppModalService = { // lắng nghe sự kiện
  get: () => data,

  set: async ({
    title,
    children,
    onCancel,
    onConfirm,
    textCancel,
    textConfirm,
    wrapperStyle,
    noFooter,
  }) => {
    data = {
      title,
      children,
      onCancel,
      onConfirm,
      textCancel,
      textConfirm,
      wrapperStyle,
      noFooter,
    };
    Object.keys(changeObject).forEach((k) => changeObject[k]());
  },

  close: () => {
    AppModalService.set({});
  },

  addEventListener: (key, cb) => {
    changeObject[key] = () => cb(data);
  },

  removeEventListener: (key) => {
    if (changeObject[key]) {
      delete changeObject[key];
    }
  },
};

export { AppModal, AppModalService };
