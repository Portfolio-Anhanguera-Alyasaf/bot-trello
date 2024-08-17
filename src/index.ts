import { Client, TextChannel } from "discord.js";
import { config } from "./config";
import { HelperData } from "./helper/helper-data";
import { Logger } from "./logger/logger";
import { getDueSoonTasks } from "./services/trello.service";

const logger: Logger = new Logger();
const helperData: HelperData = new HelperData();
const client: Client = new Client({ intents: ['Guilds', 'GuildMessages', 'DirectMessages'] });
const notifiedTaskId = new Set<string>();

client.once('ready', () => {
    logger.log('╔════════════════════════════════════════════════════════════╗');
    logger.log('╠═                                                          ═╣');
    logger.log('╠═                     powered by Aly                       ═╣');
    logger.log('╠═                                                          ═╣');
    logger.log('╠════════════════════════════════════════════════════════════╣');
    logger.log('╠═                                                          ═╣');
    logger.log('╠═                      Automation                          ═╣');
    logger.log('╠═                                                          ═╣');
    logger.log('╚════════════════════════════════════════════════════════════╝');

    setInterval(checkTrelloTasks, 60000);
    // setInterval(() => {
    //     notifiedTaskId.clear();
    //     logger.info('Foi limpo o id dos card.');
    // }, 80000);
});

client.login(config.DISCORD_TOKEN);

async function checkTrelloTasks(): Promise<void> {
    try {
        const dueSoonTasks = await getDueSoonTasks();
        if (dueSoonTasks.length > 0) {
            const channel = client.channels.cache.get(config.CHANNEL_ID) as TextChannel;
            dueSoonTasks.forEach((card) => {
                if (!notifiedTaskId.has(card.id)) {
                    channel.send(`**A tarefa "${card.name}" está vencendo em breve!**\nData de vencimento: \`${helperData.formatDueDate(card.due)}\``);
                    notifiedTaskId.add(card.id);
                } else {
                    logger.info('O bot não achou nenhuma tarefa em vencimento.');
                }
            });
        }
    } catch (error) {
        logger.error('Ops! Ocorreu ao verificar tarefas no trello.');
    }
}