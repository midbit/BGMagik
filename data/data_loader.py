import pandas as pd 
import pymongo
import logging

def CreateConnection():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    database = client["mydatabase"]
    collection = database["customers"]
    return collection

def CreateDictionary(game_frame) -> dict:
    logging.info("Inserting boardgame")
    game_dict = {
        "game_id": game_frame["game_id"],
        "image_url": game_frame["image_url"],
        "thumb_url": game_frame["thumb_url"],
        "min_players": game_frame["min_players"],
        "max_players": game_frame["max_players"],
        "name": game_frame["names"],
        "rating": game_frame["geek_rating"],
        "mechanic": game_frame["mechanic"].split(","),
        "category": game_frame["category"].split(",")
    }
    return game_dict

def main():
    logging.basicConfig(level=logging.INFO)
    logging.basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')
    logging.info("Starting data loader")
    boardgames = pd.read_csv('boardgame.csv')  
    boardgames.dropna(subset=['mechanic', 'category'], inplace=True)
    boardgame_data = [CreateDictionary(game) for index, game in boardgames.iterrows()]
    collection = CreateConnection()
    print(len(boardgame_data))
    game_ids = collection.insert_many(boardgame_data)
    logging.info(game_ids)

if __name__ == "__main__":
    main()
