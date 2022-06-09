import React from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'

function App() {
  const [input, setInput] = React.useState('')
  const [cep, setCep] = React.useState({})

  async function handleSearch() {
    if (!input) {
      alert('Preencha o campo corretamente!')
      return
    }

    const url = `https://viacep.com.br/ws/${input}/json/`

    try {
      const response = await fetch(url)
      const json = await response.json()
      setCep(json)
      setInput('')
    } catch (error) {
     alert('CEP Não encontrado ou Inválido') 
     setInput('')
     return
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador CEP</h1>

      <div className='container-input'>
        <input 
        type="text" 
        placeholder='Digite seu cep' 
        value={input} 
        onChange={(event) => setInput(event.target.value)} />

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Localização: {cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  )
}

export default App
