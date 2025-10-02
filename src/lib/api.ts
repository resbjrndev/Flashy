const API_BASE = '/api';

function ensureDeviceId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('flashy_device_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('flashy_device_id', id);
  }
  return id;
}

function deviceHeader() {
  const id = ensureDeviceId();
  return id ? { 'X-Device-Id': id } : {};
}

export const api = {
  async getDecks() {
    const r = await fetch(`${API_BASE}/decks`, { headers: deviceHeader(), cache: 'no-store' });
    return r.json();
  },
  async getDeck(deckId: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}`, { headers: deviceHeader(), cache: 'no-store' });
    return r.json();
  },
  async createDeck(title: string, description?: string) {
    const r = await fetch(`${API_BASE}/decks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...deviceHeader() },
      body: JSON.stringify({ title, description }),
    });
    return r.json();
  },
  async updateDeck(deckId: string, title: string, description?: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...deviceHeader() },
      body: JSON.stringify({ title, description }),
    });
    return r.json();
  },
  async deleteDeck(deckId: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}`, { method: 'DELETE', headers: deviceHeader() });
    return r.json();
  },
  async getCards(deckId: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}/cards`, { headers: deviceHeader(), cache: 'no-store' });
    return r.json();
  },
  async createCard(deckId: string, front: string, back: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...deviceHeader() },
      body: JSON.stringify({ front, back }),
    });
    return r.json();
  },
};
