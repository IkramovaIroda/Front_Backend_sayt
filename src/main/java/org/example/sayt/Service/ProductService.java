@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<ProductDTO> getAllProducts() {
        return repo.findAll().stream().map(product -> new ProductDTO(
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl()
        )).toList();
    }

    public List<Product> getAllProducts() {
      return productRepository.findAll();
    }

}
