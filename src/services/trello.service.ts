import { config } from "../config";
import { App } from "../environments/environment";
import { Logger } from "../logger/logger";
import { TrelloCard } from "../types/trello.types";

const logger: Logger = new Logger();

export async function getDueSoonTasks(): Promise<Array<TrelloCard>> {
    try {
        const response = await fetch(`${App.api}${config.TRELLO_BOARD_ID}${App.cardsApi}${config.TRELLO_API_KEY}${App.tokenApi}${config.TRELLO_TOKEN}`);
        const cards: any = await response.json();

        const now: Date = new Date();
        const dueSoon = cards.filter((card: any) => {
            if (!card.due) return false;
            const dueDate = new Date(card.due);
            return dueDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000;
        });

        return dueSoon;
    } catch (error) {
        logger.error('Ops! Ocorreu um erro ao obter tarefas do Trello:');
        return [];
    }
}