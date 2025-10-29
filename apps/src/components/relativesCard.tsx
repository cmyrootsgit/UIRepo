import { FC } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddFriendIcon from "../assets/add-user-icon.svg";

interface Relative {
    id: number;
    name: string;
    suggestion: string;
    profileImage: string;
}

interface RelativesCardProps {
    title?: string;
    relatives?: Relative[];
    onClose?: () => void;
}

const defaultRelatives: Relative[] = [
    {
        id: 1,
        name: "Praveen Kumar",
        suggestion: "Suggested for you",
        profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
        id: 2,
        name: "Akash P",
        suggestion: "Suggested for you",
        profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
        id: 3,
        name: "Siva Rama Krishnan",
        suggestion: "Suggested for you",
        profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
        id: 4,
        name: "Gopala Krishnan",
        suggestion: "Suggested for you",
        profileImage: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
        id: 5,
        name: "Dinesh Kumar",
        suggestion: "Suggested for you",
        profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
        id: 6,
        name: "Naveen",
        suggestion: "Suggested for you",
        profileImage: "https://randomuser.me/api/portraits/men/16.jpg",
    },
];

const RelativesCard: FC<RelativesCardProps> = ({
    title = "Relatives you may know",
    relatives = defaultRelatives,
    onClose,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                    {relatives.map((relative) => (
                        <ListItem
                            key={relative.id}
                            secondaryAction={
                                <IconButton edge="end" sx={{ p: 0, mr: 1 }}>
                                    <Avatar src={AddFriendIcon} sx={{ width: 24, height: 24 }} />
                                </IconButton>
                            }
                            sx={{ px: 2, py: 0.8 }}
                        >
                            <ListItemAvatar>
                                <Avatar src={relative.profileImage} alt={relative.name} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "14px" }}>
                                        {relative.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400, fontSize: "12px" }}>
                                        {relative.suggestion}
                                    </Typography>
                                }
                                sx={{ flex: 1 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>

            {/* Footer */}
            <CardActions
                sx={{ justifyContent: "center", backgroundColor: "#E9E9E9", py: 1 }}
            >
                <Button
                    size="small"
                    onClick={() => console.log("See All clicked")}
                    sx={{
                        fontWeight: 400,
                        fontSize: "14px",
                        textTransform: "none",
                        color: "#1E1E1E",
                    }}
                >
                    See All
                </Button>
            </CardActions>
        </Card>
    );
};

export default RelativesCard;
