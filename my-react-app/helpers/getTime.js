
export const GetTime = () => {
    //retrieve the current time for background use!
    const now = new Date().getHours(); //current time
    
    return now < 16 ? 'light' : 'dark'; //set theme based on time
}