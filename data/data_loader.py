import pandas as pd 
import pymongo
import logging
import random
import os
import sys
from dotenv import load_dotenv

def CreateConnection():
    load_dotenv()
    MONGO_HOST = os.getenv("MONGO_HOST")
    if MONGO_HOST is None:
        MONGO_HOST = "127.0.0.1"
        
    MONGO_PORT = os.getenv("MONGO_PORT")
    if MONGO_PORT is None:
        MONGO_PORT = "27017"

    MONGO_DATABASE = os.getenv("MONGO_DATABASE")

    if MONGO_DATABASE is None:
        logging.fatal("Need Database Name")
        sys.exit()

    uri = "mongodb://{host}:{port}/".format(host=MONGO_HOST, port=MONGO_PORT)
    print(uri)
    client = pymongo.MongoClient(uri)
    database = client[MONGO_DATABASE]
    collection = database["boardgame"]
    return collection

def CreateDictionary(game_frame) -> dict:
    logging.info("Inserting boardgame {}".format(game_frame["names"]))
    game_dict = {
        "id": game_frame["game_id"],
        "image_url": game_frame["image_url"],
        "thumb_url": game_frame["thumb_url"],
        "min_players": game_frame["min_players"],
        "max_players": game_frame["max_players"],
        "name": game_frame["names"],
        "rating": game_frame["geek_rating"],
        "mechanic": game_frame["mechanic"].split(","),
        "category": game_frame["category"].split(","),
        "quantity": random.randint(1, 20),
        "price": random.randint(500, 3000)
    }
    return game_dict

def main():
    logging.basicConfig(level=logging.INFO)
    logging.basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')
    logging.info("Starting data loader")
    collection = CreateConnection()
    boardgames = pd.read_csv('boardgame.csv')  
    boardgames.dropna(subset=['mechanic', 'category'], inplace=True)
    boardgame_data = [CreateDictionary(game) for index, game in boardgames.iterrows()]
    logging.info("Inserted {} data points".format(len(boardgame_data)))
    game_ids = collection.insert_many(boardgame_data)

if __name__ == "__main__":
    main()
