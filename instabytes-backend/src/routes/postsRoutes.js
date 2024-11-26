// Importa o módulo Express para criar o servidor web
import express from "express";

// Importa o módulo Multer para gerenciar uploads de arquivos
import multer from "multer";

import cors from "cors";

// Importa as funções controladoras para posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
};

// Configura o armazenamento para uploads de arquivos
const storage = multer.diskStorage({
  // Define o diretório de destino para os uploads
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo utilizando o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware para analisar JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Define uma rota GET para "/posts" que delega a função listarPosts
  app.get("/posts", listarPosts);

  // Define uma rota POST para "/posts" que delega a função postarNovoPost
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para "/upload" que utiliza o middleware upload.single("imagem") e delega a função uploadImagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para ser utilizada pelo servidor principal
export default routes;