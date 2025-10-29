import { FC } from "react";
import { Box, Stack, Skeleton, useMediaQuery } from "@mui/material";
import SkeletonSidebar from "./skeletonSidebar";

interface PageLoaderProps {
  sidebarWidth?: number; // optional sidebar width
  postsCount?: number; // number of post/image skeletons
}

const SkeletonMyProfile: FC<PageLoaderProps> = ({ sidebarWidth = 250, postsCount = 3 }) => {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {/* Sidebar Skeleton */}
      {!isMobile && (
        <Box sx={{ width: sidebarWidth }}>
          <SkeletonSidebar />
        </Box>
      )}

      {/* Main Content Skeleton */}
      <Box sx={{ flex: 1, px: isMobile ? 2 : 4, py: 3 }}>
        {/* Profile Section */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 2 : 4}
          alignItems={isMobile ? "center" : "flex-start"}
          mb={4}
        >
          <Skeleton variant="circular" width={160} height={160} />

          <Stack
            spacing={2}
            width={isMobile ? "100%" : "auto"}
            textAlign={isMobile ? "center" : "left"}
          >
            <Skeleton variant="text" width={isMobile ? "60%" : 200} height={32} />
            <Skeleton variant="rectangular" width={127} height={32} />

            <Stack
              direction="row"
              spacing={4}
              justifyContent={isMobile ? "center" : "flex-start"}
              mt={1}
            >
              <Skeleton variant="text" width={60} height={32} />
              <Skeleton variant="text" width={100} height={32} />
            </Stack>

            <Stack spacing={1} mt={1.5}>
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="text"
                  width={isMobile ? "80%" : 300}
                  height={20}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Posts Section Skeleton */}
        <Stack
          direction="row"
          spacing={1}
          mb={1}
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={80} height={24} />
        </Stack>

        <Skeleton
          variant="rectangular"
          width={isMobile ? "100%" : 926}
          height={1}
          sx={{ mb: 2 }}
        />

        {/* Images Section Skeleton */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={1}
          mb={4}
          alignItems="center"
        >
          {[...Array(postsCount)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={isMobile ? "100%" : 306}
              height={380}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SkeletonMyProfile;
