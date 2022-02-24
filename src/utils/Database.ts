import moment from 'moment-timezone';

import LocalDatabase from '../libs/LocalDatabase';

import { Game } from '../types/Game';
import { Guess } from '../types/Guess';

moment.tz.setDefault('America/Sao_Paulo');

const tableNames = ['setting', 'game', 'not_completed_game'];

export default class Database {
    public static createAllTables() {
        tableNames.forEach(tableName => LocalDatabase.createTable(tableName));
    }
    
    public static getSettings() {
        return LocalDatabase.findOneInTable('setting', 1);
    }
    
    public static addGame(game: Game) {
        return LocalDatabase.insertInTable('game', {
            date: moment().format('YYYY-MM-DD'),
            ...game
        });
    }
    
    public static getGames(): Game[] {
        return LocalDatabase.findAllInTable('game') as Game[];
    }
    
    public static getTodayGame() {
        const today = moment().format('YYYY-MM-DD');

        const gameList = LocalDatabase.findAllInTable('game')!;

        const found = gameList.find(game => game.date === today);
    
        return found ? {
            ...found,
            date: undefined,
        } : null
    }

    public static updateNotCompletedGameGuesses(guesses: Guess[]) {
        const notCompletedGame = Database.getNotCompletedGameOfToday();

        LocalDatabase.updateInTable('not_completed_game', notCompletedGame.id, {
            ...notCompletedGame,
            guesses: guesses
        });
    }

    public static getNotCompletedGameOfToday() {
        const today = moment().format('YYYY-MM-DD');

        const notCompletedGameList = LocalDatabase.findAllInTable('not_completed_game')!;

        const found = notCompletedGameList.find(game => game.date === today);

        if(!found) {
            LocalDatabase.clearTable('not_completed_game');

            return LocalDatabase.insertInTable('not_completed_game', {
                id: 1,
                date: moment().format('YYYY-MM-DD'),
                guesses: []
            });
        }

        return found;
    }
    
    public static runSetup() {
        const tablesMissing = tableNames.some(tableName => !LocalDatabase.tableExists(tableName));
    
        if(tablesMissing) {
            LocalDatabase.dropAllTables();
    
            this.createAllTables();
    
            LocalDatabase.insertInTable('setting', [
                {
                    id: 1,
                    isColorBlindModeActive: false,
                    showHelpScreen: true
                }
            ]);
        } else {
            LocalDatabase.updateInTable('setting', 1, {
                showHelpScreen: false
            });
        }
    }
}
