export interface PostFromAPI {
  Post: {
      _id: string;
    Text: string;
    PostDateTimeJson: number;
    UpdatedAtJson: number;
    PostDateTimeString: string;
    UserId: string;
    PostTypeId: number;
    PostTargetTypeId: number;
    Name?: string | null;
    PhotoPath?: string | null;
    SourceType: number;
    TopTenPostPhotos?: {
      _id: string;
      PhotoPath: string;
      Width: number;
      Height: number;
      CreatedBy: string;
      UpdatedBy: string;
      PostId: string;
      CreatedAt: { low: number; high: number; unsigned: boolean };
      UpdatedAt: { low: number; high: number; unsigned: boolean };
    }[];
    PostPhotoCount: number;
    LatestFivePostComments?: any;
    PostCommentCount: number;
    PostEmotionMetrics?: any;
    CustomData?: any;
    UpdatedAt: number;
    CreatedAt: number;
    CreatedBy: string;
    UpdatedBy: string;
  };
  PostPhotoInfo: {
    PhotoCount: number;
    PageSize: number;
    PageIndex: number;
    PostPhotos: {
      _id: string;
      PhotoPath: string;
      Width: number;
      Height: number;
      CreatedBy: string;
      UpdatedBy: string;
      PostId: string;
      CreatedAt: { low: number; high: number; unsigned: boolean };
      UpdatedAt: { low: number; high: number; unsigned: boolean };
    }[];
  };
  PostCommentInfo: {
    CommentCount: number;
    PageSize: number;
    PageIndex: number;
    PostComment?: any;
    PostComments?: any;
  };
  PostEmotionInfo: {
    EmotionCount: number;
    LikeCount: number;
    LoveCount: number;
    WowCount: number;
    HaHaCount: number;
    SadCount: number;
    AngryCount: number;
    PostEmotion?: any;
  };
  RecentPostsCount: number;
}

export interface PostsResponse {
  status: string;
  code: number;
  message: string;
  data: {
    posts: PostFromAPI[];
  };
}
