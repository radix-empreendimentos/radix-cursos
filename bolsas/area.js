/* Comum à área do candidato e à administração da Prova de Bolsas 2027 */
const SB = { url: 'https://bvvfalzwpwvkoghmjvom.supabase.co', key: 'sb_publishable_2_YTQi6igB_VeDBE6joJXg_SNPMIHcC' };
const NOMES = { matematica: 'Matemática', fisica: 'Física', quimica: 'Química', biologia: 'Biologia', humanas: 'Humanas', linguagens: 'Linguagens', redacao: 'Redação' };
const OPCOES = ['matematica_p', 'fisica_p', 'quimica_p', 'biologia_p', 'humanas_p', 'linguagens_p', 'redacao_p', 'matematica_o', 'fisica_o', 'quimica_o', 'biologia_o', 'redacao_o'];
const nomeOpcao = v => NOMES[v.split('_')[0]] + (v.endsWith('_o') ? ' online' : ' presencial');
const $ = id => document.getElementById(id);
const dig = s => String(s || '').replace(/\D/g, '');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
async function rpc(nome, corpo, token) {
  const h = { 'Content-Type': 'application/json', apikey: SB.key };
  if (token) h.Authorization = 'Bearer ' + token;
  const r = await fetch(SB.url + '/rest/v1/rpc/' + nome, { method: 'POST', headers: h, body: JSON.stringify(corpo || {}) });
  if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
  return r.json();
}
const BLOCOS = [['Linguagens', 1, 10], ['Matemática', 11, 20], ['Humanas', 21, 30], ['Física', 31, 35], ['Química', 36, 40], ['Biologia', 41, 45]];
function gabarito(g, resp) {
  return '<h2>Gabarito</h2><div class="gab">' + BLOCOS.map(([n, a, b]) => {
    let s = ''; for (let k = a; k <= b; k++) { const c = g[k - 1], m = resp && resp[k - 1], ok = c === 'X' || m === c;
      s += `<li class="${resp ? (ok ? 'ok' : 'nao') : ''}"><small>${k}</small><b>${c === 'X' ? 'Anul.' : c}</b>${resp ? `<em>${m === '-' ? 'sem marca' : 'você: ' + m}</em>` : ''}</li>`; }
    return `<div><h3>${n}</h3><ul>${s}</ul></div>`; }).join('') + '</div>';
}
