import { Offer } from '../types';

const offers: Offer[] = [
  {
    id: 1,
    isPremium: false,
    imageUrl: 'img/apartment-01.jpg',
    price: 150,
    isBookmarked: true,
    rating: 75,
    title: 'Modern apartment in the heart of the city',
    type: 'Apartment',
  },
  {
    id: 2,
    isPremium: true,
    imageUrl: 'img/room.jpg',
    price: 60,
    isBookmarked: false,
    rating: 85,
    title: 'Charming studio with great amenities',
    type: 'Studio',
  },
  {
    id: 3,
    isPremium: false,
    imageUrl: 'img/apartment-02.jpg',
    price: 200,
    isBookmarked: false,
    rating: 90,
    title: 'Spacious loft with rooftop terrace',
    type: 'Loft',
  },
  {
    id: 4,
    isPremium: true,
    imageUrl: 'img/apartment-03.jpg',
    price: 170,
    isBookmarked: true,
    rating: 95,
    title: 'Cozy house with garden access',
    type: 'House',
  },
];


export default offers;
