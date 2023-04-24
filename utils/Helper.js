module.exports = {
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getAvg: (obj) => {
        let a = 0, i = 0;
        for(let o of obj){
            a += o.rating;
            i++;
        }
        return (a/i).toFixed(2);
    }
}
