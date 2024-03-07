import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const ProductsData = [
  {
    title: '프로젝트 01',
    price: 275,
    discount: 25,
    related: false,
    salesPrice: 350,
    category: ['books'],
    gender: 'Men',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF'],
    photo: "/images/products/s1.jpg",
    id: 1,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: '프로젝트 02',
    price: 89,
    discount: 10,
    related: true,
    salesPrice: 99,
    category: ['books'],
    gender: 'Women',
    rating: 3,
    stock: false,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FF4842'],
    photo: "/images/products/s2.jpg",
    id: 2,
    created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: '프로젝트 03',
    price: 125,
    discount: 12,
    related: false,
    salesPrice: 137,
    category: ['fashion', 'books'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: "/images/products/s3.jpg",
    id: 3,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: '프로젝트 04',
    price: 50,
    discount: 15,
    related: true,
    salesPrice: 65,
    category: ['electronics'],
    gender: 'Men',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: "/images/products/s4.jpg",
    id: 4,
    created: sub(new Date(), { days: 4, hours: 9, minutes: 40 }),
    description: chance.paragraph({ sentences: 2 }),
  },
 
];

mock.onGet('/api/data/eCommerce/ProductsData').reply(() => {
  return [200, ProductsData];
});

export default ProductsData;
