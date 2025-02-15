require("dotenv").config();

const express = require("express");
const { urlencoded } = require("express");
const axios = require("axios");
const cors = require("cors"); 

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;


function fetchNews(url, res) {
    axios.get(url)
       .then((response) => {
            if (response.data.totalResults > 0){
                res.json({
                    status:200,
                    success:true,
                    message:"Successfully fetched the data",
                    data:response.data
                })
            } else {
                res.json({
                    status:200,
                    success:true,
                    message:"No more results to show"
                })
            }
        })
       .catch((error) => {
            res.json({
                status:500,
                success:false,
                message:"An error occurred while fetching the data",
                error:error.message
            })
        });
}

//ALL NEWS

app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let query = req.query.q || "latest";

    let url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
})

//top-headlines 
app.options("/top-headlines", cors());

app.get("/top-headlines", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "general";

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
})

//country

app.options("/country/:iso", cors());

app.get("/country/:iso", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    const country = req.params.iso;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
})

//port

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});