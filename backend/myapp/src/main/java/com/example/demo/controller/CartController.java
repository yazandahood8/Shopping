package com.example.demo.controller;

import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart_item")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<String> addCartItem(@RequestBody CartItem cartItem) {
        logger.debug("Received cart item: {}", cartItem);

        try {
            if (cartItem.getUser() == null || cartItem.getProduct() == null) {
                return ResponseEntity.badRequest().body("User and Product are required.");
            }
            if (cartItem.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Quantity must be greater than zero.");
            }

            // Validate User
            User user = userRepository.findById(cartItem.getUser().getId()).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body("User with ID " + cartItem.getUser().getId() + " not found.");
            }

            // Validate Product
            Product product = productRepository.findById(cartItem.getProduct().getId()).orElse(null);
            if (product == null) {
                return ResponseEntity.badRequest().body("Product with ID " + cartItem.getProduct().getId() + " not found.");
            }

            // Set the existing User and Product entities
            cartItem.setUser(user);
            cartItem.setProduct(product);

            CartItem savedItem = cartItemRepository.save(cartItem);
            return ResponseEntity.ok("Cart item added successfully with ID: " + savedItem.getId());
        } catch (Exception e) {
            logger.error("Error saving cart item", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving cart item: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems(@RequestParam(required = false) Long userId,
                                                        @RequestParam(required = false) Long productId) {
        logger.debug("Received GET request with userId: {} and productId: {}", userId, productId);

        try {
            List<CartItem> cartItems;
            if (userId != null) {
                cartItems = cartItemRepository.findByUserId(userId);
            } else if (productId != null) {
                cartItems = cartItemRepository.findByProductId(productId);
            } else {
                cartItems = cartItemRepository.findAll();
            }

            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            logger.error("Error retrieving cart items", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCartItem(@PathVariable Long id, @RequestBody CartItem updatedCartItem) {
        logger.debug("Received request to update cart item with ID: {} and data: {}", id, updatedCartItem);

        try {
            Optional<CartItem> existingItemOpt = cartItemRepository.findById(id);
            if (!existingItemOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item with ID " + id + " not found.");
            }

            CartItem existingItem = existingItemOpt.get();
            if (updatedCartItem.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Quantity must be greater than zero.");
            }

            // Update the existing item with new values
            existingItem.setQuantity(updatedCartItem.getQuantity());

            // Update related user and product if necessary
            if (updatedCartItem.getUser() != null) {
                User user = userRepository.findById(updatedCartItem.getUser().getId()).orElse(null);
                if (user != null) {
                    existingItem.setUser(user);
                } else {
                    return ResponseEntity.badRequest().body("User with ID " + updatedCartItem.getUser().getId() + " not found.");
                }
            }
            if (updatedCartItem.getProduct() != null) {
                Product product = productRepository.findById(updatedCartItem.getProduct().getId()).orElse(null);
                if (product != null) {
                    existingItem.setProduct(product);
                } else {
                    return ResponseEntity.badRequest().body("Product with ID " + updatedCartItem.getProduct().getId() + " not found.");
                }
            }

            cartItemRepository.save(existingItem);
            return ResponseEntity.ok("Cart item updated successfully.");
        } catch (Exception e) {
            logger.error("Error updating cart item", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cart item: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long id) {
        logger.debug("Received request to delete cart item with ID: {}", id);

        try {
            if (!cartItemRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item with ID " + id + " not found.");
            }

            cartItemRepository.deleteById(id);
            return ResponseEntity.ok("Cart item deleted successfully.");
        } catch (Exception e) {
            logger.error("Error deleting cart item", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting cart item: " + e.getMessage());
        }
    }
}
