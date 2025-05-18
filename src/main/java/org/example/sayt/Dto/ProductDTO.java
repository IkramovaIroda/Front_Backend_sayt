package com.example.internetshop.dto;

public class ProductDTO {

  private String name;
  private String description;
  private Double price;
  private String imageUrl;


  public ProductDTO() {}

  public ProductDTO(String name, String description, Double price, String imageUrl) {
    this.name = name;
    this.description = description;
    this.price = price;
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

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
