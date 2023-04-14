import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const { register, handleSubmit, setValue } = useForm();
  const [cepData, setCepData] = useState(null); // Estado para armazenar os dados do CEP

  const onSubmit = (data) => {
    console.log(data);
    // Fazer o fetch dos dados do CEP aqui, e atualizar o estado cepData com os dados obtidos
    const cep = data.cep.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCepData(data); // Atualiza o estado com os dados do CEP
      });
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input className='input-cep' type='text' {...register('cep')} />
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
