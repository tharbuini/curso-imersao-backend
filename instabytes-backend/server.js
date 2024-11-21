import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fofinho dormindo",
        imagem: "https://placekitten.com/400/200"
    },
    {
        id: 3,
        descricao: "Paisagem montanhosa",
        imagem: "https://picsum.photos/seed/picsum/200/300"
    },
    {
        id: 4,
        descricao: "Cachorro brincando no parque",
        imagem: "https://source.unsplash.com/random/200x300/?dog,park"
    },
    {
        id: 5,
        descricao: "Pôr do sol na praia",
        imagem: "https://unsplash.com/photos/2tH6sJsxijw"
    },
    {
        id: 6,
        descricao: "Comida deliciosa",
        imagem: "https://loremflickr.com/320/240/food"
    },
    {
        id: 7,
        descricao: "Cidade moderna à noite",
        imagem: "https://source.unsplash.com/random/200x300/?city,night"
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);
    res.status(200).json(posts[index]);
});
