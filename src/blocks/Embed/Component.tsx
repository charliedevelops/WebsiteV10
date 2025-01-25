import type { IFrameBlock as iFrameProps } from '@/payload-types'

type Props = {
  className?: string
  src: string
}

export const IFrameBlock: React.FC<Props> = ({ className, src }) => {
  return (
    <iframe
      className="w-full h-full aspect-video rounded-lg"
      src={src}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
