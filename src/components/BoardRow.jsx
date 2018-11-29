import React, {Component} from 'react';
import BoardTile from "./BoardTile";
import '../App.css';

const EMPTY_TILE = 'far fa-circle';
const OWNED_TILE = 'fas fa-circle';
const ERRORED_TILE = 'fas fa-times-circle';

class BoardRow extends Component {
    constructor(props) {
        super(props);
        this.tileStyle = this.tileStyle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(tile) {
        this.props.onTileClick(tile);
    }

    tileStyle(tile) {
        if (tile.player === null) {
            return EMPTY_TILE;
        } else {
            return OWNED_TILE;
        }
    }

    render() {
        return (
            <div className='board-row'>
                {this.props.row.map((tile) => {
                    return (
                        <BoardTile
                            key={tile.id}
                            tile={this.tileStyle(tile)}
                            data={tile}
                            playerTurn={this.props.playerTurn}
                            onClick={ () => this.props.onTileClick(tile)}
                        />
                    );
                })}
            </div>
        );
    }
}

export default BoardRow;