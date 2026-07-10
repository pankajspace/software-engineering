import datetime

class Player:
    # Base class representing a general player
    def __init__(self, fname, lname, birth_year):
        self.first_name = fname
        self.last_name = lname
        self.birth_year = birth_year

    def get_age(self):
        # Calculate and return the player's age based on the current year
        now = datetime.datetime.now()
        return now.year - self.birth_year

class TennisPlayer(Player):
    # Subclass representing a tennis player, inheriting from Player
    def __init__(self, fname, lname, birth_year):
        super().__init__(fname, lname, birth_year)
        self.aces = []  # List to store the number of aces per match

    def get_average_aces_per_match(self):
        # Calculate and return the average number of aces
        return sum(self.aces) / len(self.aces)

class CricketPlayer(Player):
    # Subclass representing a cricket player, inheriting from Player
    def __init__(self, fname, lname, team, birth_year):
        super().__init__(fname, lname, birth_year)
        self.team = team
        self.scores = []  # List to store scores from different matches

    def add_score(self, score):
        # Add a new score to the scores list
        self.scores.append(score)

    def get_average_score(self):
        # Calculate and return the average score
        return sum(self.scores) / len(self.scores)


# Example usage for CricketPlayer
virat = CricketPlayer('virat', 'kohli', 'india', 1988)
virat.add_score(37)
virat.add_score(23)
virat.add_score(85)

print("Age of viral kohli:", virat.get_age())
print("Average score of viral kohli:", virat.get_average_score())

# Example usage for TennisPlayer
roger = TennisPlayer('roger', 'federer', 1981)
print("Age of roger federer:", roger.get_age())
