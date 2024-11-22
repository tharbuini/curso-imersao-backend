import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Habilita o middleware para analisar JSON no corpo das requisições
    app.use(express.json());

    // Define uma rota GET para "/posts"
    app.get("/posts", listarPosts);
};

export default routes;
