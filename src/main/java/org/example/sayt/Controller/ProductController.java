@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:8080") // если frontend запущен с этой порта
public class ProductController {
  private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

  @GetMapping
  public List<Product> getProducts() {
    return productService.getAllProducts();
  }
}
