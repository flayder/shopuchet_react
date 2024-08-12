import React from "react"
import { Dialog, Transition } from "@headlessui/react"
import cls from "classnames"

export type BottomSheetAction = {
  title: string
  onClick(itemId: number | null): void
  className?: string
}

export type BottomSheetProps = {
  open: boolean
  onClose(): void
  actions: BottomSheetAction[]
  itemId: number | null
}

const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose, actions, itemId }) => {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto bg-bg-modal">
          <div className="flex min-h-full items-end justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-bg-white  text-left align-middle transition-all">
                {actions.map(({ title, onClick, className }, index) => (
                  <button
                    key={`action_${index}`}
                    onClick={() => onClick(itemId)}
                    className={cls(
                      "text-primary-blue w-full p-4 active:bg-bg-secondary border-b border-bg-separator",
                      className,
                      {
                        "rounded-t-2xl": index === 0
                      }
                    )}
                  >
                    {title}
                  </button>
                ))}
                <button onClick={onClose} className="text-primary-blue w-full p-4 rounded-b-2xl active:bg-bg-secondary">
                  Отмена
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BottomSheet
