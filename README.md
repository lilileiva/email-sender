 # Email Sender

 Send emails in text plain or html template

## Notes

- The sender email must be a Gmail address. If this doesn’t fit your use case, update the transport function in ./src/utils/mailer.js.

- The email template can be modified in ./src/utils/template.js.

## Instructions

### 1. Generate email App password 

https://myaccount.google.com/apppasswords

### 2. Create .env file and set variables

```
PORT=3000
SMTP_EMAIL=example@gmail.com
SMTP_PASS="google app pass"
API_KEY="api_key"
ALLOWED_DOMAINS="http://localhost:3000,http://otherdomain"
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