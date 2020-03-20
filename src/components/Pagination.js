import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/reducers/reducer.js'

const PaginationCom = (props) => {
    const state = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    
    var rows
    if (state.device==='mobile') {
        rows = []
        for(let i=0; i<=4; i++){
            rows.push(1)
        }
    } else {
        rows = []
        for(let i=0; i<=9; i++){
            rows.push(1)
        }
    }

    const handleSwitchPage = (event, page) => {
        event.preventDefault()
        dispatch(actions.setPage(page))
        if (state.searchType === 'genres') {
            dispatch(actions.handleSearchByGenre(state.idGenreChoiced, page))
        } else if(state.searchType === 'query'){
            dispatch(actions.handleSearch(state.query, page))
        }
        window.scrollTo(0,0)
    }
    
    return (

        

        <Pagination className="themed-container bg-light row d-flex justify-content-center align-middle m-0" aria-label="Page navigation example">
           
             
            {rows.map((v,i)=>{
                return(
                <PaginationItem key={i} active ={ i+1 === state.page ? true : false} >
                    <PaginationLink key={i}  href="#top" onClick={(event) => handleSwitchPage(event,i+1)}>
                        {i+1}
                    </PaginationLink>
                </PaginationItem>
                )})
            }

        
        </Pagination>
    );
}

export default PaginationCom;