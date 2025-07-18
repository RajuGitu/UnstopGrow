import React, { forwardRef } from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../../libs/utils"

const Switch = forwardRef((props, ref) => {
  const { className, ...rest } = props
  
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=unchecked]:bg-white",
        className
      )}
      {...rest}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full data-[state=checked]:bg-white data-[state=unchecked]:bg-black shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
})

Switch.displayName = "Switch"

export { Switch }