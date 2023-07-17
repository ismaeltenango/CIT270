echo "logging in"

curl --insecure -d "@login.json" -X POST -H "Content-Type:application/json" https://ismael-tenango.cit270.com/login

@REM curl https://dev.stedi.me/validate/5e14ff4b-d9ae-47f0-bba3-50e1a08f8656