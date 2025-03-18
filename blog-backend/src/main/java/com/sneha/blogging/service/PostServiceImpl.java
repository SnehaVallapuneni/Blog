package com.sneha.blogging.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sneha.blogging.entity.Post;
import com.sneha.blogging.repository.PostRepository;

@Service
public class PostServiceImpl implements PostService{

	@Autowired
	private PostRepository pr;
	
	
	public Post savePost(Post post) {
		post.setLikeCount(0);
		post.setViewcount(0);
		post.setDate(new Date());
		return pr.save(post);
	}
	
	public List<Post> getAllPosts(){
		return pr.findAll();
	}

	
	@Override
	public String deletebyId(Long id) {
		if(pr.existsById(id)) {
			pr.deleteById(id);
			return "Deleted successfully";
		}
		else {
			return "No such post found";
		}
	}

	public Post updatePost(Post post) {
	    Long postId = post.getId();
	    if (postId == null || !pr.existsById(postId)) {
	       
	        throw new IllegalArgumentException("Invalid post ID: " + postId);
	    }

	    Post existingPost = pr.findById(postId).orElseThrow(() -> 
	        new IllegalStateException("Post not found for ID: " + postId));
	    existingPost.setContent(post.getContent());
	    existingPost.setName(post.getName());
	    existingPost.setImg(post.getImg());
	    existingPost.setPostedBy(post.getPostedBy());
	    existingPost.setDate(post.getDate());
	    existingPost.setLikeCount(post.getLikeCount());
	    existingPost.setTags(post.getTags());
	    return pr.save(existingPost);
	}

	@Override
	public String deleteAll() {
		pr.deleteAll();
		return "Deleted successfully";
		
	}

	@Override
	public Post getPostById(Long id) {
		return pr.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
	}
}
