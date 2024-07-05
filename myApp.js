let bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();

absolutePath = __dirname + "/views/index.html";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    //bodyParser.urlencoded({ extended: false });
    //bodyParser.json()
    next(); // Pasa el control a la siguiente función middleware
  });
app.get("/", (req, res) => {
    try {
        res.sendFile(absolutePath); 
    } catch (error) {
        console.log(error.__dirname);
    }
});
app.get("/json", (req, res,next) => {
    const styleMessage = process.env.MESSAGE_STYLE;
    console.log(styleMessage);
    if (styleMessage === "uppercase") {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear()).slice(-2);
        const formattedDate = `${day}-${month}-${year}`;
        res.json({ "message": "HELLO JSON" });
        console.log('Time:', formattedDate)
    }
    else {
        res.json({ "message": "Hello json" });
    }
});
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
    }, (req, res) => {
    res.json({ time: req.time });
}
);
app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({ echo: word });
}
);
app.route("/name").get((req, res) => {
    const { first: firstName, last: lastName } = req.query;
    res.json({ name: `${firstName} ${lastName}` });
}
).post((req, res) => {
    const { first: firstName, last: lastName } = req.body;
    res.json({ name: `${firstName} ${lastName}` });
}
);

 module.exports = app;
