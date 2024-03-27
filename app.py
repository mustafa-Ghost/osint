import requests

data =  {"token":"735055104:a7YQFWiL", "request":"test request", "limit": 100, "lang":"ru"}
url = 'https://server.leakosint.com/'
response = requests.post(url, json=data)
print(response.json())