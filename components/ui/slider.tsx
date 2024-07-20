import React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className="relative flex items-center select-none touch-none w-full h-5"
    {...props}
  >
    <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">
      <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-5 h-5 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </SliderPrimitive.Root>
))

Slider.displayName = "Slider"