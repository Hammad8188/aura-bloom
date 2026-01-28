import { Product, Testimonial, Review } from '@/types';
import midnightNoirImg from '@/assets/product-midnight-noir.jpg';
import goldenElixirImg from '@/assets/product-golden-elixir.jpg';
import velvetRoseImg from '@/assets/product-velvet-rose.jpg';
import oceanBreezeImg from '@/assets/product-ocean-breeze.jpg';
import oudRoyaleImg from '@/assets/product-oud-royale.jpg';
import jasmineDreamsImg from '@/assets/product-jasmine-dreams.jpg';
import mysticWoodsImg from '@/assets/product-mystic-woods.jpg';
import citrusSunriseImg from '@/assets/product-citrus-sunrise.jpg';
import amberPassionImg from '@/assets/product-amber-passion.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Midnight Noir',
    brand: 'NOIR ESSENCE',
    description: 'A captivating journey through the depths of night. Midnight Noir opens with an intoxicating burst of bergamot and black pepper, leading to a heart of dark rose and oud. The base reveals smoky amber, vanilla absolute, and precious sandalwood, creating an unforgettable trail that lingers until dawn.',
    shortDescription: 'An intense, mysterious fragrance for the bold and sophisticated.',
    images: [midnightNoirImg, midnightNoirImg, midnightNoirImg, midnightNoirImg],
    sizes: [
      { size: '30ml', price: 89, stock: 25 },
      { size: '50ml', price: 139, originalPrice: 159, stock: 18 },
      { size: '100ml', price: 199, originalPrice: 229, stock: 12 },
    ],
    fragranceFamily: 'oriental',
    gender: 'unisex',
    occasion: ['night', 'party', 'special'],
    fragrancePyramid: {
      top: [
        { name: 'Bergamot', description: 'Fresh, citrusy opening' },
        { name: 'Black Pepper', description: 'Spicy warmth' },
        { name: 'Cardamom', description: 'Exotic spice' },
      ],
      heart: [
        { name: 'Dark Rose', description: 'Deep, romantic floral' },
        { name: 'Oud', description: 'Precious, woody richness' },
        { name: 'Saffron', description: 'Golden luxury' },
      ],
      base: [
        { name: 'Amber', description: 'Warm, resinous depth' },
        { name: 'Vanilla Absolute', description: 'Creamy sweetness' },
        { name: 'Sandalwood', description: 'Creamy, woody finish' },
      ],
    },
    longevity: 9,
    sillage: 8,
    rating: 4.8,
    reviewCount: 127,
    isBestSeller: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Golden Elixir',
    brand: 'NOIR ESSENCE',
    description: 'Inspired by the golden hour, this luxurious elixir captures the warmth of sunlight on precious resins. A sophisticated blend of honey, immortelle, and benzoin creates an aura of opulence and refinement.',
    shortDescription: 'A warm, honeyed fragrance that glows with golden sophistication.',
    images: [goldenElixirImg, goldenElixirImg, goldenElixirImg, goldenElixirImg],
    sizes: [
      { size: '30ml', price: 95, stock: 20 },
      { size: '50ml', price: 149, stock: 15 },
      { size: '100ml', price: 219, stock: 8 },
    ],
    fragranceFamily: 'oriental',
    gender: 'women',
    occasion: ['night', 'special', 'party'],
    fragrancePyramid: {
      top: [
        { name: 'Honey', description: 'Sweet, golden nectar' },
        { name: 'Bergamot', description: 'Fresh brightness' },
        { name: 'Pink Pepper', description: 'Spicy spark' },
      ],
      heart: [
        { name: 'Immortelle', description: 'Warm, curry-like floral' },
        { name: 'Jasmine Sambac', description: 'Intoxicating white floral' },
        { name: 'Ylang-Ylang', description: 'Exotic richness' },
      ],
      base: [
        { name: 'Benzoin', description: 'Warm vanilla resin' },
        { name: 'Tonka Bean', description: 'Almond sweetness' },
        { name: 'Musk', description: 'Soft, sensual base' },
      ],
    },
    longevity: 8,
    sillage: 7,
    rating: 4.7,
    reviewCount: 89,
    isNew: true,
    createdAt: '2024-06-01',
  },
  {
    id: '3',
    name: 'Velvet Rose',
    brand: 'NOIR ESSENCE',
    description: 'The quintessential rose reimagined with modern elegance. Bulgarian rose absolute meets Turkish rose otto in a velvety embrace, surrounded by raspberry, patchouli, and white musk. A timeless fragrance for the romantic soul.',
    shortDescription: 'A luxurious rose fragrance with velvety depth and romance.',
    images: [velvetRoseImg, velvetRoseImg, velvetRoseImg, velvetRoseImg],
    sizes: [
      { size: '30ml', price: 79, stock: 30 },
      { size: '50ml', price: 129, stock: 22 },
      { size: '100ml', price: 189, stock: 15 },
    ],
    fragranceFamily: 'floral',
    gender: 'women',
    occasion: ['day', 'office', 'special'],
    fragrancePyramid: {
      top: [
        { name: 'Raspberry', description: 'Juicy sweetness' },
        { name: 'Lychee', description: 'Exotic freshness' },
        { name: 'Pink Pepper', description: 'Spicy brightness' },
      ],
      heart: [
        { name: 'Bulgarian Rose', description: 'Rich, honeyed rose' },
        { name: 'Turkish Rose Otto', description: 'Deep, complex rose' },
        { name: 'Peony', description: 'Fresh, dewy floral' },
      ],
      base: [
        { name: 'Patchouli', description: 'Earthy depth' },
        { name: 'White Musk', description: 'Clean, soft finish' },
        { name: 'Cashmeran', description: 'Cozy warmth' },
      ],
    },
    longevity: 7,
    sillage: 6,
    rating: 4.9,
    reviewCount: 156,
    isBestSeller: true,
    createdAt: '2023-09-20',
  },
  {
    id: '4',
    name: 'Ocean Breeze',
    brand: 'NOIR ESSENCE',
    description: 'Escape to sun-drenched shores with this refreshing aquatic masterpiece. Sea salt mingles with bergamot and green tea, while driftwood and white musk create a sophisticated dry-down that evokes endless summer days.',
    shortDescription: 'A fresh, invigorating scent that captures the essence of the sea.',
    images: [oceanBreezeImg, oceanBreezeImg, oceanBreezeImg, oceanBreezeImg],
    sizes: [
      { size: '30ml', price: 69, stock: 35 },
      { size: '50ml', price: 109, stock: 28 },
      { size: '100ml', price: 159, stock: 20 },
    ],
    fragranceFamily: 'fresh',
    gender: 'unisex',
    occasion: ['day', 'casual', 'office'],
    fragrancePyramid: {
      top: [
        { name: 'Sea Salt', description: 'Oceanic freshness' },
        { name: 'Bergamot', description: 'Citrus brightness' },
        { name: 'Green Tea', description: 'Clean, crisp note' },
      ],
      heart: [
        { name: 'Lotus', description: 'Aquatic floral' },
        { name: 'Sea Lily', description: 'Delicate marine flower' },
        { name: 'Jasmine', description: 'White floral touch' },
      ],
      base: [
        { name: 'Driftwood', description: 'Weathered woody note' },
        { name: 'White Musk', description: 'Clean, soft base' },
        { name: 'Ambergris', description: 'Marine warmth' },
      ],
    },
    longevity: 6,
    sillage: 5,
    rating: 4.5,
    reviewCount: 73,
    createdAt: '2024-03-10',
  },
  {
    id: '5',
    name: 'Oud Royale',
    brand: 'NOIR ESSENCE',
    description: 'The king of fragrances for those who command attention. Rare Cambodian oud meets precious Damascus rose, while saffron and amber create an aura of unmatched luxury. A statement fragrance for the distinguished.',
    shortDescription: 'An opulent oud fragrance fit for royalty.',
    images: [oudRoyaleImg, oudRoyaleImg, oudRoyaleImg, oudRoyaleImg],
    sizes: [
      { size: '30ml', price: 159, stock: 10 },
      { size: '50ml', price: 249, stock: 8 },
      { size: '100ml', price: 399, stock: 5 },
    ],
    fragranceFamily: 'oud',
    gender: 'men',
    occasion: ['night', 'special', 'party'],
    fragrancePyramid: {
      top: [
        { name: 'Saffron', description: 'Precious golden spice' },
        { name: 'Cardamom', description: 'Aromatic warmth' },
        { name: 'Cinnamon', description: 'Spicy richness' },
      ],
      heart: [
        { name: 'Cambodian Oud', description: 'Rare, animalic wood' },
        { name: 'Damascus Rose', description: 'Luxurious floral' },
        { name: 'Orris', description: 'Powdery elegance' },
      ],
      base: [
        { name: 'Amber', description: 'Golden warmth' },
        { name: 'Sandalwood', description: 'Creamy wood' },
        { name: 'Musk', description: 'Sensual depth' },
      ],
    },
    longevity: 10,
    sillage: 9,
    rating: 4.9,
    reviewCount: 45,
    isLimitedEdition: true,
    createdAt: '2024-02-14',
  },
  {
    id: '6',
    name: 'Citrus Sunrise',
    brand: 'NOIR ESSENCE',
    description: 'Awaken your senses with this vibrant citrus celebration. Italian lemon and blood orange dance with grapefruit and neroli, while white tea and musk provide an elegant, lasting foundation.',
    shortDescription: 'A bright, energizing citrus fragrance for the optimist.',
    images: [citrusSunriseImg, citrusSunriseImg, citrusSunriseImg, citrusSunriseImg],
    sizes: [
      { size: '30ml', price: 59, stock: 40 },
      { size: '50ml', price: 89, stock: 32 },
      { size: '100ml', price: 129, stock: 25 },
    ],
    fragranceFamily: 'citrus',
    gender: 'unisex',
    occasion: ['day', 'office', 'casual'],
    fragrancePyramid: {
      top: [
        { name: 'Italian Lemon', description: 'Bright, zesty' },
        { name: 'Blood Orange', description: 'Sweet, tangy citrus' },
        { name: 'Grapefruit', description: 'Bitter freshness' },
      ],
      heart: [
        { name: 'Neroli', description: 'Orange blossom elegance' },
        { name: 'Petitgrain', description: 'Green, aromatic' },
        { name: 'White Tea', description: 'Clean, refined' },
      ],
      base: [
        { name: 'White Musk', description: 'Soft, clean finish' },
        { name: 'Cedar', description: 'Dry woody note' },
        { name: 'Vetiver', description: 'Earthy depth' },
      ],
    },
    longevity: 5,
    sillage: 4,
    rating: 4.4,
    reviewCount: 98,
    createdAt: '2024-04-05',
  },
  {
    id: '7',
    name: 'Mystic Woods',
    brand: 'NOIR ESSENCE',
    description: 'Journey into an enchanted forest with this captivating woody fragrance. Rare woods from around the world unite with mystical incense and leather, creating an aura of power and sophistication.',
    shortDescription: 'A deep, mysterious woody fragrance for the explorer.',
    images: [mysticWoodsImg, mysticWoodsImg, mysticWoodsImg, mysticWoodsImg],
    sizes: [
      { size: '30ml', price: 99, stock: 18 },
      { size: '50ml', price: 159, stock: 14 },
      { size: '100ml', price: 229, stock: 10 },
    ],
    fragranceFamily: 'woody',
    gender: 'men',
    occasion: ['night', 'office', 'special'],
    fragrancePyramid: {
      top: [
        { name: 'Juniper Berries', description: 'Aromatic freshness' },
        { name: 'Elemi', description: 'Citrus resin' },
        { name: 'Black Pepper', description: 'Spicy warmth' },
      ],
      heart: [
        { name: 'Guaiac Wood', description: 'Smoky, creamy wood' },
        { name: 'Cedar Atlas', description: 'Dry, aromatic' },
        { name: 'Incense', description: 'Sacred smoke' },
      ],
      base: [
        { name: 'Vetiver', description: 'Deep, earthy roots' },
        { name: 'Leather', description: 'Luxurious, refined' },
        { name: 'Moss', description: 'Forest floor' },
      ],
    },
    longevity: 8,
    sillage: 7,
    rating: 4.6,
    reviewCount: 67,
    createdAt: '2024-01-08',
  },
  {
    id: '8',
    name: 'Jasmine Dreams',
    brand: 'NOIR ESSENCE',
    description: 'Surrender to the intoxicating beauty of jasmine at dusk. Indian jasmine sambac weaves with tuberose and orange blossom, while sandalwood and musk create a dreamy, sensual trail.',
    shortDescription: 'A heady, romantic white floral for dreamers.',
    images: [jasmineDreamsImg, jasmineDreamsImg, jasmineDreamsImg, jasmineDreamsImg],
    sizes: [
      { size: '30ml', price: 85, stock: 22 },
      { size: '50ml', price: 135, stock: 16 },
      { size: '100ml', price: 195, stock: 11 },
    ],
    fragranceFamily: 'floral',
    gender: 'women',
    occasion: ['night', 'special', 'party'],
    fragrancePyramid: {
      top: [
        { name: 'Orange Blossom', description: 'Fresh, honeyed floral' },
        { name: 'Neroli', description: 'Citrus elegance' },
        { name: 'Green Notes', description: 'Dewy freshness' },
      ],
      heart: [
        { name: 'Jasmine Sambac', description: 'Intoxicating, rich' },
        { name: 'Tuberose', description: 'Creamy, narcotic' },
        { name: 'Gardenia', description: 'Lush, tropical' },
      ],
      base: [
        { name: 'Sandalwood', description: 'Creamy, soft wood' },
        { name: 'White Musk', description: 'Clean sensuality' },
        { name: 'Benzoin', description: 'Warm sweetness' },
      ],
    },
    longevity: 7,
    sillage: 6,
    rating: 4.7,
    reviewCount: 112,
    isBestSeller: true,
    createdAt: '2023-11-15',
  },
  {
    id: '9',
    name: 'Amber Passion',
    brand: 'NOIR ESSENCE',
    description: 'Embrace the warmth of ancient amber in this passionate oriental. Rich amber absolute mingles with vanilla, labdanum, and precious woods, creating an irresistible aura of seduction.',
    shortDescription: 'A warm, passionate amber fragrance for the seductive.',
    images: [amberPassionImg, amberPassionImg, amberPassionImg, amberPassionImg],
    sizes: [
      { size: '30ml', price: 89, stock: 20 },
      { size: '50ml', price: 139, stock: 16 },
      { size: '100ml', price: 199, stock: 12 },
    ],
    fragranceFamily: 'oriental',
    gender: 'unisex',
    occasion: ['night', 'special', 'party'],
    fragrancePyramid: {
      top: [
        { name: 'Bergamot', description: 'Citrus brightness' },
        { name: 'Cinnamon', description: 'Spicy warmth' },
        { name: 'Ginger', description: 'Fresh heat' },
      ],
      heart: [
        { name: 'Amber Absolute', description: 'Rich, golden warmth' },
        { name: 'Labdanum', description: 'Deep, animalic resin' },
        { name: 'Rose', description: 'Romantic touch' },
      ],
      base: [
        { name: 'Vanilla', description: 'Sweet comfort' },
        { name: 'Sandalwood', description: 'Creamy wood' },
        { name: 'Musk', description: 'Sensual depth' },
      ],
    },
    longevity: 9,
    sillage: 8,
    rating: 4.8,
    reviewCount: 94,
    createdAt: '2024-02-28',
  },
  {
    id: '10',
    name: 'Fresh Linen',
    brand: 'NOIR ESSENCE',
    description: 'Experience the purity of freshly laundered linens dried in the summer breeze. Clean musks, white florals, and a touch of aldehydes create an impeccably fresh, sophisticated scent.',
    shortDescription: 'A pristine, clean fragrance for the minimalist.',
    images: [oceanBreezeImg, oceanBreezeImg, oceanBreezeImg, oceanBreezeImg],
    sizes: [
      { size: '30ml', price: 65, stock: 30 },
      { size: '50ml', price: 99, stock: 25 },
      { size: '100ml', price: 145, stock: 18 },
    ],
    fragranceFamily: 'fresh',
    gender: 'unisex',
    occasion: ['day', 'office', 'casual'],
    fragrancePyramid: {
      top: [
        { name: 'Aldehydes', description: 'Clean, soapy' },
        { name: 'Bergamot', description: 'Fresh citrus' },
        { name: 'Ozonic Notes', description: 'Airy freshness' },
      ],
      heart: [
        { name: 'White Lily', description: 'Pure, elegant' },
        { name: 'Iris', description: 'Powdery floral' },
        { name: 'Cyclamen', description: 'Delicate, green' },
      ],
      base: [
        { name: 'White Musk', description: 'Clean, soft' },
        { name: 'Cotton Flower', description: 'Cozy warmth' },
        { name: 'Sandalwood', description: 'Creamy finish' },
      ],
    },
    longevity: 5,
    sillage: 4,
    rating: 4.3,
    reviewCount: 56,
    createdAt: '2024-05-12',
  },
  {
    id: '11',
    name: 'Noir Leather',
    brand: 'NOIR ESSENCE',
    description: 'The essence of luxury automobiles and fine leather goods. Supple leather meets smoky vetiver and dark woods, while saffron and oud add an exotic, opulent dimension.',
    shortDescription: 'A sophisticated leather fragrance for the connoisseur.',
    images: [mysticWoodsImg, mysticWoodsImg, mysticWoodsImg, mysticWoodsImg],
    sizes: [
      { size: '30ml', price: 109, stock: 15 },
      { size: '50ml', price: 169, stock: 12 },
      { size: '100ml', price: 249, stock: 8 },
    ],
    fragranceFamily: 'woody',
    gender: 'men',
    occasion: ['night', 'office', 'special'],
    fragrancePyramid: {
      top: [
        { name: 'Saffron', description: 'Exotic richness' },
        { name: 'Cardamom', description: 'Aromatic spice' },
        { name: 'Pink Pepper', description: 'Spicy brightness' },
      ],
      heart: [
        { name: 'Leather', description: 'Supple, refined' },
        { name: 'Oud', description: 'Smoky depth' },
        { name: 'Iris', description: 'Powdery elegance' },
      ],
      base: [
        { name: 'Vetiver', description: 'Smoky, earthy' },
        { name: 'Sandalwood', description: 'Creamy wood' },
        { name: 'Amber', description: 'Warm foundation' },
      ],
    },
    longevity: 9,
    sillage: 8,
    rating: 4.7,
    reviewCount: 78,
    createdAt: '2024-01-22',
  },
  {
    id: '12',
    name: 'Peony Blush',
    brand: 'NOIR ESSENCE',
    description: 'A delicate symphony of peony petals kissed by morning dew. This feminine fragrance captures the ephemeral beauty of a spring garden in full bloom, with soft fruits and creamy musks.',
    shortDescription: 'A delicate, feminine peony fragrance for the romantic.',
    images: [velvetRoseImg, velvetRoseImg, velvetRoseImg, velvetRoseImg],
    sizes: [
      { size: '30ml', price: 75, stock: 28 },
      { size: '50ml', price: 119, stock: 20 },
      { size: '100ml', price: 175, stock: 14 },
    ],
    fragranceFamily: 'floral',
    gender: 'women',
    occasion: ['day', 'office', 'casual'],
    fragrancePyramid: {
      top: [
        { name: 'Pear', description: 'Juicy, sweet' },
        { name: 'Apple Blossom', description: 'Delicate, fresh' },
        { name: 'Pink Grapefruit', description: 'Sparkling citrus' },
      ],
      heart: [
        { name: 'Peony', description: 'Soft, romantic' },
        { name: 'Rose Petals', description: 'Delicate floral' },
        { name: 'Lily of the Valley', description: 'Fresh, green' },
      ],
      base: [
        { name: 'Musk', description: 'Soft, powdery' },
        { name: 'Cashmere Wood', description: 'Cozy warmth' },
        { name: 'Ambrette', description: 'Musky sweetness' },
      ],
    },
    longevity: 6,
    sillage: 5,
    rating: 4.5,
    reviewCount: 103,
    isNew: true,
    createdAt: '2024-06-15',
  },
  {
    id: '13',
    name: 'Smoky Vetiver',
    brand: 'NOIR ESSENCE',
    description: 'A bold, masculine fragrance that combines the earthiness of vetiver with smoky birch tar. Hints of tobacco and leather add complexity to this sophisticated, modern gentleman scent.',
    shortDescription: 'A bold, smoky fragrance for the modern gentleman.',
    images: [mysticWoodsImg, mysticWoodsImg, mysticWoodsImg, mysticWoodsImg],
    sizes: [
      { size: '30ml', price: 95, stock: 16 },
      { size: '50ml', price: 149, stock: 12 },
      { size: '100ml', price: 219, stock: 9 },
    ],
    fragranceFamily: 'woody',
    gender: 'men',
    occasion: ['night', 'office', 'casual'],
    fragrancePyramid: {
      top: [
        { name: 'Bergamot', description: 'Fresh opening' },
        { name: 'Grapefruit', description: 'Bitter brightness' },
        { name: 'Black Pepper', description: 'Spicy kick' },
      ],
      heart: [
        { name: 'Vetiver', description: 'Earthy, smoky' },
        { name: 'Birch Tar', description: 'Smoky leather' },
        { name: 'Geranium', description: 'Green floral' },
      ],
      base: [
        { name: 'Tobacco', description: 'Warm, aromatic' },
        { name: 'Leather', description: 'Refined richness' },
        { name: 'Oakmoss', description: 'Forest depth' },
      ],
    },
    longevity: 8,
    sillage: 7,
    rating: 4.6,
    reviewCount: 61,
    createdAt: '2024-03-25',
  },
  {
    id: '14',
    name: 'White Orchid',
    brand: 'NOIR ESSENCE',
    description: 'An exotic journey to tropical paradise. Rare white orchid blooms with coconut and ylang-ylang, while sandalwood and vanilla create a sensual, creamy trail.',
    shortDescription: 'An exotic, tropical floral for the adventurous spirit.',
    images: [jasmineDreamsImg, jasmineDreamsImg, jasmineDreamsImg, jasmineDreamsImg],
    sizes: [
      { size: '30ml', price: 82, stock: 24 },
      { size: '50ml', price: 129, stock: 18 },
      { size: '100ml', price: 189, stock: 12 },
    ],
    fragranceFamily: 'floral',
    gender: 'women',
    occasion: ['night', 'party', 'special'],
    fragrancePyramid: {
      top: [
        { name: 'Coconut', description: 'Tropical sweetness' },
        { name: 'Bergamot', description: 'Fresh citrus' },
        { name: 'Lychee', description: 'Exotic fruit' },
      ],
      heart: [
        { name: 'White Orchid', description: 'Exotic, creamy' },
        { name: 'Ylang-Ylang', description: 'Tropical floral' },
        { name: 'Frangipani', description: 'Sweet, exotic' },
      ],
      base: [
        { name: 'Sandalwood', description: 'Creamy, warm' },
        { name: 'Vanilla', description: 'Sweet comfort' },
        { name: 'White Musk', description: 'Soft sensuality' },
      ],
    },
    longevity: 7,
    sillage: 6,
    rating: 4.4,
    reviewCount: 87,
    createdAt: '2024-04-18',
  },
  {
    id: '15',
    name: 'Spice Market',
    brand: 'NOIR ESSENCE',
    description: 'Transport yourself to an exotic spice bazaar. Warm cinnamon and cardamom mingle with saffron and cumin, while oud and amber provide a rich, opulent foundation.',
    shortDescription: 'An exotic spice fragrance for the worldly traveler.',
    images: [oudRoyaleImg, oudRoyaleImg, oudRoyaleImg, oudRoyaleImg],
    sizes: [
      { size: '30ml', price: 115, stock: 12 },
      { size: '50ml', price: 179, stock: 9 },
      { size: '100ml', price: 269, stock: 6 },
    ],
    fragranceFamily: 'oriental',
    gender: 'unisex',
    occasion: ['night', 'special', 'party'],
    fragrancePyramid: {
      top: [
        { name: 'Saffron', description: 'Golden luxury' },
        { name: 'Cardamom', description: 'Aromatic spice' },
        { name: 'Pink Pepper', description: 'Spicy sweetness' },
      ],
      heart: [
        { name: 'Cinnamon', description: 'Warm spice' },
        { name: 'Cumin', description: 'Exotic earthiness' },
        { name: 'Rose', description: 'Romantic touch' },
      ],
      base: [
        { name: 'Oud', description: 'Smoky richness' },
        { name: 'Amber', description: 'Golden warmth' },
        { name: 'Musk', description: 'Sensual depth' },
      ],
    },
    longevity: 9,
    sillage: 8,
    rating: 4.8,
    reviewCount: 52,
    isLimitedEdition: true,
    createdAt: '2024-02-01',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sophia Laurent',
    location: 'Paris, France',
    rating: 5,
    content: 'Midnight Noir is absolutely divine! The longevity is incredible - I receive compliments all day. This has become my signature scent.',
    productName: 'Midnight Noir',
  },
  {
    id: '2',
    name: 'James Richardson',
    location: 'London, UK',
    rating: 5,
    content: 'The quality of Oud Royale rivals fragrances costing three times as much. Elegant packaging and exceptional customer service.',
    productName: 'Oud Royale',
  },
  {
    id: '3',
    name: 'Isabella Martinez',
    location: 'Milan, Italy',
    rating: 5,
    content: 'Velvet Rose is the most beautiful rose fragrance I have ever worn. It feels luxurious without being overwhelming. Simply perfect.',
    productName: 'Velvet Rose',
  },
  {
    id: '4',
    name: 'Alexander Chen',
    location: 'Singapore',
    rating: 5,
    content: 'I ordered Golden Elixir for my wife and she was speechless. The presentation is stunning and the fragrance is absolutely exquisite.',
    productName: 'Golden Elixir',
  },
  {
    id: '5',
    name: 'Emma Thompson',
    location: 'New York, USA',
    rating: 5,
    content: 'NOIR ESSENCE has completely changed my fragrance game. Every scent I have tried has been exceptional. Truly a luxury experience.',
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    customerName: 'Sophia L.',
    rating: 5,
    title: 'Absolutely Stunning',
    content: 'This fragrance is everything I hoped for and more. The opening is bold and captivating, and it settles into the most beautiful smoky amber. I get compliments every time I wear it.',
    date: '2024-05-15',
    verified: true,
    status: 'approved',
  },
  {
    id: '2',
    productId: '1',
    customerName: 'Michael R.',
    rating: 5,
    title: 'My New Signature',
    content: 'After searching for years, I have finally found my signature scent. Midnight Noir is sophisticated, mysterious, and long-lasting. Worth every penny.',
    date: '2024-04-22',
    verified: true,
    status: 'approved',
  },
  {
    id: '3',
    productId: '1',
    customerName: 'Emma W.',
    rating: 4,
    title: 'Beautiful but Strong',
    content: 'This is a gorgeous fragrance with incredible projection. Just be careful with application - a little goes a very long way!',
    date: '2024-03-18',
    verified: true,
    status: 'approved',
  },
  {
    id: '4',
    productId: '3',
    customerName: 'Isabella M.',
    rating: 5,
    title: 'The Perfect Rose',
    content: 'I have tried many rose fragrances, but Velvet Rose is in a class of its own. It is romantic, sophisticated, and beautifully balanced.',
    date: '2024-05-02',
    verified: true,
    status: 'approved',
  },
  {
    id: '5',
    productId: '5',
    customerName: 'James R.',
    rating: 5,
    title: 'Luxury in a Bottle',
    content: 'Oud Royale is what I imagine royalty smells like. The oud is rich and complex, perfectly balanced with rose. A masterpiece.',
    date: '2024-04-10',
    verified: true,
    status: 'approved',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && (
      p.fragranceFamily === product.fragranceFamily ||
      p.gender === product.gender
    ))
    .slice(0, limit);
};

export const getBestSellers = (limit: number = 8): Product[] => {
  return products.filter(p => p.isBestSeller).slice(0, limit);
};

export const getNewArrivals = (limit: number = 8): Product[] => {
  return products.filter(p => p.isNew).slice(0, limit);
};

export const getLimitedEdition = (limit: number = 8): Product[] => {
  return products.filter(p => p.isLimitedEdition).slice(0, limit);
};

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId && r.status === 'approved');
};
