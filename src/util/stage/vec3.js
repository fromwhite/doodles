const vec3 = {
    length: function(pt) {
        return Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
      },
  
      normalize: function(pt) {
        var d = Math.sqrt((pt[0] * pt[0]) + (pt[1] * pt[1]) + (pt[2] * pt[2]));
        if (d === 0) {
          return [0, 0, 0];
        }
        return [pt[0] / d, pt[1] / d, pt[2] / d];
      },
  
      dot: function(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
      },
  
      angle: function(v1, v2) {
        return Math.acos((v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) / (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]) * Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2])));
      },
  
      cross: function(vectA, vectB) {
        return [vectA[1] * vectB[2] - vectB[1] * vectA[2], vectA[2] * vectB[0] - vectB[2] * vectA[0], vectA[0] * vectB[1] - vectB[0] * vectA[1]];
      },
  
      multiply: function(vectA, constB) {
        return [vectA[0] * constB, vectA[1] * constB, vectA[2] * constB];
      },
  
      add: function(vectA, vectB) {
        return [vectA[0] + vectB[0], vectA[1] + vectB[1], vectA[2] + vectB[2]];
      },
  
      subtract: function(vectA, vectB) {
        return [vectA[0] - vectB[0], vectA[1] - vectB[1], vectA[2] - vectB[2]];
      },
  
      equal: function(a, b) {
        var epsilon = 0.0000001;
        if ((a === undefined) && (b === undefined)) {
          return true;
        }
        if ((a === undefined) || (b === undefined)) {
          return false;
        }
        return (Math.abs(a[0] - b[0]) < epsilon && Math.abs(a[1] - b[1]) < epsilon && Math.abs(a[2] - b[2]) < epsilon);
      }
}

export default vec3