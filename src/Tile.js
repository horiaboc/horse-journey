import React from 'react'
import './Tile.css';
import Context from './Context'

function Tile(props) {

  const plusStyle = {
    width: `${Context.tileSize}px`,
    height: `${Context.tileSize}px`,
    backgroundSize: `${Context.tileSize}px`,
    backgroundColor: props.color,
  }

  if(props.content === 'horse') plusStyle.backgroundImage = 'url(horse.png)'
  if(props.content === 'circle') plusStyle.backgroundImage = 'url(circle.png)'


  return (
    <div className='tile' style={ plusStyle }>
    </div>
  )
}

export default Tile


