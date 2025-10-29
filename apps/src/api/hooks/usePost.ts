import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getPosts } from "../../slice/postSlice";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../services";
import { useAuth } from "./useAuth";


export const usePost = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      const decodedUserDetails: JwtPayload = jwtDecode(token ?? "");

      if (decodedUserDetails.id) {
        dispatch(getPosts({ userId: decodedUserDetails.id, token }));
      }
    }
  }, [dispatch, token]);

  return { posts, loading, error };
};
