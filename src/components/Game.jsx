import React, {Component} from 'react';
import Board from "./Board";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            turns: [],
            player1: {
                id: '1',
                name: 'Richard',
                icon: 'fas fa-circle',
                color: 'red'
            },
            player2: {
                id: '2',
                name: 'Harry',
                icon: 'fas fa-circle',
                color: 'yellow'
            },
            status: null,
            result: null,
            chatId: null,
            playerTurn: null
        };
        this.handleBoardChange = this.handleBoardChange.bind(this);
        this.handleTurnsChange = this.handleTurnsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBoardCreate = this.handleBoardCreate.bind(this);
    }

    handleChange(propType, change) {
        this.setState({
            [propType]: change
        });
    }

    handleBoardChange(board, turns, playerTurn) {
        this.setState({
            board: board,
            turns: turns,
            playerTurn: playerTurn
        });
    }

    handleTurnsChange(turns) {
        this.setState({
            turns: turns
        });
    }

    handleBoardCreate(board) {
        this.setState({
            board: board,
            playerTurn: this.state.player1
        });
    }

    render() {
        return (
            <div>
                <Board
                    board={this.state.board}
                    turns={this.state.turns}
                    player1={this.state.player1}
                    player2={this.state.player2}
                    status={this.state.status}
                    result={this.state.result}
                    chatId={this.state.chatId}
                    playerTurn={this.state.playerTurn}
                    onChange={(propType, change) => this.handleChange(propType, change)}
                    onTurnsChange={turns => this.handleTurnsChange(turns)}
                    onBoardChange={(board, turns, playerTurn) => this.handleBoardChange(board, turns, playerTurn)}
                    onBoardCreate={board => this.handleBoardCreate(board)}
                />
            </div>
        );
    }
}

export default Game;