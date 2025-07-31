const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.SERVER_PORT || 5555;

const gemini = require("./chatlogics/gemini")
const azuregpt = require("./chatlogics/azuregpt")

const chatmodellist = require("./datainfos/chatmodellist")
const version = require("./datainfos/version");


const connectDB = require("./databases/MongoDB")
connectDB();
const ChatHistoryDB = require("./databases/chathistory")


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/allmodels', (req, res) => {
    res.send(chatmodellist);
})

app.get('/allversions', (req, res) => {
    res.send(version)
})

app.post('/generate', async (req, res) => {
    const { input, model } = req.body;
    if (!input) {
        return res.status(400).send({ error: "Input is required." });
    }

    if (!model) {
        return res.status(400).send({ error: "Model is required" });
    }

    if (model == "gemini-2.0-flash" || model == "gemini-2.5-flash") {
        const result = await gemini(input, model);
        console.log({ Model: model, Result: result })
        const newUser = new ChatHistoryDB({
            Input: input,
            Output: result,
            Model: model,
        }).save()
            .then(doc => {
                res.send({ result, });
            })
            .catch(err => {
                console.log(err)
                res.send({ result: "Query Failed" });
            });

    }
    else if (model == "o3-mini" || model == "o4-mini") {
        const result = await azuregpt(input, model);
        console.log({ Model: model, Result: result })
        const newUser = new ChatHistoryDB({
            Input: input,
            Output: result,
            Model: model,
        }).save()
            .then(doc => {
                res.send({ result, });
            })
            .catch(err => {
                res.send({ result: "Query Failed" });
            });
    }

    else {
        res.send({ result: "Plz Select Correct Model Name " })
    }



});

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});


