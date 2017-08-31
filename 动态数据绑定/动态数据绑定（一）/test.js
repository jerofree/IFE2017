function Observer(data) {
    this.data = data;
    this.walk(data);
}

let property = Observer.prototype;

property.walk = function(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            let val = obj[key];

            if(typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

property.convert = function(key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log("你访问了 " + key);
            return val;
        },
        set: function(newVal) {
            console.log("你设置了 " + key + "，新的值为" + newVal);
            if(val != newVal) {
                val = newVal;
            }
            return;
        }
    })
};


let app1 = new Observer({
    name: 'youngwind',
    age: 25,
    book:{
        id:{
            aa:12,
            bb:32,
        },
        num:100
    }
});
console.log(app1.data.book.id.aa)