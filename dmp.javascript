function makeWord() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghipqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
}

const makeInitialList = (scale) => {
        const list = [];
        for (let x = 0; x< 10*scale; x++) {
                list.push(makeWord());
        };
        return list;
}

console.log(makeInitialList(1));

