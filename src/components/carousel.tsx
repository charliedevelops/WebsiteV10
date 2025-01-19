"use client"
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import CarouselCard from './carouselCard'
type Project = {
    id: number
    title: string
    description: string
    image: string
}

type PropType = {
    slides: Project[]
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides } = props
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true } as EmblaOptionsType)

    return (
        <section className="embla  py-8">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((project) => (
                        <div className="embla__slide" key={project.id}>
                                <CarouselCard id={project.id} title={project.title} description={project.description} image={project.image}  />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
