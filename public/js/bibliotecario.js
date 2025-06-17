const token = localStorage.getItem('token');
const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };

async function carregarLivros() {
  const resp = await fetch('/livros', { headers });
  const livros = await resp.json();
  const tbody = document.querySelector('#livrosTable tbody');
  tbody.innerHTML = '';
  livros.forEach(livro => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${livro.id}</td>
      <td>${livro.titulo}</td>
      <td>${livro.autor}</td>
      <td>${livro.ano_publicacao}</td>
      <td>${livro.quantidade_disponivel}</td>
      <td>
        <button onclick="editarLivro(${livro.id})">Editar</button>
        <button onclick="excluirLivro(${livro.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function carregarEmprestimos() {
  const resp = await fetch('/emprestimos', { headers });
  const emprestimos = await resp.json();
  const tbody = document.querySelector('#emprestimosTable tbody');
  tbody.innerHTML = '';
  emprestimos.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.leitor_id}</td>
      <td>${e.livro_id}</td>
      <td>${new Date(e.data_emprestimo).toLocaleDateString()}</td>
      <td>${new Date(e.data_devolucao_prevista).toLocaleDateString()}</td>
      <td><button onclick="devolver(${e.id})">Devolver</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function adicionarLivro(event) {
  event.preventDefault();
  const data = {
    titulo: document.getElementById('titulo').value,
    autor: document.getElementById('autor').value,
    ano_publicacao: parseInt(document.getElementById('ano').value),
    quantidade_disponivel: parseInt(document.getElementById('quantidade').value)
  };
  const resp = await fetch('/livros', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  if (resp.ok) {
    document.getElementById('bookMessage').innerText = 'Livro cadastrado';
    carregarLivros();
  } else {
    document.getElementById('bookMessage').innerText = 'Erro ao cadastrar livro';
  }
  event.target.reset();
}

async function excluirLivro(id) {
  if (!confirm('Excluir livro?')) return;
  await fetch(`/livros/${id}`, { method: 'DELETE', headers });
  carregarLivros();
}

async function editarLivro(id) {
  const titulo = prompt('Novo título:');
  if (!titulo) return;
  const autor = prompt('Novo autor:');
  const ano = prompt('Novo ano:');
  const quantidade = prompt('Nova quantidade:');
  await fetch(`/livros/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ titulo, autor, ano_publicacao: parseInt(ano), quantidade_disponivel: parseInt(quantidade) })
  });
  carregarLivros();
}

async function devolver(id) {
  await fetch(`/emprestimos/${id}/devolver`, { method: 'PUT', headers });
  carregarEmprestimos();
  carregarLivros();
}

document.getElementById('bookForm').addEventListener('submit', adicionarLivro);
carregarLivros();
carregarEmprestimos();
