import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 5000;
const login_url = 'https://api.charispay.ir/api/TokenAuth/CheckUserAndPassAndGenerateSms';

app.post('/login', (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        'accept': '*/*'
    };
    axios.post(login_url, req.body, { headers })
        .then(res => {
            console.log(res);
            res.send(res.data)
        })
        .catch(error => {
            console.log(error.response.data);
            res.send(error.response.data)
        })
})

app.listen(port, () => {
    console.log(`Node server listening on port ${port}`)
})
