const sourcePath = function(){
    let dir = __dirname;
    let arr = dir.split("\\")
    arr = arr.slice(0,arr.length-1)
    dir = arr.join("\\")
    return dir;
}

module.exports = sourcePath;