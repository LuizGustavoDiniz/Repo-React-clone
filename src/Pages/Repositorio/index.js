import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Owner } from './styles'

import api from '../../services/api'

const Repo = () => {

  const { repo } = useParams()

  const [repositorio, setRepositorio] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {

    const getApi = async () => {
      const repoName = decodeURIComponent(repo)
      
     const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepositorio(repoData.data)
      setIssues(issuesData.data)
      setLoading(false)

    }

    getApi()

  }, [])
  
  return(
    <Container>
        <Owner>
          <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>
    </Container>
  ) 
}

export default Repo