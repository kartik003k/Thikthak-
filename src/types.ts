export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  author: {
    username: string;
    avatar: string;
    name: string;
  };
  caption: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked?: boolean;
}

export type GeolocationStatus = 'loading' | 'granted' | 'denied' | 'restricted' | 'unknown';
