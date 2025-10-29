import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Avatar,
  MenuItem,
  useMediaQuery,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { UserProfileUpdateRequest } from "../api/services/profile";
import { updateUserProfile } from "../slice/profileSlice";
import { getProfileImage } from "../utils/profileImage";
import { userActions } from "../slice/userSlice";
import BackArrow from "../assets/back-arrow.svg";
import SkeletonEditProfile from "../common/skeletonEditProfile";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useAppDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");
  const [openSidebar, setOpenSidebar] = useState(false);

  const { details: user, loading } = useAppSelector((state) => state.user); // ✅ use loading also

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    currentLocation: "",
    gender: "",
    maritalStatus: "",
    dob: "",
    familyName: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = useState("/src/assets/profile-image.svg");

  useEffect(() => {
    if (!user?.profile) return;

    setForm({
      firstName: user.profile.FirstName || "",
      lastName: user.profile.LastName || "",
      currentLocation: user.profile.CurrentLocation || "",
      gender: user.profile.Gender || "",
      maritalStatus: user.profile.MaritalStatus || "",
      dob: user.profile.DateOfBirthString || "",
      familyName: user.profile.FamilyName || "",
      location: user.profile.Location || "",
    });
  }, [user]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(fileUrl);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!form.currentLocation.trim()) newErrors.currentLocation = "Current Location is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.maritalStatus) newErrors.maritalStatus = "Marital Status is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.familyName.trim()) newErrors.familyName = "Family Name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!user?._id) return;

    if (!validateForm()) return;

    const payload: UserProfileUpdateRequest = {
      FirstName: form.firstName,
      LastName: form.lastName,
      CurrentLocation: form.currentLocation,
      MaritalStatus: form.maritalStatus,
      Gender: form.gender,
      FamilyName: form.familyName,
      DateOfBirthString: form.dob,
      Location: form.location,
      PhotoContent: "",
      AboutMe: "",
      HighSchool: "",
      College: "",
      LinkedInUrl: "",
      Occupation: "",
      ContactNumber: "",
    };

    try {
      const res = await dispatch(updateUserProfile({ userId: user._id, payload })).unwrap();
      // update local state

      dispatch(userActions.setProfile({
        ...res.data,
        Gender: Number(res.data.Gender),
      }));
      // show success toast
      setSnackbarMsg("Profile updated successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
    } catch (err: any) {
      setSnackbarMsg(err.message || "Failed to update profile");
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#fff",
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "#72810B" },
      "&.Mui-focused fieldset": { borderColor: "#72810B" },
    },
    "& .MuiOutlinedInput-input": {
      p: "14px",
      fontSize: 16,
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px white inset",
      WebkitTextFillColor: "#000",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#72810B",
    },
  };
  if (!user || loading) return <SkeletonEditProfile />
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fff" }}>
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      <Box sx={{ flex: 1, px: isMobile ? 2 : 4, py: 3, pl: isMobile ? 2 : "356px", bgcolor: "#F8F9FA" }}>
        {/* Back arrow + title */}
        <Box display="flex" alignItems="center" mb={3} sx={{ mt: { xs: 6, md: 0 } }}>
          <IconButton onClick={() => navigate("/profile")} sx={{ p: 0, mr: 1 }}>
            <img src={BackArrow} alt="Back" style={{ width: 24, height: 24 }} />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            Edit Profile
          </Typography>
        </Box>

        {/* Profile Image Section */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
          mb={3}
          sx={{
            bgcolor: "#fff",
            p: 2,
            borderRadius: "16px",
            boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
            maxWidth: 600,
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={getProfileImage(user?._id)}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography fontWeight={700} fontSize="1.05rem">
                {user?.profile.FirstName} {user?.profile.LastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                {user?.Email}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: isMobile ? 2 : 0 }}>
            <Button
              variant="contained"
              component="label"
              sx={{
                bgcolor: "#556E0E",
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                py: 0.7,
                fontWeight: 600,
                "&:hover": { bgcolor: "#44570B" },
              }}
            >
              Change Photo
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>
        </Stack>

        {/* Input Fields */}
        <Stack spacing={2} maxWidth={600}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={textFieldStyles}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName}
            sx={textFieldStyles}
          />
          <TextField
            label="Current Location"
            name="currentLocation"
            value={form.currentLocation}
            onChange={handleChange}
            fullWidth
            error={!!errors.currentLocation}
            helperText={errors.currentLocation}
            sx={textFieldStyles}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            fullWidth
            error={!!errors.gender}
            helperText={errors.gender}
            sx={textFieldStyles}
          >
            <MenuItem value="1">Male</MenuItem>
            <MenuItem value="2">Female</MenuItem>
            <MenuItem value="3">Other</MenuItem>
          </TextField>
          <TextField
            select
            label="Marital Status"
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            fullWidth
            error={!!errors.maritalStatus}
            helperText={errors.maritalStatus}
            sx={textFieldStyles}
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
          </TextField>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob}
            sx={textFieldStyles}
          />
          <TextField
            label="Family Name"
            name="familyName"
            value={form.familyName}
            onChange={handleChange}
            fullWidth
            error={!!errors.familyName}
            helperText={errors.familyName}
            sx={textFieldStyles}
          />
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            error={!!errors.location}
            helperText={errors.location}
            sx={textFieldStyles}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#556E0E",
              "&:hover": { bgcolor: "#44570B" },
              textTransform: "none",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbarType} onClose={handleSnackbarClose} sx={{ width: "100%" }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default EditProfile;
