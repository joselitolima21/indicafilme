import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/reducers/reducer.js'

const PaginationCom = (props) => {
    const state = useSelector(state => state.reducer)
    const dispatch = useDispatch()

    let rows = []
    for(let i=0; i<9; i++){
      rows.push(1)
    }

    const handleSwitchPage = (event, page) => {
        event.preventDefault()
        dispatch(actions.setPage(page))
        if (state.searchType === 'genres') {
            dispatch(actions.handleSearchByGenre(event, state.idGenreChoiced, page))
        } else {
            dispatch(actions.handleSearch(event, state.query, page))
        }
        window.scrollTo(0,0)
    }
    
    return (

        

        <Pagination className="container-fluid bg-light row d-flex justify-content-center align-middle" aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
             
            {rows.map((v,i)=>{
                return(
                <PaginationItem key={i}>
                    <PaginationLink key={i} href="#top" onClick={(event) => handleSwitchPage(event,i+1)}>
                        {i+1}
                    </PaginationLink>
                </PaginationItem>
                )})
            }

            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationCom;