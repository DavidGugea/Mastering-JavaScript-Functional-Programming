const alternating = (f, g) => {
    let f_flag = true;
    let g_flag = false;
    
    return (...args) => {
        if(f_flag){
            f(...args);
            f_flag = false;
            g_flag = true;
        }else{
            g(...args);
            f_flag = true;
            g_flag = false;
        }
    }
}

const f = () => console.log("F");
const g = () => console.log("G");
const alternate = alternating(f, g);

for(let i = 0;i < 10;i++){
    alternate();
}