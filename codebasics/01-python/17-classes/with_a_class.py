import datetime

# class definition
class CricketPlayer:
    team_size = 11 # class variable (shared by all instances)
    
    # constructor
    def __init__(self, fname, lname, birth_year, team):
        self.first_name = fname # instance variable
        self.last_name = lname # instance variable
        self.birth_year = birth_year # instance variable
        self.team = team # instance variable
        self.scores = [] # instance variable

    # instance method
    def add_score(self, score):
        self.scores.append(score)

    # instance method
    def get_average_score(self):
        return sum(self.scores)/len(self.scores)

    # instance method
    def get_age(self):
        now = datetime.datetime.now()
        return now.year - self.birth_year

    # special method
    def __str__(self):
        return f"{self.first_name} {self.last_name}, the cricket player from {self.team}"

    # operator overloading
    def __lt__(self, other):
        self_avg_score = self.get_average_score()
        other_avg_score = other.get_average_score()
        return self_avg_score < other_avg_score

    # operator overloading
    def __eq__(self, other):
        self_age = self.get_age()
        other_age = other.get_age()
        return self_age == other_age

# object creation, instance creation, creating a CricketPlayer object
virat = CricketPlayer('virat', 'kohli', 1988, 'India')
virat.add_score(37)
virat.add_score(43)
virat.add_score(100)
print("Virat avg score: ",virat.get_average_score())

# object creation, instance creation, creating a CricketPlayer object
david = CricketPlayer('david','warner', 1988, 'australia')
david.add_score(37)
david.add_score(43)
david.add_score(85)
print("David avg score: ", david.get_average_score())

# operator overloading
print("Is virat worse than david: ", virat < david)
print("Is virat same age as david: ", virat == david)
