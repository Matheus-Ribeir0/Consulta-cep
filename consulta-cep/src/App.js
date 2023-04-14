import React, { useState } from 'react';
import './App.css';

function App() {
  const [cepData, setCepData] = useState(null); // Estado para armazenar os dados do CEP

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cep = formData.get('cep').replace(/\D/g, '');
    // Fazer o fetch dos dados do CEP aqui, e atualizar o estado cepData com os dados obtidos
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCepData(data); // Atualiza o estado com os dados do CEP
      });
  };

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <label>
          <input className='input-cep' type='text' name='cep' />
        </label>
        <button type='submit'>Enviar</button>
      </form>
      {cepData && (
        <div className='cep-data'>
          {/* Renderiza os dados do CEP na div */}
          <p>CEP: {cepData.cep}</p>
          <p>Logradouro: {cepData.logradouro}</p>
          <p>Bairro: {cepData.bairro}</p>
          <p>Cidade: {cepData.localidade}</p>
          <p>Estado: {cepData.uf}</p>
        </div>
      )}
    </div>
  );
}

export default App;
