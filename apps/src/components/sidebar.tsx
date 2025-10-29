import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/CMyRoots_Logo 2.svg";

import HomeIcon from "../assets/home-icon.png";
import AboutFamily from "../assets/about-family.png";
import MyFamilyTree from "../assets/myf-family-tree.svg";
import MyRelatives from "../assets/my-relatives.svg";
import Messages from "../assets/messages.svg";
import Notifications from "../assets/notifications.svg";
import Favorites from "../assets/favorites.svg";
import Logout from "../assets/light-logout.svg";

import { authService } from "../api/services/auth";
import { useAppSelector } from "../redux/store";
import { getProfileImage } from "../utils/profileImage";

const menuItems = [
  { text: "Home", icon: HomeIcon, path: "/homeScreen" },
  { text: "About Family", icon: AboutFamily, path: "/about-family" },
  { text: "My Family Tree", icon: MyFamilyTree, path: "/family-tree" },
  { text: "My Relatives", icon: MyRelatives, path: "/relatives" },
  { text: "Messages", icon: Messages, path: "/messages" },
  { text: "Notifications", icon: Notifications, path: "/notifications" },
  { text: "Favorites", icon: Favorites, path: "/favorites" },
  { text: "My Profile", path: "/profile", isProfile: true },
  { text: "Logout", icon: Logout, path: "/" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const user = useAppSelector((state) => state.user.details);

  const handleNavigation = (path: string) => {
    if (path === "/") {
      authService.logout();
      navigate("/", { replace: true });
    } else {
      navigate(path);
    }
    if (isMobile) onClose(); // Close drawer on mobile after navigation
  };

  const drawerContent = (
    <List sx={{ px: 2, py: 3 }}>
      {/* Logo */}
      <ListItem sx={{ mb: 3, justifyContent: "center" }}>
        <img src={Logo} alt="CMyRoots Logo" style={{ width: 120, height: "auto" }} />
      </ListItem>

      {/* Menu Items */}
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isDummy = !["/homeScreen", "/profile", "/"].includes(item.path);

        return (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              onClick={() => !isDummy && handleNavigation(item.path)}
              disabled={isDummy} // disable click
              sx={{
                backgroundColor: isActive ? "#556E0E" : "transparent",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: isDummy
                    ? "transparent"
                    : isActive
                      ? "#556E0E"
                      : "rgba(0,0,0,0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.isProfile ? (
                  <Avatar
                    src={getProfileImage(user?._id)}
                    sx={{
                      width: 28,
                      height: 28,
                      border: isActive ? "2px solid #fff" : "none",
                    }}
                  />
                ) : (
                  <img
                    src={item.icon}
                    alt={`${item.text} icon`}
                    style={{
                      width: 24,
                      height: 24,
                      display: "block",
                      objectFit: "contain",
                      filter: isActive
                        ? "brightness(0) saturate(100%) invert(100%)"
                        : "none",
                      opacity: isDummy ? 0.4 : 1, // greyed out if dummy
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  fontWeight: 600,
                  color: isActive ? "#FFFFFF" : isDummy ? "gray" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}

    </List>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { width: 250, border: "none" } }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
