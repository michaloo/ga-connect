ga-connect
---

Connect middleware inserting Google Analytics snippet to served html files.

#### Instalation

`npm install ga-connect`

#### Usage:

```
var gaConnect = require('ga-connect');

var app = connect();

app.use(gaConnect('UA-test-123456'));

```
