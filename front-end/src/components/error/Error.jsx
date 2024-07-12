import React from 'react'

export default function Error({status, message, span}) {
    return (
        <div role="alert" className={`p-2 ${span ? 'col-span-2' : ''}`}>
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Error {status}
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{message}</p>
            </div>
        </div>
    )
}
