import conectarAoBanco from "../config/dbConfig.js";

// Estabelece uma conexão com o banco de dados MongoDB utilizando a string de conexão fornecida pelo ambiente.
// A conexão é armazenada na variável 'conexao' para ser utilizada em outras partes do código.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts armazenados no banco de dados.
// Retorna um array contendo todos os documentos da coleção "posts".
export async function getTodosPosts() {
  // Seleciona o banco de dados onde os posts são armazenados.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção que contém os documentos dos posts.
  const colecao = db.collection("posts");

  // Executa uma consulta para buscar todos os documentos da coleção e retorna os resultados como um array.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
// Recebe um objeto contendo os dados do novo post e insere-o na coleção "posts".
export async function criarPost(novoPost) {
  // Seleciona o banco de dados onde os posts são armazenados.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção que contém os documentos dos posts.
  const colecao = db.collection("posts");

  // Insere um novo documento na coleção com os dados do novo post e retorna um objeto com informações sobre a operação de inserção.
  return colecao.insertOne(novoPost);
}