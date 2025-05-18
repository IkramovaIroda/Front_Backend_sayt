package org.example.sayt.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private String description;

  private Double price;
  private String brand;
  private String category;

  @Column(name = "image_url")
  private String imageUrl;


  public Product() {}

  public Product(String name, String description, Double price, String brand, String category, String imageUrl) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.category = category;
    this.imageUrl = imageUrl;
  }

  public Product(Long id, String name, String description, Double price,String brand, String category, String imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.category = category;
    this.imageUrl = imageUrl;
  }


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
