import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * A reusable confirmation dialog component.
 * * @param {object} props - Component props
 * @param {boolean} props.open - Controls the visibility of the dialog.
 * @param {function} props.onClose - Function to call when closing (e.g., clicking outside or cancel).
 * @param {function} props.onConfirm - Function to call when the user confirms the action.
 * @param {string} props.title - The title of the dialog (e.g., "Confirm Deletion").
 * @param {string} props.message - The main message/prompt for the user.
 * @param {string} props.confirmText - Text for the confirmation button (e.g., "Delete").
 */
const ConfirmationDialog = (props:{
  open:boolean,
  onClose:()=>void,
  onConfirm:()=>void,
  title :string,
  message : string,
  confirmText:string,
}) => {
    const { open, onClose, onConfirm, title, message, confirmText } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      
      <DialogContent dividers>
        <Typography id="confirmation-dialog-description">
          {message}
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" // Use error color for destructive actions like delete
          variant="contained" 
          autoFocus // Focus the confirm button for easy keyboard access
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;