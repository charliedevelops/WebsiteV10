
import React from "react"
import { JSX } from "react"

type PropTypes = {
    id: number
    title: string
    description: string
    image: string
}

const CarouselCard: React.FC<PropTypes> = (props) => {
    const { id, title, description, image } = props

    return (
        <div className="bg-white/10 rounded-xl p-4 w-full h-72 aspect-video embla__slide__content" 
        style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
        }}>
        <h3 className="text-2xl font-semibold hidden">{title}</h3>
        <p className="hidden">{description}</p>    
    </div>
    )
}

export default CarouselCard