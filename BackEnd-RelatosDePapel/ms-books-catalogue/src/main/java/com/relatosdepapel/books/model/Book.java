package com.relatosdepapel.books.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    @NotNull
    private LocalDate publicationDate;

    @NotBlank
    private String category;

    @NotBlank
    @Column(unique = true)
    private String isbn;

    @Min(1)
    @Max(5)
    private Integer rating;

    private boolean visibility;

    @NotNull
    @Column(nullable = false)
    private Double price;

    @Column(length = 1000)
    private String coverImage;

    @Column(length = 2000)
    private String description;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public LocalDate getPublicationDate() { return publicationDate; }
    public void setPublicationDate(LocalDate publicationDate) { this.publicationDate = publicationDate; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public boolean isVisibility() { return visibility; }
    public void setVisibility(boolean visibility) { this.visibility = visibility; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
} 