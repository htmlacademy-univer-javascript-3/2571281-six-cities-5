import { Offer } from '../types';

const offers: Offer[] = [
  {
    isPremium: true,
    imageUrl: 'img/apartment-01.jpg',
    price: 120,
    isBookmarked: false,
    rating: 80,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    isPremium: false,
    imageUrl: 'img/room.jpg',
    price: 80,
    isBookmarked: true,
    rating: 80,
    title: 'Wood and stone place',
    type: 'Room',
  },
  {
    isPremium: true,
    imageUrl: 'img/apartment-02.jpg',
    price: 132,
    isBookmarked: false,
    rating: 80,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    isPremium: true,
    imageUrl: 'img/apartment-03.jpg',
    price: 180,
    isBookmarked: false,
    rating: 100,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  }
];

export default offers;
