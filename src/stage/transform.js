import {
    m4
} from 'math'

class Transform {
    constructor() {
        this.stack = [];
        // 因为栈是空的，需要放入一个初始化矩阵
        this.restore();
    }
    // 抛出顶部的矩阵，重置为前一个矩阵
    restore() {
        this.stack.pop();
        // 永远不要让栈为空
        if (this.stack.length < 1) {
            this.stack[0] = m4.identity();
        }
    }
    // 讲当前矩阵备份到栈中
    save() {
        this.stack.push(this.getCurrentMatrix());
    }
    // 获取当前矩阵（栈顶的矩阵）
    getCurrentMatrix() {
        return this.stack[this.stack.length - 1].slice();
    }
    // 设置当前矩阵
    setCurrentMatrix() {
        return this.stack[this.stack.length - 1] = m;
    }
    // 平移当前矩阵
    translate(x, y, z = 0) {
        let m = this.getCurrentMatrix();
        this.setCurrentMatrix(m4.translate(m, x, y, z));
    }
    // 旋转当前矩阵
    rotateZ(angleInRadians) {
        let m = this.getCurrentMatrix();
        this.setCurrentMatrix(m4.zRotate(m, angleInRadians));
    }
    scale(x, y, z = 1) {
        let m = this.getCurrentMatrix();
        this.setCurrentMatrix(m4.scale(m, x, y, z));
    }
}

export default Transform