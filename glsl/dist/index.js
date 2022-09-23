const m4 = {
  multiply: function (a, b, dst) {
    dst = dst || new Float32Array(16);
    let b00 = b[0 * 4 + 0];
    let b01 = b[0 * 4 + 1];
    let b02 = b[0 * 4 + 2];
    let b03 = b[0 * 4 + 3];
    let b10 = b[1 * 4 + 0];
    let b11 = b[1 * 4 + 1];
    let b12 = b[1 * 4 + 2];
    let b13 = b[1 * 4 + 3];
    let b20 = b[2 * 4 + 0];
    let b21 = b[2 * 4 + 1];
    let b22 = b[2 * 4 + 2];
    let b23 = b[2 * 4 + 3];
    let b30 = b[3 * 4 + 0];
    let b31 = b[3 * 4 + 1];
    let b32 = b[3 * 4 + 2];
    let b33 = b[3 * 4 + 3];
    let a00 = a[0 * 4 + 0];
    let a01 = a[0 * 4 + 1];
    let a02 = a[0 * 4 + 2];
    let a03 = a[0 * 4 + 3];
    let a10 = a[1 * 4 + 0];
    let a11 = a[1 * 4 + 1];
    let a12 = a[1 * 4 + 2];
    let a13 = a[1 * 4 + 3];
    let a20 = a[2 * 4 + 0];
    let a21 = a[2 * 4 + 1];
    let a22 = a[2 * 4 + 2];
    let a23 = a[2 * 4 + 3];
    let a30 = a[3 * 4 + 0];
    let a31 = a[3 * 4 + 1];
    let a32 = a[3 * 4 + 2];
    let a33 = a[3 * 4 + 3];
    dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return dst;
  },
  addVectors: function (a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    return dst;
  },
  subtractVectors: function (a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
  },
  normalize: function (v, dst) {
    dst = dst || new Float32Array(3);
    let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (length > 0.00001) {
      dst[0] = v[0] / length;
      dst[1] = v[1] / length;
      dst[2] = v[2] / length;
    }
    return dst;
  },
  cross: function (a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = a[2] * b[0] - a[0] * b[2];
    dst[2] = a[0] * b[1] - a[1] * b[0];
    return dst;
  },
  dot: function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
  distanceSq: function (a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
  },
  distance: function (a, b) {
    return Math.sqrt(distanceSq(a, b));
  },
  identity: function (dst) {
    dst = dst || new Float32Array(16);
    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },
  transpose: function (m, dst) {
    dst = dst || new Float32Array(16);
    dst[0] = m[0];
    dst[1] = m[4];
    dst[2] = m[8];
    dst[3] = m[12];
    dst[4] = m[1];
    dst[5] = m[5];
    dst[6] = m[9];
    dst[7] = m[13];
    dst[8] = m[2];
    dst[9] = m[6];
    dst[10] = m[10];
    dst[11] = m[14];
    dst[12] = m[3];
    dst[13] = m[7];
    dst[14] = m[11];
    dst[15] = m[15];

    return dst;
  },
  lookAt: function (cameraPosition, target, up, dst) {
    dst = dst || new Float32Array(16);
    let zAxis = normalize(subtractVectors(cameraPosition, target));
    let xAxis = normalize(cross(up, zAxis));
    let yAxis = normalize(cross(zAxis, xAxis));

    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = zAxis[0];
    dst[9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = cameraPosition[0];
    dst[13] = cameraPosition[1];
    dst[14] = cameraPosition[2];
    dst[15] = 1;

    return dst;
  },
  perspective: function (fieldOfViewInRadians, aspect, near, far, dst) {
    dst = dst || new Float32Array(16);
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    let rangeInv = 1.0 / (near - far);

    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (near + far) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far * rangeInv * 2;
    dst[15] = 0;

    return dst;
  },
  orthographic: function (left, right, bottom, top, near, far, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;
    dst[12] = (left + right) / (left - right);
    dst[13] = (bottom + top) / (bottom - top);
    dst[14] = (near + far) / (near - far);
    dst[15] = 1;

    return dst;
  },
  frustum: function (left, right, bottom, top, near, far) {
    let dx = right - left;
    let dy = top - bottom;
    let dz = far - near;

    dst[0] = (2 * near) / dx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = (2 * near) / dy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = (left + right) / dx;
    dst[9] = (top + bottom) / dy;
    dst[10] = -(far + near) / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = (-2 * near * far) / dz;
    dst[15] = 0;

    return dst;
  },
  translation: function (tx, ty, tz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = tx;
    dst[13] = ty;
    dst[14] = tz;
    dst[15] = 1;

    return dst;
  },
  translate: function (m, tx, ty, tz, dst) {
    dst = dst || new Float32Array(16);

    let m00 = m[0];
    let m01 = m[1];
    let m02 = m[2];
    let m03 = m[3];
    let m10 = m[1 * 4 + 0];
    let m11 = m[1 * 4 + 1];
    let m12 = m[1 * 4 + 2];
    let m13 = m[1 * 4 + 3];
    let m20 = m[2 * 4 + 0];
    let m21 = m[2 * 4 + 1];
    let m22 = m[2 * 4 + 2];
    let m23 = m[2 * 4 + 3];
    let m30 = m[3 * 4 + 0];
    let m31 = m[3 * 4 + 1];
    let m32 = m[3 * 4 + 2];
    let m33 = m[3 * 4 + 3];

    if (m !== dst) {
      dst[0] = m00;
      dst[1] = m01;
      dst[2] = m02;
      dst[3] = m03;
      dst[4] = m10;
      dst[5] = m11;
      dst[6] = m12;
      dst[7] = m13;
      dst[8] = m20;
      dst[9] = m21;
      dst[10] = m22;
      dst[11] = m23;
    }

    dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
    dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
    dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
    dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

    return dst;
  },
  xRotation: function (angleInRadians, dst) {
    dst = dst || new Float32Array(16);
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = c;
    dst[6] = s;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = -s;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },
  xRotate: function (m, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    let m10 = m[4];
    let m11 = m[5];
    let m12 = m[6];
    let m13 = m[7];
    let m20 = m[8];
    let m21 = m[9];
    let m22 = m[10];
    let m23 = m[11];
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    dst[4] = c * m10 + s * m20;
    dst[5] = c * m11 + s * m21;
    dst[6] = c * m12 + s * m22;
    dst[7] = c * m13 + s * m23;
    dst[8] = c * m20 - s * m10;
    dst[9] = c * m21 - s * m11;
    dst[10] = c * m22 - s * m12;
    dst[11] = c * m23 - s * m13;

    if (m !== dst) {
      dst[0] = m[0];
      dst[1] = m[1];
      dst[2] = m[2];
      dst[3] = m[3];
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },
  yRotation: function (angleInRadians, dst) {
    dst = dst || new Float32Array(16);
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    dst[0] = c;
    dst[1] = 0;
    dst[2] = -s;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = s;
    dst[9] = 0;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },
  yRotate: function (m, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    let m00 = m[0 * 4 + 0];
    let m01 = m[0 * 4 + 1];
    let m02 = m[0 * 4 + 2];
    let m03 = m[0 * 4 + 3];
    let m20 = m[2 * 4 + 0];
    let m21 = m[2 * 4 + 1];
    let m22 = m[2 * 4 + 2];
    let m23 = m[2 * 4 + 3];
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    dst[0] = c * m00 - s * m20;
    dst[1] = c * m01 - s * m21;
    dst[2] = c * m02 - s * m22;
    dst[3] = c * m03 - s * m23;
    dst[8] = c * m20 + s * m00;
    dst[9] = c * m21 + s * m01;
    dst[10] = c * m22 + s * m02;
    dst[11] = c * m23 + s * m03;

    if (m !== dst) {
      dst[4] = m[4];
      dst[5] = m[5];
      dst[6] = m[6];
      dst[7] = m[7];
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },
  zRotation: function (angleInRadians, dst) {
    dst = dst || new Float32Array(16);
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },
  zRotate: function (m, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    let m00 = m[0 * 4 + 0];
    let m01 = m[0 * 4 + 1];
    let m02 = m[0 * 4 + 2];
    let m03 = m[0 * 4 + 3];
    let m10 = m[1 * 4 + 0];
    let m11 = m[1 * 4 + 1];
    let m12 = m[1 * 4 + 2];
    let m13 = m[1 * 4 + 3];
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;

    if (m !== dst) {
      dst[8] = m[8];
      dst[9] = m[9];
      dst[10] = m[10];
      dst[11] = m[11];
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },
  axisRotation: function (axis, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    let n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    let xx = x * x;
    let yy = y * y;
    let zz = z * z;
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);
    let oneMinusCosine = 1 - c;

    dst[0] = xx + (1 - xx) * c;
    dst[1] = x * y * oneMinusCosine + z * s;
    dst[2] = x * z * oneMinusCosine - y * s;
    dst[3] = 0;
    dst[4] = x * y * oneMinusCosine - z * s;
    dst[5] = yy + (1 - yy) * c;
    dst[6] = y * z * oneMinusCosine + x * s;
    dst[7] = 0;
    dst[8] = x * z * oneMinusCosine + y * s;
    dst[9] = y * z * oneMinusCosine - x * s;
    dst[10] = zz + (1 - zz) * c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },
  axisRotate: function (m, axis, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    let x = axis[0];
    let y = axis[1];
    let z = axis[2];
    let n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    let xx = x * x;
    let yy = y * y;
    let zz = z * z;
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);
    let oneMinusCosine = 1 - c;

    let r00 = xx + (1 - xx) * c;
    let r01 = x * y * oneMinusCosine + z * s;
    let r02 = x * z * oneMinusCosine - y * s;
    let r10 = x * y * oneMinusCosine - z * s;
    let r11 = yy + (1 - yy) * c;
    let r12 = y * z * oneMinusCosine + x * s;
    let r20 = x * z * oneMinusCosine + y * s;
    let r21 = y * z * oneMinusCosine - x * s;
    let r22 = zz + (1 - zz) * c;

    let m00 = m[0];
    let m01 = m[1];
    let m02 = m[2];
    let m03 = m[3];
    let m10 = m[4];
    let m11 = m[5];
    let m12 = m[6];
    let m13 = m[7];
    let m20 = m[8];
    let m21 = m[9];
    let m22 = m[10];
    let m23 = m[11];

    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

    if (m !== dst) {
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },
  scaling: function (sx, sy, sz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = sx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = sy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = sz;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },
  scale: function (m, sx, sy, sz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = sx * m[0 * 4 + 0];
    dst[1] = sx * m[0 * 4 + 1];
    dst[2] = sx * m[0 * 4 + 2];
    dst[3] = sx * m[0 * 4 + 3];
    dst[4] = sy * m[1 * 4 + 0];
    dst[5] = sy * m[1 * 4 + 1];
    dst[6] = sy * m[1 * 4 + 2];
    dst[7] = sy * m[1 * 4 + 3];
    dst[8] = sz * m[2 * 4 + 0];
    dst[9] = sz * m[2 * 4 + 1];
    dst[10] = sz * m[2 * 4 + 2];
    dst[11] = sz * m[2 * 4 + 3];

    if (m !== dst) {
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },
  inverse: function (m, dst) {
    dst = dst || new Float32Array(16);
    let m00 = m[0 * 4 + 0];
    let m01 = m[0 * 4 + 1];
    let m02 = m[0 * 4 + 2];
    let m03 = m[0 * 4 + 3];
    let m10 = m[1 * 4 + 0];
    let m11 = m[1 * 4 + 1];
    let m12 = m[1 * 4 + 2];
    let m13 = m[1 * 4 + 3];
    let m20 = m[2 * 4 + 0];
    let m21 = m[2 * 4 + 1];
    let m22 = m[2 * 4 + 2];
    let m23 = m[2 * 4 + 3];
    let m30 = m[3 * 4 + 0];
    let m31 = m[3 * 4 + 1];
    let m32 = m[3 * 4 + 2];
    let m33 = m[3 * 4 + 3];
    let tmp_0 = m22 * m33;
    let tmp_1 = m32 * m23;
    let tmp_2 = m12 * m33;
    let tmp_3 = m32 * m13;
    let tmp_4 = m12 * m23;
    let tmp_5 = m22 * m13;
    let tmp_6 = m02 * m33;
    let tmp_7 = m32 * m03;
    let tmp_8 = m02 * m23;
    let tmp_9 = m22 * m03;
    let tmp_10 = m02 * m13;
    let tmp_11 = m12 * m03;
    let tmp_12 = m20 * m31;
    let tmp_13 = m30 * m21;
    let tmp_14 = m10 * m31;
    let tmp_15 = m30 * m11;
    let tmp_16 = m10 * m21;
    let tmp_17 = m20 * m11;
    let tmp_18 = m00 * m31;
    let tmp_19 = m30 * m01;
    let tmp_20 = m00 * m21;
    let tmp_21 = m20 * m01;
    let tmp_22 = m00 * m11;
    let tmp_23 = m10 * m01;

    let t0 =
      tmp_0 * m11 +
      tmp_3 * m21 +
      tmp_4 * m31 -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    let t1 =
      tmp_1 * m01 +
      tmp_6 * m21 +
      tmp_9 * m31 -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    let t2 =
      tmp_2 * m01 +
      tmp_7 * m11 +
      tmp_10 * m31 -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    let t3 =
      tmp_5 * m01 +
      tmp_8 * m11 +
      tmp_11 * m21 -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] =
      d *
      (tmp_1 * m10 +
        tmp_2 * m20 +
        tmp_5 * m30 -
        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] =
      d *
      (tmp_0 * m00 +
        tmp_7 * m20 +
        tmp_8 * m30 -
        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] =
      d *
      (tmp_3 * m00 +
        tmp_6 * m10 +
        tmp_11 * m30 -
        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] =
      d *
      (tmp_4 * m00 +
        tmp_9 * m10 +
        tmp_10 * m20 -
        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] =
      d *
      (tmp_12 * m13 +
        tmp_15 * m23 +
        tmp_16 * m33 -
        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] =
      d *
      (tmp_13 * m03 +
        tmp_18 * m23 +
        tmp_21 * m33 -
        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] =
      d *
      (tmp_14 * m03 +
        tmp_19 * m13 +
        tmp_22 * m33 -
        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] =
      d *
      (tmp_17 * m03 +
        tmp_20 * m13 +
        tmp_23 * m23 -
        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] =
      d *
      (tmp_14 * m22 +
        tmp_17 * m32 +
        tmp_13 * m12 -
        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] =
      d *
      (tmp_20 * m32 +
        tmp_12 * m02 +
        tmp_19 * m22 -
        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] =
      d *
      (tmp_18 * m12 +
        tmp_23 * m32 +
        tmp_15 * m02 -
        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] =
      d *
      (tmp_22 * m22 +
        tmp_16 * m02 +
        tmp_21 * m12 -
        (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

    return dst;
  },
  transformVector: function (m, v, dst) {
    dst = dst || new Float32Array(4);
    for (var i = 0; i < 4; ++i) {
      dst[i] = 0.0;
      for (var j = 0; j < 4; ++j) {
        dst[i] += v[j] * m[j * 4 + i];
      }
    }
    return dst;
  },
  transformPoint: function (m, v, dst) {
    dst = dst || new Float32Array(3);
    let v0 = v[0];
    let v1 = v[1];
    let v2 = v[2];
    let d =
      v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

    dst[0] =
      (v0 * m[0 * 4 + 0] +
        v1 * m[1 * 4 + 0] +
        v2 * m[2 * 4 + 0] +
        m[3 * 4 + 0]) /
      d;
    dst[1] =
      (v0 * m[0 * 4 + 1] +
        v1 * m[1 * 4 + 1] +
        v2 * m[2 * 4 + 1] +
        m[3 * 4 + 1]) /
      d;
    dst[2] =
      (v0 * m[0 * 4 + 2] +
        v1 * m[1 * 4 + 2] +
        v2 * m[2 * 4 + 2] +
        m[3 * 4 + 2]) /
      d;

    return dst;
  },
  transformDirection: function (m, v, dst) {
    dst = dst || new Float32Array(3);

    let v0 = v[0];
    let v1 = v[1];
    let v2 = v[2];

    dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

    return dst;
  },
  transformNormal: function (m, v, dst) {
    dst = dst || new Float32Array(3);
    let mi = inverse(m);
    let v0 = v[0];
    let v1 = v[1];
    let v2 = v[2];

    dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
    dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
    dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

    return dst;
  },
  copy: function (src, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    dst[4] = src[4];
    dst[5] = src[5];
    dst[6] = src[6];
    dst[7] = src[7];
    dst[8] = src[8];
    dst[9] = src[9];
    dst[10] = src[10];
    dst[11] = src[11];
    dst[12] = src[12];
    dst[13] = src[13];
    dst[14] = src[14];
    dst[15] = src[15];

    return dst;
  },
};

class Transform {
  constructor() {
    this.stack = [];
    this.restore();
  }

  restore() {
    this.stack.pop();
    if (this.stack.length < 1) {
      this.stack[0] = m4.identity();
    }
  }
  save() {
    this.stack.push(this.getCurrentMatrix());
  }
  getCurrentMatrix() {
    return this.stack[this.stack.length - 1].slice();
  }
  setCurrentMatrix() {
    return (this.stack[this.stack.length - 1] = m);
  }
  translate(x, y, z = 0) {
    let m = this.getCurrentMatrix();
    this.setCurrentMatrix(m4.translate(m, x, y, z));
  }
  rotateZ(angleInRadians) {
    let m = this.getCurrentMatrix();
    this.setCurrentMatrix(m4.zRotate(m, angleInRadians));
  }
  scale(x, y, z = 1) {
    let m = this.getCurrentMatrix();
    this.setCurrentMatrix(m4.scale(m, x, y, z));
  }
}

class Gl2d {
  constructor(canvas, [width, height]) {
    this.canvas = canvas;
    this.gl = undefined;
    this.transform = new Transform();
    this._resources = new Map();
    this.init([width, height]);
  }
  init([width, height]) {
    // default
    this.canvas.oncontextmenu = function () {
      return false;
    };
    // dpr
    this.dpr = window.devicePixelRatio || 1;
    if (!!width && !!height) {
      // 入参 宽高
      this._width = width;
      this._height = height;
    } else {
      // 没有传入宽高 取父节点宽高初始化
      this._width = this.canvas.parentNode.clientWidth;
      this._height = this.canvas.parentNode.clientHeight;
    }
    this.width = this.dpr * this._width;
    this.height = this.dpr * this._height;
    this.canvas.style.width = `${this._width}px`;
    this.canvas.style.height = `${this._height}px`;
    this.canvas.width = ~~this.width;
    this.canvas.height = ~~this.height;

    this.gl =
      this.canvas.getContext("webgl") ||
      this.canvas.getContext("experimental-webgl");
    let gl = this.gl;

    if (!gl) throw new Error("cannot get gl context!");

    let program = this.createProgram(gl);
    this.positionLocation = gl.getAttribLocation(program, "a_position");
    this.texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

    this.matrixLocation = gl.getUniformLocation(program, "u_matrix");
    this.textureMatrixLocation = gl.getUniformLocation(
      program,
      "u_textureMatrix"
    );

    gl.getUniformLocation(program, "u_texture");

    // Create a buffer
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    this.positionBuffer = positionBuffer;
    // Put a unit quad in the buffer
    let positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a buffer for texture coords
    let texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    this.texcoordBuffer = texcoordBuffer;

    // Put texcoords in the buffer
    let texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

    // gl.tex = this.loadTexture.bind(this,arguments); gl.draw =
    // this.drawImage.bind(this,arguments); gl.draw = function (){     drawImage }
  }
  viewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  getFragmentShaderSource() {
    let source = `precision mediump float;
        
        varying vec2 v_texcoord;
        
        uniform sampler2D u_texture;
        
        void main() {
           gl_FragColor = texture2D(u_texture, v_texcoord);
        }`;
    return source;
  }
  getVertexShaderSource() {
    let source = `attribute vec4 a_position;
        attribute vec2 a_texcoord;
        
        uniform mat4 u_matrix;
        uniform mat4 u_textureMatrix;
        
        varying vec2 v_texcoord;
        
        void main() {
           gl_Position = u_matrix * a_position;
           v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
        }`;
    return source;
  }
  getFragmentShader(gl) {
    return this.getShader(
      gl,
      gl.FRAGMENT_SHADER,
      this.getFragmentShaderSource()
    );
  }
  getVertexShader(gl) {
    return this.getShader(gl, gl.VERTEX_SHADER, this.getVertexShaderSource());
  }
  getShader(gl, type, source) {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }
  createProgram(gl) {
    let fragmentShader = this.getFragmentShader(gl);
    let vertexShader = this.getVertexShader(gl);
    let shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    let lineStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!lineStatus) {
      console.log(
        "Could not initialise shaders:" + gl.getProgramInfoLog(shaderProgram)
      );
    }

    gl.useProgram(shaderProgram);
    return shaderProgram;
  }
  loadTexture(url, timeout = 30000) {
    if (typeof url !== "string") throw new Error("loadTexture faild");
    let loadedTex = this._resources;
    const mapKey = url;

    if (!loadedTex.has(mapKey)) {
      return new Promise((resolve, reject) => {
        let gl = this.gl;
        let tex = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, tex);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          1,
          1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          new Uint8Array([0, 0, 255, 255])
        );
        // let's assume all images are not a power of 2
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        let textureInfo = {
          width: 1,
          height: 1,
          texture: tex,
        };
        const timer = setTimeout(() => {
          reject(new Error("loadTexture timeout"));
        }, timeout);
        let img = new Image();
        img.addEventListener("load", function () {
          textureInfo.width = img.width;
          textureInfo.height = img.height;

          gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img
          );

          resolve(textureInfo);
          loadedTex.set(mapKey, textureInfo);
          clearTimeout(timer);
        });
        img.src = url;
      });
    }
  }
  async loadTex(resources) {
    if (typeof resources === "string") {
      return await this.loadTexture(resources);
    }
    if (Array.isArray(resources)) {
      const ret = [];
      for (let i = 0; i < resources.length; i++) {
        const res = resources[i];
        if (typeof res === "string") {
          ret.push(await this.loadTexture(res));
        } else {
          throw new Error(`loadTexs faild in progress:${i}`);
        }
      }
      return ret;
    }
  }
  drawImage(
    tex,
    texWidth,
    texHeight,
    srcX,
    srcY,
    srcWidth,
    srcHeight,
    dstX,
    dstY,
    dstWidth,
    dstHeight,
    srcRotation
  ) {
    let gl = this.gl;
    if (dstX === undefined) {
      dstX = srcX;
      srcX = 0;
    }
    if (dstY === undefined) {
      dstY = srcY;
      srcY = 0;
    }
    if (srcWidth === undefined) {
      srcWidth = texWidth;
    }
    if (srcHeight === undefined) {
      srcHeight = texHeight;
    }
    if (dstWidth === undefined) {
      dstWidth = srcWidth;
      srcWidth = texWidth;
    }
    if (dstHeight === undefined) {
      dstHeight = srcHeight;
      srcHeight = texHeight;
    }
    if (srcRotation === undefined) {
      srcRotation = 0;
    }

    gl.bindTexture(gl.TEXTURE_2D, tex);
    //gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.enableVertexAttribArray(this.texcoordLocation);
    gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    let matrix = m4.orthographic(
      0,
      gl.canvas.width,
      gl.canvas.height,
      0,
      -1,
      1
    );
    matrix = m4.translate(matrix, dstX, dstY, 0);
    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

    gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

    let texMatrix = m4.scaling(1 / texWidth, 1 / texHeight, 1);

    texMatrix = m4.translate(texMatrix, texWidth * 0.5, texHeight * 0.5, 0);
    texMatrix = m4.zRotate(texMatrix, srcRotation);
    texMatrix = m4.translate(texMatrix, texWidth * -0.5, texHeight * -0.5, 0);

    texMatrix = m4.translate(texMatrix, srcX, srcY, 0);
    texMatrix = m4.scale(texMatrix, srcWidth, srcHeight, 1);

    gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);

    gl.uniform1i(this.textureLocation, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

const gl2d = function (...args) {
  return new Gl2d(...args);
};

/*
 *   create by vincent 31 Dec 2016
 */
const requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    window.Timer = () => setTimeout(callback, 1000 / 60);
  };

const cancelAnimationFrame =
  window.cancelAnimationFrame || clearTimeout(window.Timer);

class Event {
  constructor() {
    this.subscribers = new Map([["any", []]]);
  }

  on(type = "any", fn) {
    let subs = this.subscribers;
    if (!subs.get(type)) return subs.set(type, [fn]);
    subs.set(type, [...subs.get(type), fn]);
  }

  emit(type = "any", ...content) {
    let handlers = this.subscribers.get(type);
    if (!handlers) return console.log(`%c⚡ ${type}`, `color:#f4696b`);
    for (let fn of handlers) {
      fn.apply(this, content);
    }
  }

  off(type = "any", fn = "any") {
    type == "any"
      ? this.subscribers.set("any", [])
      : fn == "any"
      ? this.subscribers.delete(type)
      : this.subscribers.set(type, [
          ...this.subscribers.get(type).filter((item) => item !== fn),
        ]);
  }

  once(...args) {
    this.emit(...args);
    this.off(...args);
  }
}

class _Shape extends Event {
  constructor(resources, options) {
    super();
    this.texture = resources.texture || null;
    this.rect = null;
    this.width = resources.width || null;
    this.height = resources.height || null;
    this.events = new Set();
    Object.assign(this, options);
  }

  on(type = "any", fn) {
    this.events.add(type);
    super.on(type, fn);
  }

  off(type = "any", fn = "any") {
    this.event.delete(type);
    super.off(type, fn);
  }

  _draw(painter, ...args) {
    !!this.draw && this.draw.apply(painter, args);
  }

  _update(...args) {
    !!this.update && this.update(...args);
  }
}

const Shape = {
  create: function (...args) {
    return new _Shape(...args);
  },
};

class _Stage extends Event {
  constructor(element, options) {
    super();

    this.element = element || null;
    this.context = null;
    this._shadow = null;
    this._context = null;
    this.events = new Set();
    this.shapes = new Set();

    this.then = 0;
    this.tick = null;
    this.statu = null;
    this.init(options);
  }

  init(options) {
    if (!this.element || this.element.nodeName !== "CANVAS") {
      let c = document.createElement("canvas");
      c.id = "canvas";
      c.oncontextmenu = function () {
        return false;
      };
      if (!this.element) {
        document.body.appendChild(c);
      }
      if (this.element && this.element.nodeName !== "CANVAS") {
        this.element.appendChild(c);
      }
      this.element = c;
    }

    Object.assign(this, options);
    this.context = gl2d(this.element, [this.width, this.height]);

    this.dpr = this.context.dpr;

    // this._shadow = document.createElement("canvas");
    // this._shadow.width = this.context.width / 10;
    // this._shadow.height = this.context.height / 10;
    // this._context = this._shadow.getContext("2d");

    // default events
    const events = [
      "mousedown",
      "mouseup",
      "mousemove",
      "mousewheel",
      "click",
      "dblclick",
      "touchstart",
      "touchend",
      "touchmove",
    ];
    events.forEach((event) => {
      this.element.addEventListener(
        event,
        (e) => {
          const { left, top } = e.target.getBoundingClientRect();
          let originalX, originalY;
          const evtArgs = {
            originalEvent: e,
            type: event,
          };
          if (e.changedTouches) {
            const { clientX, clientY } = e.changedTouches[0];

            originalX = Math.round(clientX - left);
            originalY = Math.round(clientY - top);
          } else {
            originalX = Math.round(e.clientX - left);
            originalY = Math.round(e.clientY - top);
          }
          let x, y;
          x = this.dp(originalX);
          y = this.dp(originalY);
          Object.assign(evtArgs, { originalX, originalY }, { x, y });

          // stage handler
          if (this.events.has(event)) {
            this.emit(event, evtArgs);
          }

          // shape handler
          this.shapes.forEach((shape) => {
            for (let item of shape.events.keys()) {
              item == event
                ? this.isInside(shape, { x, y })
                  ? this.emit.apply(shape, [event, evtArgs])
                  : 0
                : 0;
            }
          });
        },
        true
      );
    });
  }

  dp(px) {
    return ~~px * this.dpr;
  }

  //Function to check whether a point is inside a rectangle
  isInside(shape, pos) {
    return (
      pos.x > shape.rect.x &&
      pos.x < shape.rect.x + shape.rect.width &&
      pos.y < shape.rect.y + shape.rect.height &&
      pos.y > shape.rect.y
    );
  }

  // add event
  on(type = "any", fn) {
    this.events.add(type);
    super.on(type, fn);
  }

  off(type = "any", fn = "any") {
    this.event.delete(type);
    super.off(type, fn);
  }

  // add shape
  add(shape) {
    this.shapes.add(shape);
    this.shapes.size > 0 ? (this.statu != "LOOP" ? this.loop() : 0) : 0;
  }

  remove(shape) {
    this.shapes.delete(shape);
    this.shapes.size == 0 ? (this.statu != "END" ? this.end() : 0) : 0;
  }

  _draw(deltaTime) {
    // this.shapes.forEach(item => {
    //     item._draw.apply(context, args);
    // });
    !!this.draw && this.draw(deltaTime);
  }

  _update(...args) {
    this.shapes.forEach((item) => {
      item._update(...args);
    });
    !!this.update && this.update(...args);
  }

  render(time) {
    let now = time * 0.001;
    let then = this.then || 0;
    let deltaTime = Math.min(0.1, now - then);
    this.then = now;
    this._update(deltaTime);
    this._draw(deltaTime);
    this.tick = requestAnimationFrame((time) => this.render(time));
  }
  loop() {
    if (this.statu != "LOOP") this.statu = "LOOP";
    requestAnimationFrame((time) => this.render(time));
  }
  end() {
    if (this.statu != "END") this.statu = "END";
    cancelAnimationFrame(this.tick);
    this.then = 0;
    this.context.clear();
    this.shapes.clear();
    this.events.clear();
  }
  pause() {
    if (this.statu != "PAUSE") this.statu = "PAUSE";
    !!this.tick && cancelAnimationFrame(this.tick);
  }
}

const Stage = {
  create: function (...args) {
    return new _Stage(...args);
  },
};

export { Shape, Stage, gl2d };
