package org.example.sayt.Dto;

public class ProductDTO {

  private String name;
  private String description;
  private Double price;
  private String brand;
  private String category;
  private String imageUrl;


  public ProductDTO() {}

  public ProductDTO(String name, String description, Double price, String brand, String category, String imageUrl) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.category = category;
    this.imageUrl = imageUrl;
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
