package com.notemind.backend.notes;

import com.notemind.backend.notes.dto.CreateNoteRequest;
import com.notemind.backend.notes.dto.NoteResponse;
import com.notemind.backend.notes.dto.UpdateNoteRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
    NoteController

    Purpose:
    This controller exposes REST API endpoints for notes.

    Base URL:
    /api/notes
*/
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    /*
     * Constructor injection.
     * 
     * Spring automatically provides NoteService here.
     */
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    /*
     * Create note.
     * 
     * Method:
     * POST /api/notes
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NoteResponse createNote(@Valid @RequestBody CreateNoteRequest request) {
        return noteService.createNote(request);
    }

    /*
     * Get all notes.
     * 
     * Method:
     * GET /api/notes
     */
    @GetMapping
    public List<NoteResponse> getAllNotes() {
        return noteService.getAllNotes();
    }

    /*
     * Get one note by ID.
     * 
     * Method:
     * GET /api/notes/{id}
     */
    @GetMapping("/{id}")
    public NoteResponse getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    /*
     * Update note.
     * 
     * Method:
     * PUT /api/notes/{id}
     */
    @PutMapping("/{id}")
    public NoteResponse updateNote(
            @PathVariable Long id,
            @Valid @RequestBody UpdateNoteRequest request) {
        return noteService.updateNote(id, request);
    }

    /*
     * Delete note.
     * 
     * Method:
     * DELETE /api/notes/{id}
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }

    /*
     * Search notes.
     * 
     * Method:
     * GET /api/notes/search?query=operating
     */
    @GetMapping("/search")
    public List<NoteResponse> searchNotes(@RequestParam String query) {
        return noteService.searchNotes(query);
    }
}