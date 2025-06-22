async function registrar(event) {
  event.preventDefault();
  const data = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('emailRegistro').value,
    senha: document.getElementById('senhaRegistro').value,
    perfil: document.getElementById('perfil').value
  };
  try {
    const resp = await fetch('/usuarios/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!resp.ok) throw new Error('Erro ao registrar');
    document.getElementById('registerMessage').innerText = 'Registro concluído';
  } catch (err) {
    document.getElementById('registerMessage').innerText = 'Falha no registro';
  }
}

async function login(event) {
  event.preventDefault();
  const data = {
    email: document.getElementById('emailLogin').value,
    senha: document.getElementById('senhaLogin').value
  };
  try {
    const resp = await fetch('/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!resp.ok) throw new Error('Login inválido');
    const result = await resp.json();
    localStorage.setItem('token', result.token);
    const payload = JSON.parse(atob(result.token.split('.')[1]));
    if (payload.perfil === 'bibliotecario') {
      window.location.href = 'bibliotecario.html';
    } else {
      window.location.href = 'leitor.html';
    }
  } catch (err) {
    document.getElementById('loginMessage').innerText = 'Usuário ou senha incorretos';
  }
}

document.getElementById('registerForm').addEventListener('submit', registrar);
document.getElementById('loginForm').addEventListener('submit', login);

document.getElementById('toRegister').addEventListener('click', () => {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('registerSection').classList.remove('hidden');
});

document.getElementById('toLogin').addEventListener('click', () => {
  document.getElementById('registerSection').classList.add('hidden');
  document.getElementById('loginSection').classList.remove('hidden');
});
