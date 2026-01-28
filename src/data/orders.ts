import { Order, Customer } from '@/types';
import { products } from './products';

export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Sophia Laurent',
    email: 'sophia.laurent@email.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Luxury Lane',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    totalOrders: 5,
    totalSpent: 1245,
    createdAt: '2024-01-15',
  },
  {
    id: 'c2',
    name: 'James Richardson',
    email: 'james.richardson@email.com',
    phone: '+44 20 7123 4567',
    address: {
      street: '45 Mayfair Avenue',
      city: 'London',
      state: '',
      postalCode: 'W1K 1AB',
      country: 'United Kingdom',
    },
    totalOrders: 3,
    totalSpent: 789,
    createdAt: '2024-02-20',
  },
  {
    id: 'c3',
    name: 'Isabella Martinez',
    email: 'isabella.m@email.com',
    phone: '+39 02 1234 5678',
    address: {
      street: 'Via Monte Napoleone 8',
      city: 'Milan',
      state: '',
      postalCode: '20121',
      country: 'Italy',
    },
    totalOrders: 7,
    totalSpent: 2156,
    createdAt: '2023-11-08',
  },
  {
    id: 'c4',
    name: 'Alexander Chen',
    email: 'alex.chen@email.com',
    phone: '+65 6789 1234',
    address: {
      street: '10 Orchard Road #12-05',
      city: 'Singapore',
      state: '',
      postalCode: '238838',
      country: 'Singapore',
    },
    totalOrders: 2,
    totalSpent: 458,
    createdAt: '2024-03-12',
  },
  {
    id: 'c5',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    phone: '+1 (555) 987-6543',
    address: {
      street: '789 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      postalCode: '10022',
      country: 'United States',
    },
    totalOrders: 4,
    totalSpent: 1567,
    createdAt: '2024-01-28',
  },
];

export const orders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'NE-2024-001',
    customer: customers[0],
    items: [
      {
        product: products[0],
        selectedSize: products[0].sizes[2],
        quantity: 1,
        price: 199,
      },
      {
        product: products[2],
        selectedSize: products[2].sizes[1],
        quantity: 1,
        price: 129,
      },
    ],
    subtotal: 328,
    deliveryCharge: 15,
    discount: 0,
    total: 343,
    status: 'delivered',
    paymentMethod: 'card',
    deliveryOption: 'express',
    createdAt: '2024-05-15T10:30:00Z',
    updatedAt: '2024-05-18T14:22:00Z',
    timeline: [
      { status: 'pending', date: '2024-05-15T10:30:00Z' },
      { status: 'confirmed', date: '2024-05-15T10:35:00Z', note: 'Payment confirmed' },
      { status: 'shipped', date: '2024-05-16T09:00:00Z', note: 'Package dispatched via Express' },
      { status: 'delivered', date: '2024-05-18T14:22:00Z', note: 'Delivered to recipient' },
    ],
  },
  {
    id: 'o2',
    orderNumber: 'NE-2024-002',
    customer: customers[1],
    items: [
      {
        product: products[4],
        selectedSize: products[4].sizes[1],
        quantity: 1,
        price: 249,
      },
    ],
    subtotal: 249,
    deliveryCharge: 0,
    discount: 25,
    total: 224,
    status: 'shipped',
    paymentMethod: 'card',
    deliveryOption: 'standard',
    createdAt: '2024-06-02T15:45:00Z',
    updatedAt: '2024-06-03T11:20:00Z',
    timeline: [
      { status: 'pending', date: '2024-06-02T15:45:00Z' },
      { status: 'confirmed', date: '2024-06-02T15:50:00Z', note: 'Payment confirmed' },
      { status: 'shipped', date: '2024-06-03T11:20:00Z', note: 'Package dispatched' },
    ],
  },
  {
    id: 'o3',
    orderNumber: 'NE-2024-003',
    customer: customers[2],
    items: [
      {
        product: products[7],
        selectedSize: products[7].sizes[2],
        quantity: 2,
        price: 390,
      },
      {
        product: products[1],
        selectedSize: products[1].sizes[0],
        quantity: 1,
        price: 95,
      },
    ],
    subtotal: 485,
    deliveryCharge: 0,
    discount: 50,
    total: 435,
    status: 'confirmed',
    paymentMethod: 'cod',
    deliveryOption: 'express',
    createdAt: '2024-06-10T09:15:00Z',
    updatedAt: '2024-06-10T09:20:00Z',
    timeline: [
      { status: 'pending', date: '2024-06-10T09:15:00Z' },
      { status: 'confirmed', date: '2024-06-10T09:20:00Z', note: 'Order confirmed' },
    ],
  },
  {
    id: 'o4',
    orderNumber: 'NE-2024-004',
    customer: customers[3],
    items: [
      {
        product: products[5],
        selectedSize: products[5].sizes[1],
        quantity: 1,
        price: 89,
      },
    ],
    subtotal: 89,
    deliveryCharge: 10,
    discount: 0,
    total: 99,
    status: 'pending',
    paymentMethod: 'card',
    deliveryOption: 'standard',
    createdAt: '2024-06-12T18:30:00Z',
    updatedAt: '2024-06-12T18:30:00Z',
    timeline: [
      { status: 'pending', date: '2024-06-12T18:30:00Z' },
    ],
  },
  {
    id: 'o5',
    orderNumber: 'NE-2024-005',
    customer: customers[4],
    items: [
      {
        product: products[10],
        selectedSize: products[10].sizes[2],
        quantity: 1,
        price: 249,
      },
      {
        product: products[6],
        selectedSize: products[6].sizes[1],
        quantity: 1,
        price: 159,
      },
    ],
    subtotal: 408,
    deliveryCharge: 0,
    discount: 40,
    total: 368,
    status: 'cancelled',
    paymentMethod: 'card',
    deliveryOption: 'express',
    createdAt: '2024-06-01T12:00:00Z',
    updatedAt: '2024-06-02T10:15:00Z',
    timeline: [
      { status: 'pending', date: '2024-06-01T12:00:00Z' },
      { status: 'confirmed', date: '2024-06-01T12:05:00Z', note: 'Payment confirmed' },
      { status: 'cancelled', date: '2024-06-02T10:15:00Z', note: 'Cancelled by customer' },
    ],
  },
];

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(o => o.id === id);
};

export const getOrderByNumber = (orderNumber: string): Order | undefined => {
  return orders.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase());
};

export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(c => c.id === id);
};
