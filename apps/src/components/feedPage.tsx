import { FC, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";

// Assets
import EditIcon from "../assets/edit-icon.png";
import ImageIconPng from "../assets/image-icon.svg";
import VideoIcon from "../assets/video-icon.png";
import PublicIcon from "../assets/pubilc-icon.png";
import ArrowDownIcon from "../assets/arrow-down.png";
import LikeIcon from "../assets/heart-outline.png";
import CommentIcon from "../assets/comment.png";
import ShareIcon from "../assets/send.png";
import SaveIcon from "../assets/collection-tag.png";
import MoreIcon from "../assets/icon-park-outline_more.png";
import SendIcon from "../assets/send-icon.png";
import EmojiIcon from "../assets/emoji.png";
import { usePost } from "../api/hooks/usePost";
import { formatTimestamp } from "../utils/dateUtils";

import { getProfileImage } from "../utils/profileImage";
import { useAppSelector } from "../redux/store";
import { SkeletonComposer, SkeletonPostCard } from "../common/skeletonPostCard";

// Types
type Post = {
  id: string;
  username: string;
  profileImage: string;
  postImages: string[];
  description: string;
  likes: number;
  comments: number;
  timestamp: string;
  location?: string;
};

// Reusable ImageIcon
const ImageIcon: FC<{ src: string; alt: string; size?: number }> = ({
  src,
  alt,
  size = 22,
}) => (
  <Box
    role="img"
    aria-label={alt}
    sx={{
      display: "inline-block",
      width: size,
      height: size,
      backgroundImage: `url(${src})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  />
);

// Composer Component
type ComposerProps = {
  onAddPost: (content: string) => void;
};

const Composer: FC<ComposerProps> = ({ onAddPost }) => {
  const [text, setText] = useState("");
  const user = useAppSelector((state) => state.user.details);

  const handleSend = () => {
    if (!text.trim()) return;
    onAddPost(text);
    setText("");
  };

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
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ImageIcon src={EditIcon} alt="Write a Post" size={20} />
          <Typography variant="subtitle1" fontWeight={400} fontSize={14}>
            Write a Post
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={getProfileImage(user?._id)}
            alt="you"
            sx={{ width: 40, height: 40 }}
          />
          <TextField
            id="chat-message"
            placeholder="Write something here..."
            fullWidth
            size="small"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label="send" onClick={handleSend}>
                    <ImageIcon src={SendIcon} alt="Send" size={20} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#72810B" },
                "&.Mui-focused fieldset": { borderColor: "#72810B" },
              },
              "& .MuiOutlinedInput-input": { p: "14px", fontSize: 16 },
            }}
          />

        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 1 }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <ImageIcon src={ImageIconPng} alt="Image" />
              <Typography variant="body2">Image</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <ImageIcon src={VideoIcon} alt="Video" />
              <Typography variant="body2">Video</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ImageIcon src={PublicIcon} alt="Public" />
            <Typography variant="body2">Relatives</Typography>
            <ImageIcon src={ArrowDownIcon} alt="Dropdown" />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

// PostCard Component
const PostCard: FC<{ post: Post; user: any }> = ({ post, user }) => (
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
    <CardHeader
      avatar={
        <Avatar
          src={getProfileImage(user?._id)}
          alt={post.username}
          sx={{ width: 36, height: 36 }}
        />
      }
      title={
        <Stack direction="column" spacing={0.2}>
          <Typography variant="subtitle2" fontWeight={500}>
            {post.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {post.timestamp}
          </Typography>
        </Stack>
      }
      subheader={
        post.location ? (
          <Typography variant="caption" color="text.secondary">
            {post.location}
          </Typography>
        ) : null
      }
      action={
        <IconButton aria-label="more" sx={{ alignSelf: "flex-start" }}>
          <ImageIcon src={MoreIcon} alt="More" />
        </IconButton>
      }
      sx={{ pb: 0 }}
    />


    {/* Show multiple images */}
    {post.postImages.map((img, i) => (
      <CardMedia
        key={i}
        component="div"
        sx={{
          height: { xs: 260, sm: 340 },
          bgcolor: "grey.100",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mx: 2,
          mt: 1,
          borderRadius: 1,
        }}
      />
    ))}

    <CardActions
      sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <IconButton aria-label="like">
          <ImageIcon src={LikeIcon} alt="Like" size={24} />
        </IconButton>
        <IconButton aria-label="comment">
          <ImageIcon src={CommentIcon} alt="Comment" size={24} />
        </IconButton>
        <IconButton aria-label="share">
          <ImageIcon src={ShareIcon} alt="Share" size={24} />
        </IconButton>
      </Stack>
      <IconButton aria-label="save">
        <ImageIcon src={SaveIcon} alt="Save" size={24} />
      </IconButton>
    </CardActions>

    <CardContent sx={{ pt: 0, px: 2 }}>
      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
        {post.likes} likes
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <Box component="span" sx={{ fontWeight: 500, mr: 0.5 }}>
          {post.username}
        </Box>
        {post.description}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        View all {post.comments} comments
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          src={getProfileImage(user?._id)}
          alt="me"
          sx={{ width: 28, height: 28 }}
        />
        <TextField
          variant="standard"
          placeholder="Add a comment..."
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "0.95rem" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="emoji">
                  <ImageIcon src={EmojiIcon} alt="Emoji" size={20} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </CardContent>
  </Card>
);

// Main FeedPage
const FeedPage: FC = () => {
  const { posts, loading, error } = usePost();
  const { details } = useAppSelector((state) => state.user);
  const profile = details?.profile;
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  console.log(posts)
  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      username: "You",
      profileImage: profile?.PhotoPath || getProfileImage(profile?._id),
      postImages: [],
      description: content,
      likes: 0,
      comments: 0,
      timestamp: formatTimestamp(new Date()),
    };
    setLocalPosts([newPost, ...localPosts]);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", py: 4, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 760, mx: "auto" }}>
          <SkeletonComposer />
          {[...Array(3)].map((_, i) => (
            <SkeletonPostCard key={i} />
          ))}
        </Box>
      </Box>
    );
  }

  if (error) return <p>Error: {error}</p>;

  const combinedPosts: Post[] = [
    ...localPosts,
    ...posts.map((p) => {
      const apiPost = p.Post;
      return {
        id: apiPost._id,
        username: profile?.FirstName || `User ${apiPost.UserId}`,
        location: "Madurai",
        profileImage: profile?.PhotoPath || getProfileImage(profile?._id),
        postImages: [
          `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`,
        ],
        description: apiPost.Text,
        likes: apiPost.PostEmotionMetrics?.LikeCount || 0,
        comments: apiPost.PostCommentCount || 0,
        timestamp: formatTimestamp(apiPost.CreatedAt),
      };
    }),
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", py: 4, px: 2 }}>
      <Box sx={{ width: "100%", maxWidth: 760, mx: "auto" }}>
        {/* Composer */}
        <Composer onAddPost={handleAddPost} />

        {/* Feed */}
        {combinedPosts.map((p) => (
          <PostCard key={p.id} post={p} user={details} />
        ))}

      </Box>
    </Box>
  );
};

export default FeedPage;
