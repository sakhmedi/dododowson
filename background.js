/* dododowson — animated monochrome smoke background
   Domain-warped fBm noise rendered in a WebGL fragment shader.
   Auto-loops like a video and reacts to the cursor (parallax).
   Falls back silently to the CSS body gradient if WebGL is unavailable. */
(function () {
  "use strict";

  var canvas = document.getElementById("bg");
  if (!canvas) return;

  var gl =
    canvas.getContext("webgl", { antialias: false, alpha: false }) ||
    canvas.getContext("experimental-webgl", { antialias: false, alpha: false });

  // No WebGL: hide canvas, let the CSS gradient on <body> show through.
  if (!gl) {
    canvas.style.display = "none";
    return;
  }

  var VERT = [
    "attribute vec2 a_pos;",
    "void main() {",
    "  gl_Position = vec4(a_pos, 0.0, 1.0);",
    "}"
  ].join("\n");

  var FRAG = [
    "precision highp float;",
    "uniform vec2 u_resolution;",
    "uniform vec2 u_mouse;",   // smoothed cursor, uv [0,1], y bottom-origin
    "",
    "float hash(vec2 p) {",
    "  p = fract(p * vec2(123.34, 456.21));",
    "  p += dot(p, p + 45.32);",
    "  return fract(p.x * p.y);",
    "}",
    "",
    "void main() {",
    "  vec2 uv = gl_FragCoord.xy / u_resolution.xy;",  // 0..1, y bottom-origin
    "  float aspect = u_resolution.x / u_resolution.y;",
    "",
    "  // faint static base gradient so the field is never fully black",
    "  float base = 0.05 + 0.05 * smoothstep(1.25, 0.0, length(uv - 0.5));",
    "",
    "  // soft circle of light centered on the cursor",
    "  vec2 d = uv - u_mouse; d.x *= aspect;",
    "  float light = pow(smoothstep(0.55, 0.0, length(d)), 1.5);",
    "",
    "  // dim monochrome: deep black -> soft grey (no pure white)",
    "  float lum = clamp(base + light * 0.5, 0.0, 0.6);",
    "  vec3 col = vec3(lum);",
    "",
    "  // vignette to sink the edges into black",
    "  float vig = smoothstep(1.3, 0.35, length(uv - 0.5));",
    "  col *= mix(0.55, 1.0, vig);",
    "  lum = col.r;",
    "",
    "  // static film grain, concentrated in the lit areas (smooth in shadow)",
    "  float g = hash(floor(gl_FragCoord.xy / 1.2)) - 0.5;",
    "  float grainAmt = 0.04 + 0.50 * smoothstep(0.04, 0.30, lum);",
    "  col += g * grainAmt;",
    "",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("dododowson shader error:", gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) {
    canvas.style.display = "none";
    return;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("dododowson link error:", gl.getProgramInfoLog(prog));
    canvas.style.display = "none";
    return;
  }
  gl.useProgram(prog);

  // full-screen quad (two triangles)
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );
  var aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, "u_resolution");
  var uMouse = gl.getUniformLocation(prog, "u_mouse");

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.floor(window.innerWidth * dpr);
    var h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  }
  window.addEventListener("resize", resize);
  resize();

  // cursor position in uv [0,1] (y bottom-origin), smoothed; centered by default
  var target = { x: 0.5, y: 0.5 };
  var current = { x: 0.5, y: 0.5 };
  window.addEventListener("pointermove", function (e) {
    target.x = e.clientX / window.innerWidth;
    target.y = 1 - e.clientY / window.innerHeight;
  });

  // The field is static; the loop runs only so the light glides toward the cursor.
  function frame() {
    current.x += (target.x - current.x) * 0.08;
    current.y += (target.y - current.y) * 0.08;

    gl.uniform2f(uMouse, current.x, current.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(frame);
  }
  frame(); // paint the first frame immediately (centered light), then keep tracking the cursor
})();
