import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Skeleton,
  Avatar,
  Stack,
} from "@mui/material";
import { FC } from "react";

export const SkeletonComposer: FC = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        maxWidth: 760,
        width: "100%",
        mx: "auto",
        mb: 3,
        p: 2,
      }}
    >
      <Stack spacing={2}>
        {/* Top label */}
        <Skeleton width="30%" height={20} />

        {/* Avatar + Input */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={40} height={40}>
            <Avatar />
          </Skeleton>
          <Skeleton variant="rectangular" height={40} width="100%" />
        </Stack>

        {/* Bottom action row */}
        <Stack direction="row" justifyContent="space-between">
          <Skeleton width="25%" height={20} />
          <Skeleton width="15%" height={20} />
        </Stack>
      </Stack>
    </Card>
  );
};

export const SkeletonPostCard: FC = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        maxWidth: 760,
        width: "100%",
        mx: "auto",
        mb: 3,
        p: 2,
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        }
        title={<Skeleton width="40%" />}
        subheader={<Skeleton width="20%" />}
      />

      {/* Post image */}
      <CardMedia>
        <Skeleton
          variant="rectangular"
          sx={{ height: { xs: 260, sm: 340 }, borderRadius: 1, mx: 2 }}
        />
      </CardMedia>

      {/* Content */}
      <CardContent>
        <Skeleton width="30%" />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </CardContent>
    </Card>
  );
};
