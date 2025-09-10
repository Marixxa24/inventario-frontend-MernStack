import React from 'react';
import { Alert as MuiAlert, Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useInventario } from '../../context/InventarioContext';

const Alert = () => {
  const { alert, clearAlert } = useInventario();

  if (!alert) return null;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearAlert();
  };

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={alert.type}
        variant="filled"
        sx={{ width: '100%' }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;