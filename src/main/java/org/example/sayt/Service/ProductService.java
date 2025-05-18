package org.example.sayt.Service;

import org.example.sayt.Dto.ProductDTO;
import org.example.sayt.Entity.Product;
import org.example.sayt.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private  ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<ProductDTO> getAllProducts() {
        return repo.findAll().stream().map(product -> new ProductDTO(
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getBrand(),
                product.getCategory(),
                product.getImageUrl()
        )).toList();
    }


}
