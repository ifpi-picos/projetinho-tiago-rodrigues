const fs = require('fs');
const path = './shoppingListData.json';

function generateId() {
  return Date.now().toString();
}

function readData() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function adicionarItem(nome, quantidade, categoria) {
  if (!nome || !quantidade || !categoria) return console.log('Campos obrigatórios.');
  
  const itens = readData();
  itens.push({ id: generateId(), nome, quantidade, categoria, comprado: false });
  writeData(itens);
  console.log('Item adicionado:', nome);
}

function listarItens() {
  const itens = readData();
  itens.forEach(item => console.log(`${item.id}: ${item.nome}, ${item.quantidade}, ${item.categoria}, Comprado: ${item.comprado}`));
}

function editarItem(id, novoNome, novaQuantidade, novaCategoria) {
  const itens = readData();
  const item = itens.find(item => item.id === id);
  if (!item) return console.log('Item não encontrado.');

  if (novoNome) item.nome = novoNome;
  if (novaQuantidade) item.quantidade = novaQuantidade;
  if (novaCategoria) item.categoria = novaCategoria;

  writeData(itens);
  console.log('Item editado:', item.nome);
}

function marcarComoComprado(id) {
  const itens = readData();
  const item = itens.find(item => item.id === id);
  if (!item || item.comprado) return console.log('Item não encontrado ou já comprado.');

  item.comprado = true;
  writeData(itens);
  console.log('Item marcado como comprado:', item.nome);
}

function listarItensComprados() {
  const itens = readData().filter(item => item.comprado);
  itens.forEach(item => console.log(`${item.id}: ${item.nome}, ${item.quantidade}, ${item.categoria}`));
}

function resumoListaCompras() {
  const itens = readData();
  const totalComprados = itens.filter(item => item.comprado).length;
  console.log(`Total de itens: ${itens.length}, Comprados: ${totalComprados}, Não comprados: ${itens.length - totalComprados}`);
}

adicionarItem('Leite', 2, 'Laticínios');
listarItens();
marcarComoComprado(readData()[0].id);
listarItensComprados();
resumoListaCompras();
