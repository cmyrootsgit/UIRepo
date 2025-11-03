import { FC, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./sidebar";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { getProfileImage } from "../utils/profileImage";
import SkeletonMyProfile from "../common/skeletonMyProfile";
import EditIcon from "../assets/edit-icon.svg";
import email from "../assets/email.svg";
import location from "../assets/location.svg";
import userDetailsSvg from "../assets/user-details.svg";
import familySvg from "../assets/family-name.svg";
import postIcon from "../assets/post-icon.svg"
import postImage1Svg from "../assets/post-image-1.svg";
import postImage2Svg from "../assets/post-image-2.svg";
import postImage3Svg from "../assets/post-image-3.svg";

const MyProfile: FC = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const { details: user, loading } = useAppSelector((state) => state.user);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (!user || loading) return <SkeletonMyProfile />;
  const genderMap: Record<string, string> = {
    "1": "Male",
    "2": "Female",
    "3": "Others",
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      {/* Sidebar */}
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          px: isMobile ? 2 : 4,
          py: 3,
          pl: isMobile ? 2 : "356px", // same spacing logic as FeedPage
          bgcolor: "#F8F9FA",
          width: "100%",
        }}
      >
        {/* Mobile: Hamburger Button */}
        {isMobile && (
          <IconButton
            onClick={() => setOpenSidebar(true)}
            sx={{ position: "fixed", top: 16, left: 16, zIndex: 2000 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Profile Section */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems={isMobile ? "center" : "flex-start"}
            spacing={isMobile ? 2 : 4}
            sx={{ width: "100%" }}
          >
            {/* Avatar */}
            <Avatar
              src={getProfileImage(user?._id)}
              alt={user?.profile?.FirstName}
              sx={{
                width: isMobile ? 120 : 160,
                height: isMobile ? 120 : 160,
              }}
            />

            {/* Right Side: Details */}
            <Box
              textAlign={isMobile ? "center" : "left"}
              sx={{ flex: 1, minWidth: 0 }}
            >
              {/* Username + Edit */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                justifyContent={isMobile ? "center" : "flex-start"}
                flexWrap="wrap"
              >
                <Typography variant="h6" fontWeight={600}>
                  {user?.profile.FirstName} {user?.profile.LastName}
                </Typography>
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    bgcolor: "#EFEFEF",
                    color: "black",
                    width: "127px",
                    height: "32px",
                    gap: "8px",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                  onClick={() => navigate("/edit-profile")}
                >
                  <Box
                    component="img"
                    src={EditIcon}
                    alt="Edit Profile"
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
                    Edit Profile
                  </Typography>
                </Button>
              </Stack>

              {/* Post & Family Count */}
              <Stack
                direction="row"
                spacing={8.5}
                mt="10px"
                justifyContent={isMobile ? "center" : "flex-start"}
                flexWrap="wrap"
              >
                {/* Posts */}
                <Stack direction="row" alignItems="baseline" spacing={1}>
                  <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                    {/* {profile.posts} */}
                  </Typography>
                  <Typography sx={{ fontSize: 16, color: "#8E8E8E" }}>
                    Post
                  </Typography>
                </Stack>

                {/* Family Members */}
                <Stack direction="row" alignItems="baseline" spacing={1}>
                  <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                    {/* {profile.familyMembers} */}
                  </Typography>
                  <Typography sx={{ fontSize: 16, color: "#8E8E8E" }}>
                    Family Members
                  </Typography>
                </Stack>
              </Stack>

              {/* Info with icons */}
              <Stack spacing={1.2} mt={1.5}>
                {[
                  { icon: email, value: user?.Email },
                  {
                    icon: location,
                    value: user?.profile.Location,
                  },
                  {
                    icon: userDetailsSvg,
                    value: `${genderMap[user?.profile.Gender || "3"]} | ${user?.profile.MaritalStatus} | ${user?.profile.DateOfBirthString
                      ? `${new Date(
                        user.profile.DateOfBirthString
                      ).toLocaleString("en-US", { month: "short" })} ${new Date(
                        user.profile.DateOfBirthString
                      ).getDate()} ${new Date(
                        user.profile.DateOfBirthString
                      ).getFullYear()}`
                      : ""
                      }`,
                  },
                  {
                    icon: familySvg,
                    value: user?.profile.FamilyName,
                  },
                ].map((item, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent={isMobile ? "center" : "flex-start"}
                    flexWrap="wrap"
                  >
                    <Box
                      component="img"
                      src={item.icon}
                      alt="info"
                      sx={{ width: 20, height: 20 }}
                    />
                    <Typography variant="body2">{item.value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Posts Section */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={1}
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          <Box
            component="img"
            src={postIcon}
            alt="Posts"
            sx={{ width: 24, height: 24 }}
          />
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Post</Typography>
        </Stack>

        {/* Divider line */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "926px",
            height: "1px",
            bgcolor: "#E9E9E9",
            mb: 2,
            mx: isMobile ? "auto" : 0,
          }}
        />

        {/* Images Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // same as FeedPage
            gap: "4px",
            mb: 4,
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {[postImage1Svg, postImage2Svg, postImage3Svg].map(
            (src, i) => (
              <Box
                key={i}
                component="img"
                src={src}
                alt={`Post ${i + 1}`}
                sx={{
                  width: isMobile ? "100%" : "306px",
                  height: "380px",
                }}
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
