# autoportal_frontend
"dev": "next dev -p 3006",
"build": "next build && next export",
"start": "next start -p 3006",
"docker:dev": "bash ./scripts/dev.sh",
"generate": "plop"

npm -i
pm2 start npm --name "drivio_lms_frontend" -- start
