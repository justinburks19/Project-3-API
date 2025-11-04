export function SmokeEffects() {
    const smoke = () => {
        const smokeArray = [];
        for (let i = 0; i < 20; i++) {
            const size = Math.random() * 20 + 10; // Random size between 10 and 30
            const left = Math.random() * 100; // Random left position between 0% and 100%
            const delay = Math.random() * 5; // Random delay between 0s and 5s
            const duration = Math.random() * 5 + 5; // Random duration between 5s and 10s
            smokeArray.push(
                <div className="grid grid-cols-5">
                    <div className="col-span-1">
                        test
                    </div>
                </div>
            );
        }
        return smokeArray;
    }
    const item = smoke();

  return (
    <>
        <div className="absolute z-10 inset-0 pointer-events-none overflow-hidden w-full">
        {item}
        </div>
    </>
  );

}