import * as dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_BOARD_ID, CHANNEL_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !TRELLO_API_KEY || !TRELLO_TOKEN || !TRELLO_BOARD_ID || !CHANNEL_ID) {
    throw new Error('Não foi possível achar as variáveis de ambiente.');
}

export const config: { DISCORD_TOKEN: any, DISCORD_CLIENT_ID: any, TRELLO_API_KEY: any, TRELLO_TOKEN: any, TRELLO_BOARD_ID: any, CHANNEL_ID: any } = {
    DISCORD_TOKEN: DISCORD_TOKEN,
    DISCORD_CLIENT_ID: DISCORD_CLIENT_ID,
    TRELLO_API_KEY: TRELLO_API_KEY,
    TRELLO_TOKEN: TRELLO_TOKEN,
    TRELLO_BOARD_ID: TRELLO_BOARD_ID,
    CHANNEL_ID: CHANNEL_ID
};