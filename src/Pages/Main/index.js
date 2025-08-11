import { Link } from 'react-router-dom'
import React, { useState, useCallback, useEffect } from 'react'
import { Container, Form, SubmitButton, List, DeleteBtn } from './styles'
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa'

import api from '../../services/api'

const Main = () => {

  const [input, setInput] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

   useEffect(() => {

      const repos = localStorage.getItem('repos')

      if(repos){
        setRepos(JSON.parse(repos))
      }

  }, [])

  useEffect(() => {
   
    localStorage.setItem('repos', JSON.stringify(repos))
    
  }, [repos])

  const handleGetRepo = useCallback((event) => {

    event.preventDefault();

      const getRepo = async () => {

        setLoading(true)
        setAlert(null)

        try {

          if(input === ''){
            throw new Error('Você precisa indicar algum repositório!')
          }

          const response = await api.get(`/repos/${input}`)

          const hasRepo = repos.find((repo) => repo.name === input)

          if(hasRepo){
          throw new Error('esse repositório ja foi adicionado!')
         }

          const data = {
           name: response.data.full_name
         }


         setRepos([...repos, data])
         setInput('')
          
        } catch (error) {
          setAlert(true)
          console.log('Algum erro', error)
        }finally{
          setLoading(false)
        }

      }

      getRepo()
      

  }, [input, repos])

  const handleInputValue = (event) => {
    setInput(event.target.value)
  }

  const handleDelete = useCallback((repoName) => {

    const findRepo = repos.filter((repo) => repo.name !== repoName)

    setRepos(findRepo)

  }, [repos])

  return(
    <Container>
      <h1>
        <FaGithub size={25}/>
        Meus Repositórios
        </h1>

      <Form onSubmit={handleGetRepo} $erro={alert}>
         <input 
         type="text" 
         placeholder='Adicionar repositórios'
         value={input}
         onChange={handleInputValue}
         />

         <SubmitButton loading={loading ? 1 : 0}>
          {
            loading ? (
              <FaSpinner color='#FFF' size={14}/>
            ) : (
              <FaPlus color='#FFF' size={14}/>
            )
          }  
         </SubmitButton>
      </Form>

   <List>
    {repos.map((repo, index) => (
       <li key={index}>
        <span>
          <DeleteBtn onClick={() => handleDelete(repo.name)}>
            <FaTrash size={14}/>
          </DeleteBtn>
          {repo.name}
          </span>
        <Link to={`/repos/${ encodeURIComponent(repo.name) }`}>
          <FaBars size={20}/>
        </Link>
       </li>
    ))}
   </List>

    </Container>
  ) 
}

export default Main