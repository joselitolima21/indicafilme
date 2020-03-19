import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Row} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/reducers/reducer.js'

const Search = (props) => {

    const state = useSelector(state => state.reducer) 
    const dispatch = useDispatch()

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [choiecedGenre, setChoicedGenre] = useState('Escolha o Gênero')

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Row>
        <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="ml-2" caret>
                {choiecedGenre}
            </DropdownToggle>
            <DropdownMenu>
                {state.genresValue.map((genre) => <DropdownItem onClick={() => {setChoicedGenre(genre.name);
                dispatch(actions.setIdGenreChoiced(genre.id))}}
                    key={genre.id}>{genre.name}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>

        <Button className="ml-1" onClick={(event)=> {dispatch(actions.handleSearchByGenre(event,state.idGenreChoiced,state.page))
        dispatch(actions.setSearchType('genres'))}} color="info">Buscar</Button>
        </Row>
    );
}

export default Search;