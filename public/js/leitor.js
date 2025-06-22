const tokenL = localStorage.getItem('token');
if (!tokenL) {
  window.location.href = 'index.html';
}
const payloadL = JSON.parse(atob(tokenL.split('.')[1]));
if (payloadL.perfil !== 'leitor') {
  window.location.href = 'index.html';
}
const headersL = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenL };

async function carregarCatalogo() {
  const resp = await fetch('/livros', { headers: headersL });
  const livros = await resp.json();
  const tbody = document.querySelector('#catalogoTable tbody');
  tbody.innerHTML = '';
  livros.forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
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
  for (const e of emprestimos) {
    const livroResp = await fetch(`/livros/${e.livro_id}`, { headers: headersL });
    const livro = await livroResp.json();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${livro.titulo}</td>
      <td>${new Date(e.data_emprestimo).toLocaleDateString()}</td>
      <td>${new Date(e.data_devolucao_prevista).toLocaleDateString()}</td>
      <td>${e.status}</td>
      <td>${e.status === 'ativo' ? `<button onclick="solicitarDevolucao(${e.id}, this)">Devolver</button>` : ''}</td>
    `;
    tbody.appendChild(tr);
  }
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

async function solicitarDevolucao(id, btn) {
  const resp = await fetch(`/emprestimos/${id}/solicitar-devolucao`, { method: 'PUT', headers: headersL });
  if (resp.ok && btn) {
    const statusCell = btn.parentElement.previousElementSibling;
    if (statusCell) statusCell.textContent = 'pendente';
    btn.remove();
  } else {
    carregarEmprestimosLeitor();
  }
}

carregarCatalogo();
carregarEmprestimosLeitor();
