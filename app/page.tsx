// "use client";

import { Box } from "@mui/material";
import navigate from "@/app/helpers/navigate";

export default function Page() {
    navigate("/auth/login");
    return <Box>Go to /auth/login to start!</Box>;
}
