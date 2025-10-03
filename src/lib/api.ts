const API_BASE = '/api';

function generateUUID(): string {
  // Check if crypto.randomUUID is available
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function ensureDeviceId(): string {
  if (typeof window === 'undefined') return '';

  let id = localStorage.getItem('flashy_device_id');
  if (!id) {
    id = generateUUID();
    localStorage.setItem('flashy_device_id', id);
  }
  return id;
}

function deviceHeader(): Record<string, string> {
  const id = ensureDeviceId();
  console.log('Device ID:', id); // Debug: check if ID is generated
  // Always return the header, even if empty - API will handle validation
  return { 'x-device-id': id }; // Use lowercase to match API helper
}

export const api = {
  async getDecks() {
    const headers = deviceHeader();
    console.log('getDecks headers:', headers); // Debug log
    const r = await fetch(`${API_BASE}/decks`, { headers, cache: 'no-store' });
    const data = await r.json();
    if (!r.ok) {
      console.error('getDecks error:', r.status, data);
    }
    return data;
  },
  async getDeck(deckId: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}`, { headers: deviceHeader(), cache: 'no-store' });
    return r.json();
  },
  async createDeck(title: string, description?: string, color?: string) {
    const r = await fetch(`${API_BASE}/decks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...deviceHeader() },
      body: JSON.stringify({ title, description, color }),
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
  async updateCard(deckId: string, cardId: string, front: string, back: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...deviceHeader() },
      body: JSON.stringify({ front, back }),
    });
    return r.json();
  },
  async deleteCard(deckId: string, cardId: string) {
    const r = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: deviceHeader(),
    });
    return r.json();
  },
};
