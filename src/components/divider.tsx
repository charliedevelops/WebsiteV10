import { FC } from 'react'

interface DividerProps {
  width?: string | number
  className?: string
}

const Divider: FC<DividerProps> = ({ width = '100%', className = '' }) => {
  const widthValue = typeof width === 'number' ? `${width}px` : width

  return (
    <div
      className={`h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 my-8 ${className}`}
      style={{ width: widthValue }}
    />
  )
}

export default Divider
