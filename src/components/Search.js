import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Row} from 'reactstrap';

const Search = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [choiecedGenre, setChoicedGenre] = useState('Escolha o Gênero')
    const [id, setId] = useState('')
    const { genresValue, handleSearchByGenre} = props

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Row>
        <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="ml-2" caret>
                {choiecedGenre}
            </DropdownToggle>
            <DropdownMenu>
                {genresValue.map((genre) => <DropdownItem onClick={() => {setChoicedGenre(genre.name);setId(genre.id)}}
                    key={genre.id}>{genre.name}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>

        <Button className="ml-1" onClick={(event)=>handleSearchByGenre(event,id)} color="info">Buscar</Button>
        </Row>
    );
}

export default Search;