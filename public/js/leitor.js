const tokenL = localStorage.getItem('token');
const headersL = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenL };

async function carregarCatalogo() {
  const resp = await fetch('/livros', { headers: headersL });
  const livros = await resp.json();
  const tbody = document.querySelector('#catalogoTable tbody');
  tbody.innerHTML = '';
  livros.forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${l.id}</td>
      <td>${l.titulo}</td>
      <td>${l.autor}</td>
      <td>${l.ano_publicacao}</td>
      <td>${l.quantidade_disponivel}</td>
      <td><button onclick="emprestar(${l.id})">Emprestar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function carregarEmprestimosLeitor() {
  const resp = await fetch('/emprestimos', { headers: headersL });
  const emprestimos = await resp.json();
  const tbody = document.querySelector('#meusEmprestimosTable tbody');
  tbody.innerHTML = '';
  emprestimos.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.livro_id}</td>
      <td>${new Date(e.data_devolucao_prevista).toLocaleDateString()}</td>
      <td>${e.status}</td>
      <td><button onclick="solicitarDevolucao(${e.id})">Devolver</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function emprestar(id) {
  const prev = new Date();
  prev.setDate(prev.getDate() + 7);
  await fetch('/emprestimos', {
    method: 'POST',
    headers: headersL,
    body: JSON.stringify({ livro_id: id, data_devolucao_prevista: prev })
  });
  carregarCatalogo();
  carregarEmprestimosLeitor();
}

async function solicitarDevolucao(id) {
  await fetch(`/emprestimos/${id}/devolver`, { method: 'PUT', headers: headersL });
  carregarCatalogo();
  carregarEmprestimosLeitor();
}

carregarCatalogo();
carregarEmprestimosLeitor();
