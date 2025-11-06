import { FC, useEffect, useMemo } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddFriendIcon from "../assets/add-user-icon.svg";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getRelatives } from "../slice/relativeSlice";
import { RelativeRequest } from "../types/relativeTypes";
import SkeletonRelative from "../common/skeletonRelative";


interface RelativesCardProps {
    title?: string;
    onClose?: () => void;
}


const RelativesCard: FC<RelativesCardProps> = ({
    title = "Relatives you may know",
    onClose,
}) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { details } = useAppSelector((state) => state.user);
    const { suggestions, loading } = useAppSelector((state) => state.relative);

    useEffect(() => {
        if (details?._id) {
            const name = details.FirstName + ' ' + details.LastName;
            const payload: RelativeRequest = {
                userId: details._id,
                name
            }
            dispatch(getRelatives({ payload }));
        }
    }, [dispatch, details?._id]);

    const mergedRelatives = useMemo(() => {
        const relatives = suggestions.data?.relatives || [];
        const peopleYouMayKnow = suggestions.data?.peopleYouMayKnow || [];
        return [...relatives, ...peopleYouMayKnow];
    }, [suggestions.data?.relatives, suggestions.data?.peopleYouMayKnow]);

    return (
        <Card sx={{ maxWidth: 360, mx: "auto" }}>
            {/* Header */}

            <CardHeader
                title={
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 500, fontSize: "16px" }}
                    >
                        {title}
                    </Typography>
                }
                action={
                    isMobile && (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            size="small"
                            sx={{
                                p: 0.5,
                                color: "text.secondary",
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )
                }
                sx={{
                    borderBottom: "2px solid #e0e0e0",
                    borderTop: "1px solid #e0e0e0",
                    "& .MuiCardHeader-action": {
                        marginTop: 0,
                        alignSelf: "center",
                    },
                }}
            />

            {/* Relatives List */}
            {loading ? <SkeletonRelative /> :
                <CardContent sx={{ p: 0 }}>
                    <List disablePadding>
                        {mergedRelatives.map((relative, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" sx={{ p: 0, mr: 1 }}>
                                        <Avatar src={AddFriendIcon} sx={{ width: 24, height: 24 }} />
                                    </IconButton>
                                }
                                sx={{ px: 2, py: 0.8 }}
                            >
                                <ListItemAvatar>
                                    <Avatar src={relative.name} alt={relative.name} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "14px" }}>
                                            {relative.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400, fontSize: "12px" }}>
                                            {relative.relation ?? "Relative"}
                                        </Typography>
                                    }
                                    sx={{ flex: 1 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>}
        </Card>
    );
};

export default RelativesCard;
