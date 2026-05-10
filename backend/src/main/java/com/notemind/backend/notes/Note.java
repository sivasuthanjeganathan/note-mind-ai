package com.notemind.backend.notes;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
    Note Entity

    Purpose:
    This class represents a note stored in the PostgreSQL database.

    In JPA:
    - A Java class becomes a database table.
    - Each object becomes one row in that table.
    - Each field becomes a column in that table.

    Table name:
    notes
*/
@Entity
@Table(name = "notes")
public class Note {

    /*
     * Primary key of the notes table.
     * 
     * @Id:
     * Marks this field as the primary key.
     * 
     * @GeneratedValue:
     * Tells the database to automatically generate the ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Title of the note.
     * 
     * nullable = false:
     * This column cannot be empty in the database.
     */
    @Column(nullable = false)
    private String title;

    /*
     * Main note content.
     * 
     * columnDefinition = "TEXT":
     * Allows storing long text content in PostgreSQL.
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /*
     * Subject is optional.
     * 
     * Example:
     * "Operating Systems", "AI", "Networking", "DIP"
     */
    private String subject;

    /*
     * Tags are stored as simple text for now.
     * 
     * Example:
     * "exam,important,lecture"
     */
    private String tags;

    /*
     * createdAt:
     * Stores when the note was first created.
     */
    private LocalDateTime createdAt;

    /*
     * updatedAt:
     * Stores when the note was last updated.
     */
    private LocalDateTime updatedAt;

    /*
     * This method runs automatically before the note is first saved.
     */
    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    /*
     * This method runs automatically before the note is updated.
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /*
     * Empty constructor required by JPA.
     */
    public Note() {
    }

    /*
     * Constructor used when creating a new note manually.
     */
    public Note(String title, String content, String subject, String tags) {
        this.title = title;
        this.content = content;
        this.subject = subject;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}