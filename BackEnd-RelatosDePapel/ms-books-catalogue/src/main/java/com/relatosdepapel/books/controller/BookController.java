package com.relatosdepapel.books.controller;

import com.relatosdepapel.books.model.Book;
import com.relatosdepapel.books.repository.BookRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
        return ResponseEntity.ok(bookRepository.save(book));
    }

    @PostMapping("/sample-data")
    public ResponseEntity<String> insertSampleData() {
        try {
            // Crear libros usando setters
            Book book1 = new Book();
            book1.setTitle("El Principito");
            book1.setAuthor("Antoine de Saint-Exupéry");
            book1.setPublicationDate(LocalDate.of(1943, 4, 6));
            book1.setCategory("Ficción");
            book1.setIsbn("978-0156013987");
            book1.setRating(5);
            book1.setVisibility(true);
            book1.setPrice(19.99);
            book1.setCoverImage("https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book1.setDescription("Una obra poética y filosófica que ha cautivado a lectores de todas las edades.");

            Book book2 = new Book();
            book2.setTitle("Cien años de soledad");
            book2.setAuthor("Gabriel García Márquez");
            book2.setPublicationDate(LocalDate.of(1967, 6, 5));
            book2.setCategory("Realismo Mágico");
            book2.setIsbn("978-8497592208");
            book2.setRating(5);
            book2.setVisibility(true);
            book2.setPrice(24.99);
            book2.setCoverImage("https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book2.setDescription("La obra maestra del realismo mágico que narra la historia de la familia Buendía.");

            Book book3 = new Book();
            book3.setTitle("Don Quijote de la Mancha");
            book3.setAuthor("Miguel de Cervantes");
            book3.setPublicationDate(LocalDate.of(1605, 1, 16));
            book3.setCategory("Clásico");
            book3.setIsbn("978-8420412146");
            book3.setRating(5);
            book3.setVisibility(true);
            book3.setPrice(29.99);
            book3.setCoverImage("https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book3.setDescription("La obra cumbre de la literatura española y una de las más importantes de la literatura universal.");

            Book book4 = new Book();
            book4.setTitle("1984");
            book4.setAuthor("George Orwell");
            book4.setPublicationDate(LocalDate.of(1949, 6, 8));
            book4.setCategory("Distopía");
            book4.setIsbn("978-0451524935");
            book4.setRating(4);
            book4.setVisibility(true);
            book4.setPrice(22.99);
            book4.setCoverImage("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book4.setDescription("Una distopía que explora los peligros del totalitarismo y la vigilancia masiva.");

            Book book5 = new Book();
            book5.setTitle("El Señor de los Anillos");
            book5.setAuthor("J.R.R. Tolkien");
            book5.setPublicationDate(LocalDate.of(1954, 7, 29));
            book5.setCategory("Fantasía");
            book5.setIsbn("978-0547928210");
            book5.setRating(5);
            book5.setVisibility(true);
            book5.setPrice(34.99);
            book5.setCoverImage("https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book5.setDescription("La épica historia de la Tierra Media y la lucha contra el poder del Anillo Único.");

            Book book6 = new Book();
            book6.setTitle("Orgullo y Prejuicio");
            book6.setAuthor("Jane Austen");
            book6.setPublicationDate(LocalDate.of(1813, 1, 28));
            book6.setCategory("Romance");
            book6.setIsbn("978-0141439518");
            book6.setRating(4);
            book6.setVisibility(true);
            book6.setPrice(18.99);
            book6.setCoverImage("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book6.setDescription("Una historia de amor y superación de prejuicios en la Inglaterra del siglo XIX.");

            Book book7 = new Book();
            book7.setTitle("Los Miserables");
            book7.setAuthor("Victor Hugo");
            book7.setPublicationDate(LocalDate.of(1862, 1, 1));
            book7.setCategory("Clásico");
            book7.setIsbn("978-0140444308");
            book7.setRating(5);
            book7.setVisibility(true);
            book7.setPrice(27.99);
            book7.setCoverImage("https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book7.setDescription("Una obra maestra que retrata la lucha por la redención y la justicia social.");

            Book book8 = new Book();
            book8.setTitle("El Alquimista");
            book8.setAuthor("Paulo Coelho");
            book8.setPublicationDate(LocalDate.of(1988, 1, 1));
            book8.setCategory("Ficción");
            book8.setIsbn("978-0062315007");
            book8.setRating(4);
            book8.setVisibility(true);
            book8.setPrice(16.99);
            book8.setCoverImage("https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
            book8.setDescription("Una novela filosófica que sigue el viaje de un joven pastor en busca de su tesoro personal.");

            List<Book> sampleBooks = Arrays.asList(book1, book2, book3, book4, book5, book6, book7, book8);
            
            bookRepository.saveAll(sampleBooks);
            return ResponseEntity.ok("Datos de ejemplo insertados correctamente. Total de libros: " + sampleBooks.size());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al insertar datos: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Page<Book>> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String isbn,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) Boolean visibility,
            @RequestParam(required = false) String publicationDate,
            @PageableDefault(size = 10) Pageable pageable) {
        Specification<Book> spec = Specification.where(null);
        if (title != null) spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
        if (author != null) spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("author")), "%" + author.toLowerCase() + "%"));
        if (category != null) spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("category")), "%" + category.toLowerCase() + "%"));
        if (isbn != null) spec = spec.and((root, query, cb) -> cb.equal(root.get("isbn"), isbn));
        if (rating != null) spec = spec.and((root, query, cb) -> cb.equal(root.get("rating"), rating));
        if (visibility != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("visibility"), visibility));
        } else {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("visibility"), true));
        }
        if (publicationDate != null) spec = spec.and((root, query, cb) -> cb.equal(root.get("publicationDate"), LocalDate.parse(publicationDate)));
        return ResponseEntity.ok(bookRepository.findAll(spec, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        if (!bookRepository.existsById(id)) return ResponseEntity.notFound().build();
        book.setId(id);
        return ResponseEntity.ok(bookRepository.save(book));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Book> partialUpdateBook(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "title" -> existingBook.setTitle((String) value);
                            case "author" -> existingBook.setAuthor((String) value);
                            case "publicationDate" -> existingBook.setPublicationDate(LocalDate.parse((String) value));
                            case "category" -> existingBook.setCategory((String) value);
                            case "isbn" -> existingBook.setIsbn((String) value);
                            case "rating" -> existingBook.setRating((Integer) value);
                            case "visibility" -> existingBook.setVisibility((Boolean) value);
                            case "price" -> existingBook.setPrice((Double) value);
                            case "coverImage" -> existingBook.setCoverImage((String) value);
                            case "description" -> existingBook.setDescription((String) value);
                        }
                    });
                    return ResponseEntity.ok(bookRepository.save(existingBook));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        if (!bookRepository.existsById(id)) return ResponseEntity.notFound().build();
        bookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update-images")
    public ResponseEntity<String> updateExistingBooksWithImages() {
        try {
            // Actualizar libros existentes con imágenes
            List<Book> existingBooks = bookRepository.findAll();
            
            if (existingBooks.isEmpty()) {
                return ResponseEntity.ok("No hay libros para actualizar");
            }

            // Mapear imágenes por título
            Map<String, String> imageMap = Map.of(
                "El Quijote", "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "Cien años de soledad", "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "Don Juan Tenorio", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                "La casa de los espíritus", "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            );

            Map<String, String> descriptionMap = Map.of(
                "El Quijote", "La obra cumbre de la literatura española y una de las más importantes de la literatura universal.",
                "Cien años de soledad", "La obra maestra del realismo mágico que narra la historia de la familia Buendía.",
                "Don Juan Tenorio", "Una obra teatral romántica que narra las aventuras del legendario Don Juan.",
                "La casa de los espíritus", "Una novela que combina realismo mágico con la historia de Chile."
            );

            for (Book book : existingBooks) {
                String imageUrl = imageMap.get(book.getTitle());
                String description = descriptionMap.get(book.getTitle());
                
                if (imageUrl != null) {
                    book.setCoverImage(imageUrl);
                }
                if (description != null) {
                    book.setDescription(description);
                }
            }

            bookRepository.saveAll(existingBooks);
            return ResponseEntity.ok("Libros actualizados con imágenes. Total actualizados: " + existingBooks.size());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar libros: " + e.getMessage());
        }
    }
} 