export type Review = {
    userName: string;
    userAvatar: string;
    rating: number;
    text: string;
    date: string;
  };

export type Offer = {
    id: number;
    isPremium: boolean;
    imageUrl: string;
    imageUrls: string[];
    price: number;
    isBookmarked: boolean;
    rating: number;
    title: string;
    type: string;
    features: string[];
    hostAvatar: string;
    hostName: string;
    hostStatus: string;
    description: string[];
    reviews: Review[];
  };
