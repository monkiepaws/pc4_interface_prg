import React from "react";
import '../App.css';

function BoardTile(props) {
    const color = props.data.player === null ? `#FFFFFF` : props.data.player.color;
    return (
        <button  className='tile' onClick={props.onClick}>
            <i style={{color: `${color}`}} className={`${props.tile}`} />
        </button>
    );
}

export default BoardTile;