const fs = require('fs');
const path = './libraryData.json';
const readline = require('readline-sync');

function generateId() {
  return Date.now().toString();
}
e
function readData() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function adicionarLivro(titulo, autor, anoPublicacao, genero) {
  if (!titulo || !autor || !anoPublicacao || !genero) {
    console.log('Todos os campos são obrigatórios.');
    return;
  }

  const livros = readData();
  const novoLivro = {
    id: generateId(),
    titulo,
    autor,
    anoPublicacao,
    genero,
    emprestado: false,
    historicoEmprestimos: []
  };

  livros.push(novoLivro);
  writeData(livros);
  console.log('Livro adicionado com sucesso:', novoLivro);
}

function listarLivros() {
  const livros = readData();
  console.log('Lista de livros disponíveis:');
  livros.forEach(livro => {
    console.log(`${livro.id}: ${livro.titulo}, ${livro.autor}, ${livro.anoPublicacao}, ${livro.genero}`);
  });
}