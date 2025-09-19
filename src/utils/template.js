const configTemplate = (title, content, footer) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #a0a0a0ff;
            color: #3c3c3cff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #a0a0a0ff;
            color: #3c3c3cff;
            padding: 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h3>${title}</h3>
            </div>
            <div class="email-body">
              <p>${content}</p>
            </div>
            <div class="email-footer">
              <p>${footer}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export default configTemplate;