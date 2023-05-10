const express =  require("express")
const app = express()


app.set('view engine', 'ejs');

app.use(express.json())  
app.use(express.urlencoded())
app.engine('html',require('ejs').renderFile)


// Define the key matrix
const keyMatrix = [[3, 3], [2, 5]];
const inverse = [[15,17],[20,9]];

function determinant(matrix) {
  return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
}

// console.log(inverseMatrix([[3,3],[2,5]]))


function hillCipherEncrypt(plaintext) {
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  if (plaintext.length % 2 !== 0) {
    plaintext += 'X';
  }
  
  let blocks = [];
  for (let i = 0; i < plaintext.length; i += 2) {
    blocks.push(plaintext.substr(i, 2));
  }
  // console.log(blocks)
  
  let ciphertext = '';
  blocks.forEach(block => {
    // console.log(block[0])
    
    let c1 = block.charCodeAt(0) -65; // A = 0, B = 1, etc.
    let c2 = block.charCodeAt(1) -65 ;
    // console.log(c1)
    // console.log(c2)

    let p1 = (keyMatrix[0][0] * c1 + keyMatrix[0][1] * c2) % 26;
    let p2 = (keyMatrix[1][0] * c1 + keyMatrix[1][1] * c2) % 26;
    // console.log("om")
    // console.log(p1)
    // console.log(p2)
    // console.log("shanti")

    ciphertext += String.fromCharCode(p1 + 65, p2 + 65);
  });
  
  return ciphertext;
}


function hillCipherDecrypt(ciphertext) {
  ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  let blocks = [];
  for (let i = 0; i < ciphertext.length; i += 2) {
    blocks.push(ciphertext.substr(i, 2));
  }
  
  
  
  console.log(blocks)
  
  let plaintext = '';
  blocks.forEach(block => {
    let c1 = block.charCodeAt(0) - 65; // A = 0, B = 1, etc.
    let c2 = block.charCodeAt(1) - 65;
    console.log(c1)
    console.log(c2)

    let p1 = (inverse[0][0] * c1 + inverse[0][1] * c2) % 26;
    let p2 = (inverse[1][0] * c1 + inverse[1][1] * c2) % 26;
    console.log("om")
    console.log(p1)
    console.log(p2)
    console.log("shanti")
    plaintext += String.fromCharCode(p1 + 65, p2 + 65);
  });
  
  if (plaintext.charAt(plaintext.length - 1) === 'X') {
    plaintext = plaintext.slice(0, plaintext.length - 1);
}

  return plaintext;
}


app.get('/', (req,res) =>{
    res.render('home.html', {oput: ""})
})

app.post('/', (req,res) => {
    // console.log(req.body)
    let ans = "Kool"
    if(req.body.mode === 'encrypt')
    {
        
        const plaintext = req.body.text.toUpperCase().replace(/[^A-Z]/g, '');
        const ciphertext = hillCipherEncrypt(plaintext);
        res.render('home.html',{oput: ciphertext });
    }
    else
    {
        const ciphertext = req.body.text.toUpperCase().replace(/[^A-Z]/g, '');
        const ans = hillCipherDecrypt(ciphertext);
        res.render('home.html',{oput: ans });
    }
})

let x = hillCipherEncrypt("help");
let y = hillCipherDecrypt(x);
console.log(x)
console.log(y)


app.listen(3000, function() {
    console.log(`Example app listening on port 3000`)
  })