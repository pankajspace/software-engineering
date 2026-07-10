import datetime

# function to get age
def get_age(player):
    now = datetime.datetime.now()
    return now.year - player['birth_year']

# function to get average score
def get_average_score(player):
    return sum(player['scores'])/len(player['scores'])

# dictionary for virat
virat = {
   'first_name': 'virat',
   'last_name': 'kohli',
   'scores': [],
   'birth_year': 1988
}
virat['scores'].append(80)
virat['scores'].append(100)
virat['scores'].append(0)
print("Virat age: ", get_age(virat))
print("Virat avg score: ", get_average_score(virat))

# dictionary for david
david = {
   'first_name': 'david',
   'last_name': 'warner',
   'scores': [],
   'birth_year': 1986
}
david['scores'].append(35)
david['scores'].append(120)
david['scores'].append(12)
print("David age: ", get_age(david))
print("David avg score: ", get_average_score(david))