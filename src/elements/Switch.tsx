import React from "react"
import { Switch as SwitchInstance } from "@headlessui/react"

type Props = {
  enabled: boolean
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const Switch: React.FC<Props> = ({ enabled, setEnabled }) => {
  return (
    <SwitchInstance
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-primary-blue" : "bg-bg-separator"}
          relative inline-flex h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-4.5" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </SwitchInstance>
  )
}

export default Switch
