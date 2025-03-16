package com.sneha.blogging.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import lombok.Data;

@Entity
@Data
public class Post {

	public Post(Long id, String name, String content, String postedBy, String img, Date date, int likeCount,
			int viewcount, List<String> tags) {
		super();
		this.id = id;
		this.name = name;
		this.content = content;
		this.postedBy = postedBy;
		this.img = img;
		this.date = date;
		this.likeCount = likeCount;
		this.viewcount = viewcount;
		this.tags = tags;
	}
	public Post() {
		
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@Column(length=5000)
	private String content;
	
	private String postedBy;
	
	private String img;
	
	private Date date;
	
	private int likeCount;
	
	private int viewcount;
	
	@ElementCollection
    @CollectionTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "tag")
    private List<String> tags;
}

