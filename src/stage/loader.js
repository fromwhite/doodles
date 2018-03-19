import {
    queue
} from '_'

//资源加载
class Loader {
    constructor(arr) {
        this._images = {};
        this.task = [];
    }
    //加载图片
    load(arr, callback) {
        let self = this;
        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                self.task.push(function() {
                    self._images[arr[i]] = new Image();
                    self._images[arr[i]].onload = function() {
                        callback();
                        return
                    }
                    self._images[arr[i]].src = arr[i];
                })
            } else {
                self.task.push(function(callback) {
                    self._images[arr[i]] = new Image();
                    self._images[arr[i]].onload = function() {
                        callback();
                    }
                    self._images[arr[i]].src = arr[i];
                })
            }
        }

        return queue(self.task, this)
    }
    //获取图片
    pick(src) {
        if (typeof this._images[src] != 'undefined') {
            return this._images[src];
        } else {
            throw new Error('请传入图片对象')
        }
    }
}

export default Loader