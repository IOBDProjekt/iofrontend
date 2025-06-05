import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Link
} from '@mui/material';

export default function AdviceItem({ advice }) {
    const { title = '', content = '', type = '' } = advice;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={handleOpen}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom noWrap>
                        {title}
                    </Typography>
                    <Typography variant="body2" noWrap>
                        {content}
                    </Typography>
                </CardContent>
                {type && (
                    <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip label={type} size="small" />
                        <Link
                            component="button"
                            variant="caption"
                            underline="none"
                            onClick={e => { e.stopPropagation(); handleOpen(); }}
                            sx={{ ml: 1 }}
                        >
                            zobacz więcej
                        </Link>
                    </Box>
                )}
            </Card>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1" paragraph>
                        {content}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
