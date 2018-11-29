import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import { createNewBoard, addTurn } from "../actions/gameActions";
// import firebase from '../firebase';
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import '../App.css';
import BoardRow from "./BoardRow";

class Board extends Component {
    constructor(props) {
        super(props);
        this.onClickCreateGame = this.onClickCreateGame.bind(this);
        this.handleTileClick = this.handleTileClick.bind(this);
        this.changeTurn = this.changeTurn.bind(this);
    }

    handleTileClick(tile) {
        if (tile.player === null) {
            const turn = {
                id: tile.id,
                column: tile.column,
                row: tile.row,
                player: this.props.playerTurn
            };
            // const newBoard = this.props.board.concat();
            // newBoard[tile.row][tile.column] = turn;
            // const newTurns = this.props.turns.concat(turn);
            // this.props.onBoardChange(newBoard, newTurns, this.changeTurn());
            this.props.onTurn(turn, this.changeTurn());
        }
    }

    changeTurn() {
        return this.props.playerTurn.id === this.props.player1.id ? this.props.player2 : this.props.player1;
    }

    onClickCreateGame() {
        const size = 3;
        const board = [];
        let tileId = 0;
        for (let rows = 0; rows < size; rows++) {
            const row = [];
            for (let columns = 0; columns < size; columns++) {
                const tile = {
                    id: tileId,
                    column: columns,
                    row: rows,
                    player: null,
                };
                row.push(tile);
                tileId++;
            }
            board.push(row);
        }
        this.props.onBoardCreate(board);
    }

    render() {
        const rows = this.props.board.map((row, y) => {
            return (
                <BoardRow
                    key={`row-${y}`}
                    row={row}
                    playerTurn={this.props.playerTurn}
                    onTileClick={tile => this.handleTileClick(tile)}
                />
            )
        });

        return (
            <div>
                <Button onClick={this.onClickCreateGame}>Create New Game</Button>
                <br />
                <Paper className='board'>
                    {rows}
                </Paper>
            </div>
        );
    }
}

export default Board;

// const mapStateToProps = state => ({
//     board: state.game.board,
//     turns: state.game.turns,
//     players: state.game.players,
//     playerTurn: state.game.playerTurn
// });

// export default connect(mapStateToProps, { createNewBoard, addTurn })(Board);