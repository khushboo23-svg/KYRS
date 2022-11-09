const projectPath = function(){
    let dir = __dirname;
    let arr = dir.split("\\")
    arr = arr.slice(0,arr.length-2)
    dir = arr.join("\\")
    return dir;
}

module.exports = projectPath;