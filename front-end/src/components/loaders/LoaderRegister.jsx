import React from 'react'

export default function LoaderRegister() {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-transparent">
            <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
            </div>
        </div>
    )
}
