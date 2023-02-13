import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

type JsonResponse = { msg: string };
const jsonMessage = (msg: string): JsonResponse => ({ msg });

type Note = {
    id: string,
    text: string,
    timestamp: number
}

type Notes = Note[];

let notes = [
    {
        id: uuidv4(),
        text: "Text 1 here",
        timestamp: 1676229451520
    },
    {
        id: uuidv4(),
        text: "Text 2 here",
        timestamp: 1676229451540
    },
]

const getAll = (req: Request, res: Response) => res.status(200).json(notes);


const create = (req: Request, res: Response) => {
    const { text } = req.body;
    const note: Note = { id: uuidv4(), text,  timestamp: Date.now() };
    notes = [...notes, note];

    res.status(201).json(jsonMessage('Note created.'));
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;

    notes = notes.filter(note => note.id !== id);
    res.status(200).json(jsonMessage(`Note with id: ${id} deleted.`));
}

const updateByID = (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
}

export {
    getAll,
    create,
    deleteById
}