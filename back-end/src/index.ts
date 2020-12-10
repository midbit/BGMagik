import ServerBuilder from "./server/server";
import DatabaseBuilder from "./database/database";
import BoardgameRepository from './repository/boardgame';
import TransactionRepository from './repository/transaction';
import {PORT} from './configuration/configuration';

const RunServer = async () => {
    const [database, closeDatabase]  = await DatabaseBuilder();
    const boardgameRepository = new BoardgameRepository(database);
    const transactionRepository = new TransactionRepository(database);
    const server = ServerBuilder(boardgameRepository, transactionRepository);
    server.listen(PORT, (err, address) => {
        if (err) {
          console.error(err)
          closeDatabase()
          process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}

RunServer();