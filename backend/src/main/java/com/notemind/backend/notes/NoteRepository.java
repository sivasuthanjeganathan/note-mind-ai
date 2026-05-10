package com.notemind.backend.notes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
    NoteRepository

    Purpose:
    This interface handles database operations for notes.

    JpaRepository gives us built-in methods like:
    - save()
    - findAll()
    - findById()
    - delete()
    - existsById()

    We do not need to manually write SQL for basic CRUD.
*/
public interface NoteRepository extends JpaRepository<Note, Long> {

    /*
     * Custom search method.
     * 
     * Spring Data JPA understands this method name and automatically
     * creates the SQL query.
     * 
     * It searches notes where title OR content contains the given query.
     */
    List<Note> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
            String titleQuery,
            String contentQuery);
}