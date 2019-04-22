import { Request, Response } from 'express'

import pool from '../database';

class GamesController {
    constructor() {

    }

    public async list(req: Request, res: Response) {

        try {
            const games = await pool.query('SELECT * FROM games');
            res.json(games);
        }
        catch (error) {
            res.json(error);
        }

    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params
        try {
            const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);

            if (games.length > 0) {
                return res.json(games[0]);
            } else {

                res.status(404).json({ text: 'The game not exists' });
            }

            res.json(games);
        }
        catch (error) {
            res.json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            await pool.query('INSERT INTO games set ?', [req.body])
            console.log("Data Saved")
            res.json({ "text": "Game save" })

        }
        catch (error) {
            console.log(error)
            res.json({ "text": error })

        }



    }

    public async delete(req: Request, res: Response) {

        const { id } = req.params

        try {
            await pool.query('DELETE FROM games WHERE id = ?', [id])
            res.json({ "text": "Deleting" })

        }
        catch (err) {
            res.json(err)

        }


    }

    public async update(req: Request, res: Response) {

        const { id } = req.params;
        try {
            pool.query('UPDATE games set ? where id = ?', [req.body, id])
            res.json({ "text": "Update" })
        }
        catch (err) {
            res.json(err)
        }

    }
}

export const gamesController = new GamesController();