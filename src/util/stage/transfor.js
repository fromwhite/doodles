import mat3 from 'mat3'

const STACK_DEPTH_LIMIT = 16

class Transform {
    constructor (mat) {
        this.clearStack(mat);
    }
    clearStack (init_mat) {
        this.m_stack = [];
        this.m_cache = [];
        this.c_stack = 0;
        this.valid = 0;
        this.result = null;
    
        for (var i = 0; i < STACK_DEPTH_LIMIT; i++) {
          this.m_stack[i] = this.getIdentity();
        }
    
        if (init_mat !== undefined) {
          this.m_stack[0] = init_mat;
        } else {
          this.setIdentity();
        }
    }
    setIdentity () {
        this.m_stack[this.c_stack] = this.getIdentity();
        if (this.valid === this.c_stack && this.c_stack) {
          this.valid--;
        }
    }
    getIdentity () {
        return [1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0];
    }
    getResult () {
        if (!this.c_stack) {
            return this.m_stack[0];
          }
      
          let m = mat3.identity;
      
          if (this.valid > this.c_stack-1) { this.valid = this.c_stack-1; }
      
          for (var i = this.valid; i < this.c_stack+1; i++) {
            m = mat3.multiply(this.m_stack[i],m);
            this.m_cache[i] = m;
          }
      
          this.valid = this.c_stack-1;
      
          this.result = this.m_cache[this.c_stack];
      
          return this.result;
    }
    pushMatrix () {
        this.c_stack++;
        this.m_stack[this.c_stack] = this.getIdentity();
    }
    popMatrix () {
        if (this.c_stack === 0) { return; }
        this.c_stack--;
    }
    translateMatrix () {
        this.getIdentity()
    }
    translate (x,y) {
        this.translateMatrix[6] = x;
        this.translateMatrix[7] = y;
    
        mat3.multiply(this.translateMatrix, this.m_stack[this.c_stack]);
    
        /*
        if (this.valid === this.c_stack && this.c_stack) {
          this.valid--;
        }
        */
    }
    scaleMatrix () {
        this.getIdentity();
    }
    scale (x,y) {
        this.scaleMatrix[0] = x;
        this.scaleMatrix[4] = y;
    
        mat3.multiply(this.scaleMatrix, this.m_stack[this.c_stack]);
    
        /*
        if (this.valid === this.c_stack && this.c_stack) {
          this.valid--;
        }
        */
    }
    rotateMatrix () {
        this.getIdentity();
    }
    rotate (ang) {
        let sAng, cAng;
        
        sAng = Math.sin(-ang);
        cAng = Math.cos(-ang);
        
        this.rotateMatrix[0] = cAng;
        this.rotateMatrix[3] = sAng;
        this.rotateMatrix[1] = -sAng;
        this.rotateMatrix[4] = cAng;
        
        mat3.multiply(this.rotateMatrix, this.m_stack[this.c_stack]);
        
        /*
        if (this.valid === this.c_stack && this.c_stack) {
            this.valid--;
        }
        */
    }
}

export default Transform