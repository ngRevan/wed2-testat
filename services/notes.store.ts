import DataStore from 'nedb-promises';

import { NoteMessages, Sort, sortDirectionToNumber } from '../models';
import { Note } from '../models/note';

class NotesStore {
  private readonly dataStore = new DataStore({ filename: './data/note.db', autoload: true, timestampData: true });

  async find(includeFinished = true, sort?: Sort<Note>): Promise<Note[]> {
    const sortField = sort?.field || 'dueAt';
    const query = includeFinished ? {} : { isFinished: false };
    return await this.dataStore.find<Note>(query).sort({ [sortField]: sortDirectionToNumber(sort?.direction) });
  }

  async findById(id: string): Promise<Note> {
    return await this.dataStore.findOne({ _id: id });
  }

  async insert(note: NoteMessages.CreateNoteBody): Promise<Note> {
    return await this.dataStore.insert({ ...note, isFinished: false });
  }

  async update(id: string, note: NoteMessages.UpdateNoteBody): Promise<number> {
    return await this.dataStore.update({ _id: id }, { $set: { ...note, isFinished: note.isFinished === 'true' } });
  }
}

export const notesStore = new NotesStore();
