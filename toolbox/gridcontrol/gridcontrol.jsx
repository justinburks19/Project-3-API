import {forwardRef} from 'react';
export const GridControl = forwardRef(function GridControl(
    {
        // Grid items diplay
        items = [],
        className = "",
        cols = "grid-cols-1",
        gap = "gap-4",
        padding = "p-4",
        centerItems = true,
        // Individual grid items props title
        itemBorder = "border",
        itemPadding = "p-2",
        width = "w-full",
        itemAlign = "justify-items-center",
        // Inner content
        

    },
    ref
) {
    return (
        <div
            className={`
                
                ${className} 
                ${cols} 
                ${gap} 
                ${padding}
                ${centerItems ? "place-items-center" : ""}
                 grid`}
            ref={ref}
        >
            {items.length > 0 ? (
                items.map((item, index) => (
                    <div key={index} className={`${itemBorder} ${itemPadding} ${width} ${itemAlign}`}>{item}</div>
                ))
            ) : (<div>No items provided</div>)}

        </div>

    )
});  