package com.notemind.backend.notes.dto;

import com.notemind.backend.notes.Note;
import java.time.LocalDateTime;

/*
    NoteResponse

    Purpose:
    This DTO controls what data we send back to the frontend.

    Instead of exposing the full database entity directly,
    we return a clean response object.
*/
public class NoteResponse {

    private Long id;
    private String title;
    private String content;
    private String subject;
    private String tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public NoteResponse(Note note) {
        this.id = note.getId();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.subject = note.getSubject();
        this.tags = note.getTags();
        this.createdAt = note.getCreatedAt();
        this.updatedAt = note.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getSubject() {
        return subject;
    }

    public String getTags() {
        return tags;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}