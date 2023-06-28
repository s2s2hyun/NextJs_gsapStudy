const style = `
    font-family: Segoe UI;
    font-size: 100px;
    color: #FF0000;
    text-shadow: 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black;
`;
console.log("%c DONGHYUN", style);

// function logImage(url) {
//   const image = new Image();
//   image.onload = function () {
//     const style = `
//             font-size: 1px;
//             line-height: ${this.height}px;
//             padding: 0 ${this.width / 2}px;
//             background-size: ${this.width}px ${this.height}px;
//             background-repeat: no-repeat;
//             background-image: url(${url});
//         `;
//     console.log("%c WORLD!", style);
//   };
//   image.src = url;
// }

// logImage(
//   "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
// );
