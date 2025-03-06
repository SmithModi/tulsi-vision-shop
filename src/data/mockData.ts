
import { Product } from '@/context/CartContext';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Montblanc MB0036O Optical Frame',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=2000',
    category: 'optical',
    brand: 'Montblanc',
    description: 'Elegant Montblanc optical frames crafted with premium materials. These sophisticated frames feature the iconic Montblanc emblem and provide exceptional comfort for all-day wear. The timeless design complements both formal and casual attire.'
  },
  {
    id: '2',
    name: 'Ray-Ban Wayfarer Classic',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=2000',
    category: 'sunglasses',
    brand: 'Ray-Ban',
    description: 'The Ray-Ban Wayfarer is simply iconic. First released in 1952, the design has stood the test of time and remains one of the most recognizable eyewear styles in the world. These sunglasses feature polarized lenses that provide 100% UV protection.'
  },
  {
    id: '3',
    name: 'Persol 649 Series Sunglasses',
    price: 22999,
    image: 'https://images.unsplash.com/photo-1625591341337-13402c773e01?auto=format&fit=crop&q=80&w=2000',
    category: 'sunglasses',
    brand: 'Persol',
    description: 'The iconic Persol 649 series, worn by legends of cinema. These handcrafted sunglasses feature crystal lenses, supreme comfort with the patented Meflecto temples, and the distinctive Supreme Arrow metal hinges.'
  },
  {
    id: '4',
    name: 'Oakley Holbrook XL',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=2000',
    category: 'sunglasses',
    brand: 'Oakley',
    description: 'The Holbrook XL is the larger version of Oakley\'s classic Holbrook model. Enhanced lens coverage and a slightly wider fit make these perfect for larger faces. Features Prizm™ lenses for enhanced color and contrast.'
  },
  {
    id: '5',
    name: 'Montblanc MB0724S Sunglasses',
    price: 41999,
    image: 'https://images.unsplash.com/photo-1612729675540-fe5f8f64e326?auto=format&fit=crop&q=80&w=2000',
    category: 'sunglasses',
    brand: 'Montblanc',
    description: 'Luxurious aviator-style sunglasses featuring premium acetate frames and stainless steel temples with the Montblanc emblem. These sophisticated sunglasses offer full UV protection while expressing timeless elegance.'
  },
  {
    id: '6',
    name: 'Oliver Peoples Gregory Peck',
    price: 31999,
    image: 'https://images.unsplash.com/photo-1615468822882-4828d2602857?auto=format&fit=crop&q=80&w=2000',
    category: 'optical',
    brand: 'Oliver Peoples',
    description: 'Inspired by the glasses worn by Gregory Peck as Atticus Finch in the film "To Kill a Mockingbird". These round frames are made from premium acetate and feature distinctive details like the Oliver Peoples logo on the temples.'
  },
  {
    id: '7',
    name: 'Tom Ford FT5634-B Blue Filter',
    price: 37999,
    image: 'https://images.unsplash.com/photo-1582142407894-ec8ceae8cd88?auto=format&fit=crop&q=80&w=2000',
    category: 'optical',
    brand: 'Tom Ford',
    description: 'Sophisticated rectangular frames from Tom Ford featuring blue light filtering lenses to protect eyes from digital strain. The signature "T" metal decoration on temples adds a touch of luxury to these elegant frames.'
  },
  {
    id: '8',
    name: 'Prada PR 17WS Ultravox',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1625591341546-38d9ea1dce6d?auto=format&fit=crop&q=80&w=2000',
    category: 'sunglasses',
    brand: 'Prada',
    description: 'These bold cat-eye sunglasses from Prada\'s Ultravox collection make a fashion statement with their unique angular silhouette. Features gradient lenses and the recognizable Prada logo on the temples.'
  },
  {
    id: '9',
    name: 'Gucci GG0396S Round Sunglasses',
    price: 32999,
    image: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&q=80&w=2000',
    category: 'sunglasses',
    brand: 'Gucci',
    description: 'Vintage-inspired round metal frames with the iconic Gucci web stripe detail on the temples. These sunglasses combine retro charm with modern luxury, featuring 100% UV protection and adjustable nose pads for comfort.'
  },
  {
    id: '10',
    name: 'Montblanc MB0042O Smart Reading',
    price: 39999,
    image: 'https://images.unsplash.com/photo-1633620135408-6466f078a47b?auto=format&fit=crop&q=80&w=2000',
    category: 'optical',
    brand: 'Montblanc',
    description: 'Revolutionary reading glasses with progressive smart lenses that adjust based on viewing distance. The elegant frame design features Montblanc\'s signature details and craftsmanship for both style and functionality.'
  },
  {
    id: '11',
    name: 'Dior BlackSuit Optical',
    price: 42999,
    image: 'https://images.unsplash.com/photo-1599838082471-edc942494d55?auto=format&fit=crop&q=80&w=2000',
    category: 'optical',
    brand: 'Dior',
    description: 'Modern rectangular frames from Dior\'s BlackSuit collection with clean lines and minimalist design. These lightweight frames feature Dior\'s CD logo detail on the temples for a subtle yet recognizable brand signature.'
  },
  {
    id: '12',
    name: 'Cartier Santos de Cartier',
    price: 56999,
    image: 'https://images.unsplash.com/photo-1633677560477-b14a5e0a51d0?auto=format&fit=crop&q=80&w=2000',
    category: 'optical',
    brand: 'Cartier',
    description: 'Luxurious aviator-style optical frames with Cartier\'s signature screw details inspired by the iconic Santos watch. Crafted from premium materials including titanium and gold-finish accents for enduring elegance.'
  }
];

export const brands = [
  { value: 'all', label: 'All Brands' },
  { value: 'montblanc', label: 'Montblanc' },
  { value: 'ray-ban', label: 'Ray-Ban' },
  { value: 'persol', label: 'Persol' },
  { value: 'oakley', label: 'Oakley' },
  { value: 'oliver-peoples', label: 'Oliver Peoples' },
  { value: 'tom-ford', label: 'Tom Ford' },
  { value: 'prada', label: 'Prada' },
  { value: 'gucci', label: 'Gucci' },
  { value: 'dior', label: 'Dior' },
  { value: 'cartier', label: 'Cartier' }
];

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'sunglasses', label: 'Sunglasses' },
  { value: 'optical', label: 'Optical Frames' },
  { value: 'accessories', label: 'Accessories' }
];
