import { IconButton, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function AppIconButton({
  onClick,
  children,
  popoverLabel,
  sx,
  ...props
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ m: 1, ...sx }}
        color='primary'
        aria-label='upload picture'
        component='span'
        onClick={onClick}
        {...props}>
        {children}
      </IconButton>
      {Boolean(popoverLabel) && (
        <Popover
          id='mouse-over-popover'
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus={true}
          disableAutoFocus={true}
          disableEnforceFocus={true}>
          <Typography sx={{ p: 1 }}>{popoverLabel}</Typography>
        </Popover>
      )}
    </>
  );
}
