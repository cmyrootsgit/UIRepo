import { FC } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Skeleton,
} from "@mui/material";

const SkeletonRelative: FC = () => {
    return (
        <Box
            sx={{
                width: 250,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                p: 2,
                boxSizing: "border-box",
            }}
        >{/* Menu Items (9 items) */}
            <List sx={{ flex: 1 }}>
                {Array.from({ length: 9 }).map((_, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ mb: 1, paddingLeft: 4, gap: 2, display: "flex", alignItems: "center" }}
                    >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Skeleton variant="circular" width={28} height={28} />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton width="80%" height={20} />
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SkeletonRelative;
