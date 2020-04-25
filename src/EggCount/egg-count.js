import React from 'react'
import egg from './fried-egg.png'
import './egg-count.css'

class EggCount extends React.Component {
    eggPicture = () => {
        let images= [];
        for (let i = 0; i < this.props.eggCount; i++){
               images.push(egg)
            }
        return images;
        }

    render(){
        const result = this.eggPicture();
        const egg = result.map((egg, i)=>{
            return <img key={i} src={egg} alt='fried egg' className='egg-picture'/>
        })
        return(
            <div>
                {egg}
            </div>
        )
    }
}
export default EggCount;