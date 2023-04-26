echo logging in

curl -v -d "@login.json" POST -H "Content-Type:applications/json" https://dev.stedi.me/login

curl https://dev.stedi.me/validate/5e14ff4b-d9ae-47f0-bba3-50e1a08f8656