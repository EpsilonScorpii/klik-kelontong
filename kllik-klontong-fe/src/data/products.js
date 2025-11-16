import defaultImage from '../assets/image/image-default.jpeg';

// 1. UBAH DUMMY_PRODUCTS
// Kita tambahkan data 'rating' dan 'sold'
export const DUMMY_PRODUCTS = [
  { id: 1, name: 'Minyak Goreng Bimoli 2L', price: 34000, category: 'Sembako', image: defaultImage, isRecommended: true, rating: 4.9, sold: 500, description: 'Bimoli Minyak Goreng 2000Ml merupakan minyak goreng yang dibuat dari kelapa sawit pilihan...', sizes: ['2L', '1L', '500ml']},
  { id: 2, name: 'Kecap Bango Botol 520ml', price: 21000, category: 'Sembako', image: defaultImage, isRecommended: false, rating: 4.8, sold: 320, description: 'Bimoli Minyak Goreng 2000Ml merupakan minyak goreng yang dibuat dari kelapa sawit pilihan...', sizes: ['2L', '1L', '500ml']},
  { id: 3, name: 'Chitato Sapi Panggang 68g', price: 11000, category: 'Makanan', image: defaultImage, isRecommended: true, rating: 4.9, sold: '1rb+', description: 'Bimoli Minyak Goreng 2000Ml merupakan minyak goreng yang dibuat dari kelapa sawit pilihan...', sizes: ['2L', '1L', '500ml']},
  { id: 4, name: 'Coca-Cola 1.5L', price: 15000, category: 'Minuman', image: defaultImage, isRecommended: false, rating: 4.7, sold: 700, description: 'Bimoli Minyak Goreng 2000Ml merupakan minyak goreng yang dibuat dari kelapa sawit pilihan...', sizes: ['2L', '1L', '500ml']},

];