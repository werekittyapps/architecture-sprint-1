class Api {
    constructor({ address }) {
        // стандартная реализация -- объект options
        this._address = address;
    }

    _getResponse = (res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      }
      
    register = (email, password) => {
        return fetch(`${_address}/signup`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        })
        .then(_getResponse)
      };

    login = (email, password) => {
        return fetch(`${_address}/signin`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        })
        .then(_getResponse)
        .then((data) => {
          localStorage.setItem('jwt', data.token)
          return data;
        })
      };

    checkToken = (token) => {
        return fetch(`${_address}/users/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(_getResponse)
      }
}

const api = new Api({
    //address: 'http://localhost:3001',
    address: 'https://auth.nomoreparties.co',
});

export default api;