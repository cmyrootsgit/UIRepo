import React from "react";
import {
    Box,
    Stack,
    Skeleton,
    useMediaQuery,
} from "@mui/material";
import SkeletonSidebar from "../common/skeletonSidebar";

const SkeletonEditProfile: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:900px)");

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
            {/* Sidebar skeleton */}
            {!isMobile && (
                <Box sx={{ width: 250 }}>
                    <SkeletonSidebar />
                </Box>
            )}

            {/* Main content skeleton */}
            <Box
                sx={{
                    flex: 1,
                    px: isMobile ? 2 : 4,
                    py: 3,
                    bgcolor: "#F8F9FA",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                {/* Header */}
                <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={200} height={32} />
                </Stack>

                {/* Profile avatar + name */}
                <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" mb={3}>
                    <Skeleton variant="circular" width={80} height={80} />
                    <Stack spacing={1} width={isMobile ? "100%" : 400}>
                        <Skeleton variant="text" width={200} height={28} />
                        <Skeleton variant="text" width={150} height={20} />
                        <Skeleton variant="rectangular" width={140} height={32} />
                    </Stack>
                </Stack>

                {/* Form skeleton */}
                <Stack spacing={2} maxWidth={600}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={48} />
                    ))}
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
                </Stack>
            </Box>
        </Box>
    );
};

export default SkeletonEditProfile;
