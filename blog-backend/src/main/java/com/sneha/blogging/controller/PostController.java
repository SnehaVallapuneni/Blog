package com.sneha.blogging.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sneha.blogging.entity.Post;
import com.sneha.blogging.service.PostService;


@CrossOrigin(origins="http://localhost:4200/")
@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService ps;
	
	@PostMapping
	public ResponseEntity<?> createPost(@RequestBody Post post){
		try {
			Post createdPost=ps.savePost(post);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
		}
		catch(Exception e) {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping
	public ResponseEntity<List<Post>> getAllPosts(){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(ps.getAllPosts());
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		}
	
	@PutMapping
	public ResponseEntity<?> updatePost(@RequestBody Post post){
		try {
			Post updatedPost=ps.updatePost(post);
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.CREATED).body(updatedPost);
		}
		catch(Exception e) {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePost(@PathVariable Long id){
		try {
			String status=ps.deletebyId(id);
			return new ResponseEntity<>(status,HttpStatus.OK);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@DeleteMapping
	public ResponseEntity<String> deletePost(){
		try {
			String status=ps.deleteAll();
			return new ResponseEntity<>(status,HttpStatus.OK);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
