import { useControl } from "../../toolbox/controls/useControl"
import { ThreeDText } from "../../toolbox/Effects/threeDText.jsx";
export function HomeTitle() {
    const { show } = useControl();
    return (   
        <>
          {!show && (
            <div className="absolute top-2/4 w-full">
              <ThreeDText title="Project 3" begin="🔥" end="🔥" startEnd={true} />
    
            </div>
          )}
        </>
    );

}
    