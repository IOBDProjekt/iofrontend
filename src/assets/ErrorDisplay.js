import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function ErrorDisplay({ message }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Typography color="error">{message}</Typography>
        </Box>
    );
}
