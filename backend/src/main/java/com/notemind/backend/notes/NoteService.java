package com.notemind.backend.notes;

import com.notemind.backend.notes.dto.CreateNoteRequest;
import com.notemind.backend.notes.dto.NoteResponse;
import com.notemind.backend.notes.dto.UpdateNoteRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/*
    NoteService

    Purpose:
    This class contains the business logic for notes.

    Controller:
    Receives HTTP request.

    Service:
    Handles application logic.

    Repository:
    Talks to the database.
*/
@Service
public class NoteService {

    private final NoteRepository noteRepository;

    /*
     * Constructor injection.
     * 
     * Spring automatically provides NoteRepository here.
     */
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    /*
     * Create a new note and save it in the database.
     */
    public NoteResponse createNote(CreateNoteRequest request) {
        Note note = new Note(
                request.getTitle(),
                request.getContent(),
                request.getSubject(),
                request.getTags());

        Note savedNote = noteRepository.save(note);

        return new NoteResponse(savedNote);
    }

    /*
     * Get all notes from the database.
     */
    public List<NoteResponse> getAllNotes() {
        return noteRepository.findAll()
                .stream()
                .map(NoteResponse::new)
                .toList();
    }

    /*
     * Get a single note by ID.
     * 
     * If note does not exist, throw a RuntimeException for now.
     * Later we will create proper custom exceptions.
     */
    public NoteResponse getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));

        return new NoteResponse(note);
    }

    /*
     * Update an existing note.
     */
    public NoteResponse updateNote(Long id, UpdateNoteRequest request) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setSubject(request.getSubject());
        note.setTags(request.getTags());

        Note updatedNote = noteRepository.save(note);

        return new NoteResponse(updatedNote);
    }

    /*
     * Delete a note by ID.
     */
    public void deleteNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new RuntimeException("Note not found with id: " + id);
        }

        noteRepository.deleteById(id);
    }

    /*
     * Search notes by title or content.
     */
    public List<NoteResponse> searchNotes(String query) {
        return noteRepository
                .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(query, query)
                .stream()
                .map(NoteResponse::new)
                .toList();
    }
}