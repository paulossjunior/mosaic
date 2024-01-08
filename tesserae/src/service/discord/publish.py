import requests
import json 
from decouple import config
class Publish():

    def __publish(self, message_content):

        try:
            webhook_url = config('WEBHOOK')

            payload = {
            "content": message_content
            }

            response = requests.post(webhook_url, json=payload)
            response.raise_for_status()
            
            print(response.text)
      
        except requests.exceptions.RequestException as e:
            print(f"Error sending message: {e}")
    

    def __reading_json(self):

        json_data = None
        file_path = config('FOLDER')

        with open(file_path, 'r') as file:
            json_data = json.load(file)

        return json_data

    def do(self):
        """ """
        try:
            data = self.__reading_json()

            message_content = "# "+ data["title"] + "\n" + data["resume"] + "\n" + "## Participantes:"
            
            for participant in data["participantes"]:
                message_content += "\n" + "* {}".format(participant["name"])
            
            for topic in data["topics"]:
                message_content += "\n" + "## {} - ({})".format(topic["title"],topic["duration"])
                message_content += "\n" + "{}".format(topic["content"])

                if "activities" in topic:
                    message_content += "\n" + "### Atividades:"
                    for activity in topic["activities"]:
                        message_content += "\n" + "* **{} (Deadline: {})**: {} ".format(activity["name"],activity["deadline"],activity["description"])
                    
            self.__publish(message_content)
            
        except requests.exceptions.RequestException as e:
            print(f"Error sending message: {e}")