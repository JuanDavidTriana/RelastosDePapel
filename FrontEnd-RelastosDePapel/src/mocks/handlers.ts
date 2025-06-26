import { http, HttpResponse } from 'msw';

const mockBooks = [
  {
    id: 1,
    title: "El Señor de los Anillos",
    author: "J.R.R. Tolkien",
    publicationDate: "1954-07-29",
    category: "Fantasía",
    isbn: "9780547928210",
    rating: 5,
    visibility: true,
    price: 29.99,
    stock: 10,
    description: "Una épica historia de fantasía",
    coverImage: "/images/libros/libro1.jpg"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    publicationDate: "1949-06-08",
    category: "Ciencia Ficción",
    isbn: "9780451524935",
    rating: 4,
    visibility: true,
    price: 19.99,
    stock: 15,
    description: "Una distopía clásica",
    coverImage: "/images/libros/libro2.jpg"
  },
  {
    id: 3,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    publicationDate: "1967-06-05",
    category: "Realismo Mágico",
    isbn: "9788497592208",
    rating: 5,
    visibility: true,
    price: 24.99,
    stock: 8,
    description: "Una obra maestra del realismo mágico",
    coverImage: "/images/libros/libro3.jpg"
  }
];

export const handlers = [
  // GET /api/books - Obtener todos los libros
  http.get('http://localhost:8080/api/books', () => {
    return HttpResponse.json({
      content: mockBooks,
      totalElements: mockBooks.length,
      totalPages: 1,
      size: 10,
      number: 0
    });
  }),

  // GET /api/books/:id - Obtener libro por ID
  http.get('http://localhost:8080/api/books/:id', ({ params }) => {
    const book = mockBooks.find(b => b.id === Number(params.id));
    if (book) {
      return HttpResponse.json(book);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // POST /api/purchases - Crear compra
  http.post('http://localhost:8080/api/purchases', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: Math.floor(Math.random() * 1000),
      bookId: body.bookId,
      quantity: body.quantity,
      totalAmount: body.total || 29.99,
      customerEmail: body.customerEmail || 'test@example.com',
      purchaseDate: new Date().toISOString(),
      status: 'CONFIRMED'
    });
  }),

  // POST /api/purchases/multiple - Crear compra múltiple
  http.post('http://localhost:8080/api/purchases/multiple', async ({ request }) => {
    const body = await request.json();
    const purchases = body.items.map((item: any, index: number) => ({
      id: Math.floor(Math.random() * 1000) + index,
      bookId: item.bookId,
      quantity: item.quantity,
      totalAmount: item.quantity * 29.99,
      customerEmail: body.customerEmail,
      purchaseDate: new Date().toISOString(),
      status: 'CONFIRMED'
    }));

    return HttpResponse.json({
      purchases,
      totalAmount: purchases.reduce((sum: number, p: any) => sum + p.totalAmount, 0),
      customerEmail: body.customerEmail,
      status: 'CONFIRMED'
    });
  })
]; 