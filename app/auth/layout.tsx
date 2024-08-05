import { Box } from "@mui/material";
import { Typography } from "@mui/material";

import "@fontsource/poppins/700.css";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box>
            <Typography
                m={2}
                fontSize={24}
                position={"absolute"}
                fontFamily={"Poppins"}
            >
                Inventory Manager
            </Typography>
            {children}
        </Box>
    );
}
