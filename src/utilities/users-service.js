// utilities/users-service.js
const BASE_URL = '/api/users';

export async function login(credentials) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

export function signup(formData) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Error during signup');
    })
    .then((data) => data)
    .catch((error) => {
      console.error('Error during signup:', error);
      throw error;
    });
}
