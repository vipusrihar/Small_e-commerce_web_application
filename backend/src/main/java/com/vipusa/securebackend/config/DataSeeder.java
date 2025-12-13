package com.vipusa.securebackend.config;

import com.vipusa.securebackend.model.entity.Book;
import com.vipusa.securebackend.model.enums.BookCategory;
import com.vipusa.securebackend.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(BookRepository bookRepository) {
        return args -> {
            if (bookRepository.count() == 0) {

                bookRepository.save(new Book(null, "Clean Code", "Robert C. Martin", "A handbook of agile software craftsmanship.", "9780132350884", BookCategory.CATEGORY_TECHNOLOGY, "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", 45.99, 10));

                bookRepository.save(new Book(null, "Effective Java", "Joshua Bloch", "Best practices for the Java platform.", "9780134685991", BookCategory.CATEGORY_TECHNOLOGY, "https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg", 55.50, 8));

                bookRepository.save(new Book(null, "Design Patterns", "Erich Gamma", "Elements of reusable object‑oriented software.", "9780201633610", BookCategory.CATEGORY_TECHNOLOGY, "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg", 60.00, 6));

                bookRepository.save(new Book(null, "Introduction to Algorithms", "Thomas H. Cormen", "Comprehensive algorithms book.", "9780262033848", BookCategory.CATEGORY_TECHNOLOGY, "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg", 80.75, 12));

                bookRepository.save(new Book(null, "The Pragmatic Programmer", "Andrew Hunt", "Your journey to mastery.", "9780201616224", BookCategory.CATEGORY_TECHNOLOGY, "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg", 42.00, 15));

                bookRepository.save(new Book(null, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "First book in the Harry Potter series.", "9780439708180", BookCategory.CATEGORY_FANTASY, "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg", 25.99, 30));

                bookRepository.save(new Book(null, "Harry Potter and the Chamber of Secrets", "J.K. Rowling", "Second book in the Harry Potter series.", "9780439064873", BookCategory.CATEGORY_FANTASY, "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg", 26.50, 28));

                bookRepository.save(new Book(null, "The Hobbit", "J.R.R. Tolkien", "Fantasy adventure before The Lord of the Rings.", "9780345339683", BookCategory.CATEGORY_FANTASY, "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg", 20.00, 22));

                bookRepository.save(new Book(null, "The Lord of the Rings", "J.R.R. Tolkien", "Epic fantasy trilogy.", "9780618640157", BookCategory.CATEGORY_FANTASY, "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg", 65.00, 18));

                bookRepository.save(new Book(null, "To Kill a Mockingbird", "Harper Lee", "Classic novel about race and justice.", "9780061120084", BookCategory.CATEGORY_FICTION, "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", 18.50, 25));

                bookRepository.save(new Book(null, "A Brief History of Time", "Stephen Hawking", "Cosmology explained for general readers.", "9780553380163", BookCategory.CATEGORY_SCIENCE, "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg", 22.99, 12));

                bookRepository.save(new Book(null, "Cosmos", "Carl Sagan", "Science and the universe explained.", "9780345331359", BookCategory.CATEGORY_SCIENCE, "https://covers.openlibrary.org/b/isbn/9780345331359-L.jpg", 28.75, 14));

                bookRepository.save(new Book(null, "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "The story of human evolution.", "9780062316097", BookCategory.CATEGORY_HISTORY, "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", 30.00, 20));

                bookRepository.save(new Book(null, "Educated", "Tara Westover", "A memoir about family and education.", "9780399590504", BookCategory.CATEGORY_BIOGRAPHY, "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg", 19.99, 10));

                bookRepository.save(new Book(null, "Steve Jobs", "Walter Isaacson", "Biography of Steve Jobs.", "9781451648539", BookCategory.CATEGORY_BIOGRAPHY, "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg", 24.99, 16));

            }
        };
    }
}
