package com.notemind.backend.notes.dto;

import jakarta.validation.constraints.NotBlank;

/*
    CreateNoteRequest

    Purpose:
    This DTO represents the request body sent by the frontend
    when creating a new note.

    Example JSON:
    {
        "title": "OS Notes",
        "content": "Process scheduling explanation...",
        "subject": "Operating Systems",
        "tags": "exam,important"
    }
*/
public class CreateNoteRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    private String subject;

    private String tags;

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
}