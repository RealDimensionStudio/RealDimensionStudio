import urllib.request
import urllib.parse
import json
import re

movies = {
    "Aladdin 2019": "Aladdin",
    "Men in Black International": "Men in Black: International",
    "Shazam 2019": "Shazam!",
    "Dumbo 2019": "Dumbo",
    "Manikarnika": "Manikarnika",
    "Mowgli Legend of the Jungle": "Mowgli: Legend of the Jungle",
    "Fantastic Beasts The Crimes of Grindelwald": "Fantastic Beasts: The Crimes of Grindelwald",
    "Pathaan": "Pathaan",
    "Bhool Bhulaiyaa 2": "Bhool Bhulaiyaa 2",
    "Dhamaka": "Dhamaka"
}

api_key = "15d2ea6d0dc1d476efbca3eba2b9bbfb"
posters = {}

for search_query, title in movies.items():
    query = urllib.parse.quote(search_query)
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        if data['results'] and data['results'][0].get('poster_path'):
            posters[title] = f"https://image.tmdb.org/t/p/w500{data['results'][0]['poster_path']}"
    except Exception as e:
        pass

with open("src/data/studioData.js", "r", encoding="utf-8") as f:
    content = f.read()

for title, url in posters.items():
    pattern = rf'(title:\s*"{re.escape(title)}",.*?poster:\s*")[^"]+(")'
    content = re.sub(pattern, rf'\g<1>{url}\2', content, flags=re.DOTALL)

with open("src/data/studioData.js", "w", encoding="utf-8") as f:
    f.write(content)

print(posters)
