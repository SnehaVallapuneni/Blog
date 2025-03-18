package com.sneha.blogging.service;

import java.util.List;

import com.sneha.blogging.entity.Post;

public interface PostService {

	Post savePost(Post post);
	List<Post> getAllPosts();
	Post updatePost(Post post);
	Post getPostById(Long id);
	//Post deletePost(Post post);
	String deletebyId(Long id);
	String deleteAll();
}
