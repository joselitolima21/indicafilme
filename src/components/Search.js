import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/reducers/reducer.js'

const Search = (props) => {

    const state = useSelector(state => state.reducer)
    const dispatch = useDispatch()

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [choiecedGenre, setChoicedGenre] = useState('Escolha o Gênero')

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="ml-2" caret>
                    {choiecedGenre}
                </DropdownToggle>
                <DropdownMenu>
                    {state.genresValue.map((genre) => 
                <DropdownItem
                    onClick={() => {
                        setChoicedGenre(genre.name);
                        dispatch(actions.setSearchType('genres'));
                        dispatch(actions.setIdGenreChoiced(genre.id));
                        dispatch(actions.handleSearchByGenre(genre.id, 1));
                        }}
                    key={genre.id}>{genre.name}</DropdownItem>)}
                </DropdownMenu>
        </Dropdown>
    );
}

export default Search;