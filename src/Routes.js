import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Main from './Pages/Main'
import Repo from './Pages/Repositorio'

const Router = () => {
    return(
       <BrowserRouter>
         <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/repos/:repo' element={<Repo/>}/>
         </Routes>
       </BrowserRouter>
    )
}

export default Router