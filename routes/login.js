const express = require('express')
const router = express.Router()
const mysql = require('mysql')
// const app = express('express')
const con = require("../keyDb/db")
const db = mysql.createConnection(con)

router.get('/login', (req, res) => {
  let body = req.body
  const sql = "select * from user"
  db.query(sql, (err, row) => {
    if(err) throw err

    res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="./loginPage.css">
      <title>Document</title>
    </head>
    <body>
      <div id="root">
        <!--? 각 모든 페이지가 공유하는 헤더 몇몇 필요없는 부분의 버튼을 제거하는것을 제외하고 값이 동일하다-->
        <header>
          <a class="logo" href="/">Way Home</a>
        </header>
        <main>
          <!--? 글과 이미지가 출력되는 위치 main테그안에 위치한다-->
          <section id="loginImgSector">
            <img src="istockphoto-508423060-170667a.jpg" alt="" id="loginImg">
          </section>
          <form action="/" method="post" id="loginTextSector">
            <div id="loginText">
              <input type="text" name="id" class="userInfo" placeholder="아이디">
              <input type="text" name="password" class="userInfo" placeholder="비밀번호">
              <input type="submit" id="submit" value="로그인"></input>
              <div id="pageMove">
                <a href="http://localhost:7777/idfind">
                  <div>아이디 찾기</div>
                </a>
                <a href="">
                  <div>비밀번호 찾기</div>
                </a>
                <a href="">
                  <div>회원 가입</div>
                </a>
              </div>
            </div>
          </form>
        </main>
      </div>
    </body>
    </html>`
    )
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    let a = row.map((element) => {
      if(body.id === element.id && body.password === element.password){
        res.write(`<script>alert("방문하신걸 환영합니다 ${element.name}님")</script>`)
        res.write(`<script>window.location=\"board\"</script>`)
      } else{
        res.write(`<script>alert("회원이 아니시거나 로그인 정보를 틀리셧습니다")</script>`)
        res.write(`<script>window.location=\"login\"</script>`)
      }
    })
  })
})

module.exports = router