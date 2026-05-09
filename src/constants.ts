import { Video } from './types';

export const PAKISTAN_BOUNDS = {
  north: 37.1,
  south: 23.6,
  west: 60.8,
  east: 77.9,
};

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnail: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: {
      username: 'kartik_dancer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik',
      name: 'Kartik Sharma',
    },
    caption: 'Chai and vibes in Delhi! ☕️✨ #FridayNight #DelhiDiaries',
    music: 'Original Sound - Kartik Sharma',
    likes: 12400,
    comments: 890,
    shares: 450,
    views: 1250000,
  },
  {
    id: '2',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: {
      username: 'priya_travels',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      name: 'Priya Verma',
    },
    caption: 'Mumbai rains are something else! 🌧️💙 #MumbaiRains #GatewayOfIndia',
    music: 'Rimjhim Gire Saawan - Remix',
    likes: 45600,
    comments: 2300,
    shares: 1200,
    views: 8900000,
  },
  {
    id: '3',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    thumbnail: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    author: {
      username: 'tech_guru',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech',
      name: 'Rahul Kumar',
    },
    caption: 'Unboxing the new tech in Bangalore! 🚀💻 #SiliconValleyOfIndia #TechLife',
    music: 'Cyberpunk Vibes - Rahul',
    likes: 8900,
    comments: 450,
    shares: 120,
    views: 540000,
  },
];
