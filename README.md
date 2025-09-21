 # Email Sender API

 Send emails in text plain or html template. You can also attach files.

## Notes

- The sender email must be a Gmail address. If this doesn’t fit your use case, update the transport function in ./src/utils/mailer.js according to Nodemailer docs.

- The email template can be modified in ./src/utils/template.js

## Tech Stack

[Express](https://expressjs.com/)
[Nodemailer](https://expressjs.com/)

## Instructions

### 1. Generate email App password 

https://myaccount.google.com/apppasswords

### 2. Create .env file and set variables

```
ENVIROMENT=local
PORT=3000
SMTP_EMAIL=example@gmail.com
SMTP_PASS="google app pass"
API_KEY="api_key"
ALLOWED_CORS_DOMAINS="http://domain,http://otherdomain"
```

### 3. Install dependencies

```
npm i
```

### 4. Run app

```
npm run dev
```

## Docs

http://localhost:3000/api-docs

![alt text](image.png)