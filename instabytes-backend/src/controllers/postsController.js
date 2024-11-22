import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModel.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts da base de dados usando a função getTodosPosts
  const posts = await getTodosPosts();

  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post a partir do corpo da requisição
  const novoPost = req.body;

  // Tenta criar o novo post usando a função criarPost
  try {
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  // Tenta criar o novo post e renomear o arquivo da imagem
  try {
    const postCriado = await criarPost(novoPost);
    // Gera um novo nome para a imagem com base no ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}