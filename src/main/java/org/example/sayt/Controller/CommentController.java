package org.example.sayt.Controller;

import org.example.sayt.Dto.CommentDto;
import org.example.sayt.Entity.Comment;
import org.example.sayt.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CommentDto dto, Principal principal) {
        Comment comment = new Comment();
        comment.setContent(dto.content);
        comment.setProductId(dto.productId);
        comment.setUsername(principal.getName()); // берём логин
        commentRepository.save(comment);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{productId}")
    public List<Comment> getComments(@PathVariable Long productId) {
        return commentRepository.findByProductId(productId);
    }
}

