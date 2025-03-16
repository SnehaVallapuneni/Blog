package com.sneha.blogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sneha.blogging.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long>{

}
