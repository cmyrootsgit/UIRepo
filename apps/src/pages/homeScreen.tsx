import { useState, useEffect } from "react";
import FeedPage from "../components/feedPage";
import RelativesCard from "../components/relativesCard";
import Sidebar from "../components/sidebar";
import { AppBar, Toolbar, IconButton, Avatar, Box, Drawer } from "@mui/material";

import Logo from "../assets/CMyRoots_Logo 2.svg";
import HomeIcon from "../assets/home_icon.png";
import AddUserIcon from "../assets/add-user-icon.svg";
import { useAppSelector } from "../redux/store";
import { getProfileImage } from "../utils/profileImage";
import SkeletonSidebar from "../common/skeletonSidebar";

function HomeScreen() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 746);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openRelatives, setOpenRelatives] = useState(false);
  const { details: userDetails, loading } = useAppSelector((state) => state.user);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 746);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // if (loading) return <div>Loading user...</div>;
  if (isMobile) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7f9" }}>
        {/* Header */}
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <img src={Logo} alt="CMyRoots Logo" style={{ height: 40 }} />
            <IconButton onClick={() => setOpenSidebar(true)}>
              <Avatar src={getProfileImage(userDetails?._id)} />
            </IconButton>
          </Toolbar>
          <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => { setOpenSidebar(true); setOpenRelatives(false); }}>
                <img src={HomeIcon} alt="Home" width={26} height={26} />
              </IconButton>

              <Box
                sx={{
                  width: 30,
                  height: 2,
                  bgcolor: "#556E0E",
                  borderRadius: 2,
                  mt: "-4px",
                }}
              />
            </Box>

            {/* Add user icon */}
            <IconButton onClick={() => { setOpenRelatives(true); setOpenSidebar(false); }}>
              <img src={AddUserIcon} alt="Add User" width={26} height={26} />
            </IconButton>
          </Toolbar>

        </AppBar>

        {/* FeedPage in center */}
        <FeedPage />

        {/* Sidebar Drawer */}
        <Drawer anchor="left" open={openSidebar} onClose={() => setOpenSidebar(false)}>
          <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
        </Drawer>

        {/* RelativesCard Drawer */}
        <Drawer anchor="right" open={openRelatives} onClose={() => setOpenRelatives(false)}>
          <Box sx={{ width: 300, p: 2 }}>
            <RelativesCard onClose={() => setOpenRelatives(false)} />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 250 }}>
        {loading ? <SkeletonSidebar /> :
         <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
         }
      </div>

      {/* Feed section */}
      <div style={{ flex: 1, padding: "18px" }}>
        <FeedPage />
      </div>

      {/* Right panel */}
      <div style={{ width: 300, padding: "24px" }}>
        <RelativesCard />
      </div>
    </div>

  );
}

export default HomeScreen;