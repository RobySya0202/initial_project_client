'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../services/state/hooks';
import { hideAlert } from '../services/state/alert/alertSlice';
import { Alert, AlertTitle, Slide, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function GlobalAlert() {
  const { message, type } = useAppSelector((state) => state.alertReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <Slide direction="down" in={!!message} mountOnEnter unmountOnExit>
      <div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[2000] w-[90%] max-w-md"
        style={{ pointerEvents: 'none' }} // Prevents blocking clicks on other components
      >
        <Alert
          severity={type}
          variant="filled"
          sx={{
            borderRadius: 2,
            boxShadow: 4,
            pointerEvents: 'auto', // Allow interaction only with the alert itself
            display: 'flex',
            alignItems: 'center',
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => dispatch(hideAlert())}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <AlertTitle>
            {type === 'error'
              ? 'Error'
              : type === 'success'
              ? 'Success'
              : 'Info'}
          </AlertTitle>
          {message}
        </Alert>
      </div>
    </Slide>
  );
}
