import React from 'react'

const Skeleton = () => {

    const items = [1, 2, 3, 4];

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {items.map((item) => (
                <div
                    key={item}
                    className="flex flex-col bg-neutral-200 w-66 h-64 animate-pulse rounded-xl p-4 gap-4"
                >
                    <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                        <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                        <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                        <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Skeleton
