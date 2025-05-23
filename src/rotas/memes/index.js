import client from "../../main.js";
import { WebhookClient, EmbedBuilder, ApplicationFlagsBitField } from "discord.js";

const userRoute2 = (req, res) => {
  const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTo7bKomp-1j5cRHPcoXejzhnS_GDsZVu1jkg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1LJMKjaa5RYPlJheNuZGnO5Hx4C1ZQlOoQg&usqp=CAU",
    "https://static.imgs.app/content/assetz/uploads/2017/04/atena-golpista-facebook-melhores-memes-62.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSikJtprG1gNxHz422-NxF5V6afNKJHkILRXg&usqp=CAU",
    "https://pm1.narvii.com/7368/901974603479ab884f7f95ab9d94ee7e65ccdf82r1-493-575v2_hq.jpg",
    "https://gerarmemes.s3.us-east-2.amazonaws.com/memes/3b6d227e.jpg",
    "https://i.pinimg.com/236x/44/9a/34/449a343fda667d09b92d8eaf170e7473.jpg",
    "https://gerarmemes.s3.us-east-2.amazonaws.com/memes/f5586e69.jpg",
    "https://midiamax.uol.com.br/media/uploads/legacy/2019/12/images-4.jpg",
    "https://imageproxy.ifunny.co/crop:x-20,resize:640x,quality:90x75/images/0deedf902a76c1faf63e0eed362f72fb59552e37603888f3c0da5d496a6f7e1a_1.jpg",
    "https://media.discordapp.net/attachments/873318637736427540/906244456376827965/Screenshot_20210731-225319.png",
    "https://c.tenor.com/690jBcTy_1MAAAAd/adm-kilbin.gif",
    "https://c.tenor.com/3JvUyg2YdsAAAAAd/lsd-doidao.gif",
    "https://i.imgur.com/6aTE3HN.jpg",
    "https://i.imgur.com/uS6KihF.jpg",
    "https://i.imgur.com/UldDsJH.jpg",
    "https://i.imgur.com/sU2jHZR.jpg",
    "https://i.imgur.com/fZ7gqcy.jpg",
    "https://i.imgur.com/goQtse9.jpg",
    "https://i.imgur.com/qBbcYV9.jpg",
    "https://i.imgur.com/pMeHnG2.jpg",
    "https://i.imgur.com/yT9tIgb.jpg",
    "https://i.imgur.com/TObrJ5w.jpg",
    "https://i.imgur.com/eX4IZt5.jpg",
    "https://i.imgur.com/hNX7xMr.jpg",
    "https://i.imgur.com/oy4R8yy.jpg",
    "https://i.imgur.com/tsjWQ4K.jpg",
    "https://i.imgur.com/wzqC1vh.jpg",
    "https://i.imgur.com/znVYWWp.jpg",
    "https://i.imgur.com/CjSDRBL.jpg",
    "https://i.imgur.com/HsiQdBQ.jpg",
    "https://i.imgur.com/c2lfu7J.jpg",
    "https://i.imgur.com/KROafYJ.jpg",
    "https://i.imgur.com/y9u8lYz.jpg",
    "https://i.imgur.com/8nNUaW7.jpg",
    "https://i.imgur.com/jADpOmu.jpg",
    "https://i.imgur.com/cvLl81U.jpg",
    "https://i.imgur.com/tuzdq5H.jpg",
    "https://i.imgur.com/MZ8lhCq.png",
    "https://i.imgur.com/MFGzpFq.jpeg",
    "https://i.imgur.com/LGFo3ZB.jpeg",
    "https://i.imgur.com/p3hAf3b.jpeg",
    "https://i.imgur.com/Z1NNuCt.jpeg",
    "https://i.imgur.com/LvaWUQz.jpeg",
    "https://i.imgur.com/2c9kAiG.jpeg",
    "https://i.imgur.com/JL6vHIF.jpeg",
    "https://i.imgur.com/L7h1fMH.jpeg",
    "https://i.imgur.com/9ZRs5rd.jpeg",
    "https://i.imgur.com/RnlS73H.jpeg",
    "https://i.imgur.com/euCJbIr.jpeg",
    "https://i.imgur.com/4kdAYa6.jpeg",
    "https://i.imgur.com/z9fCZLC.jpeg",
    "https://i.imgur.com/VHhj88w.jpeg",
    "https://i.imgur.com/2E6rDQD.jpeg",
    "https://i.imgur.com/LnV0cde.jpeg",
    "https://i.imgur.com/8EBYV8A.png",
    "https://i.imgur.com/jl0w2CL.png",
    "https://i.imgur.com/66UnPvQ.png",
    "https://i.imgur.com/e08Xqnu.png",
    "https://i.imgur.com/ITX6aIs.png",
    "https://i.imgur.com/kgFuNNa.png",
    "https://i.imgur.com/qTMkrdd.png",
    "https://diariodorio.com/wp-content/uploads/2018/06/59e3ef2bcb788-1.jpeg",
    "https://i.pinimg.com/550x/f8/b4/c6/f8b4c60c68605826ea2993ee899031aa.jpg",
    "https://img.wattpad.com/ce03e90a65351f1292ecb323f87efc720ed207f3/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4d6b6d4543394c534f6d534f63413d3d2d3131332e313532303332386532656236353163633138373130373530363736352e6a7067?s=fit&w=720&h=720",
    "https://images3.memedroid.com/images/UPLOADED767/61368e69af653.jpeg",
    "https://i.pinimg.com/736x/04/f7/89/04f789f6bfeb1c44381354fcfa6c58a4.jpg",
    "https://i.pinimg.com/564x/ca/56/ab/ca56abc64e940443d46e00af4ed1deda.jpg",
    "https://diariodorio.com/wp-content/uploads/2018/12/calor10.jpeg",
    "https://img.r7.com/images/2016/07/28/19o24w3cv4_1umqyrmugo_file?dimensions=771x420&no_crop=true",
    "https://images7.memedroid.com/images/UPLOADED476/5dbf67fe9caef.jpeg",
    "https://static.imgs.app/content/assetz/uploads/2019/04/33-memes-brasileiros-adorei-melhores-memes-kkk-colecao-1708.png",
    "http://images7.memedroid.com/images/UPLOADED625/59c3c717abfcd.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUk68Ji82MJGaO-LoEV_ViLZQClapoEF0hQ&usqp=CAU",
    "https://img.ifunny.co/images/738d092cc35773f63a06753f66e5d9afdf8b87a893b3d946aa2be134cc9598ad_1.jpg",
    "https://pm1.narvii.com/6423/b52a72f75b60cb171ea4bd8dfc724fae714c6d9d_hq.jpg",
    "https://ahseeit.com/portuguese/king-include/uploads/2021/03/128613694_405742344111047_2962075510020036691_n-6920947699.jpg",
    "https://i.ytimg.com/vi/ZiJfSp9VYjA/maxresdefault.jpg",
    "https://img.wattpad.com/d1a9ced1e66eca88fdddbc01eb271f7f3160cc35/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f67345767614f6372372d477435513d3d2d3132302e313532313539363366626535343264623931343831323236353337352e6a7067?s=fit&w=720&h=720",
    "https://pm1.narvii.com/6575/32b9afad7d3366b40f76dac1158acabfcc6e40a2_hq.jpg",
    "https://pics.me.me/quando-vc-mora-no-rio-grande-do-sul-e-tem-15697713.png",
    "https://pbs.twimg.com/media/DsDRhksWsAEln8j.jpg",
    "https://i.imgur.com/rTcRxBx.jpg",
    "https://i.imgur.com/uDOO5do.jpg",
    "https://i.imgur.com/XymX2lM.jpg",
    "https://i.imgur.com/RNrfEMC.jpg",
    "https://i.imgur.com/ujELTJk.jpg",
    "https://i.imgur.com/NCYtdqR.jpg",
    "https://i.imgur.com/9xiHlNl.jpg",
    "https://i.imgur.com/IcRWICN.jpg",
    "https://i.imgur.com/cOOgDkG.jpg",
    "https://i.imgur.com/6vhfrfq.jpg",
    "https://i.imgur.com/9BQ8vh4.jpg",
    "https://i.imgur.com/JFQ8GEk.jpg",
    "https://i.imgur.com/fYjJLNB.jpg",
    "https://i.imgur.com/d6MPnBD.jpg",
    "https://i.imgur.com/KJv5qRi.jpg",
    "https://i.imgur.com/ErOO19F.jpg",
    "https://i.imgur.com/nZhoU74.jpg",
    "https://i.imgur.com/jUFqUPC.jpg",
    "https://i.imgur.com/iKKlUsa.gif",
    "https://i.imgur.com/SVQDXeM.jpg",
    "https://i.imgur.com/yADETzY.jpg",
    "https://i.imgur.com/jfKMVXW.jpg",
    "https://i.imgur.com/bQxt2VQ.jpg",
    "https://i.imgur.com/6NWeGyr.jpg",
    "https://i.imgur.com/mC7bMUz.jpg",
    "https://i.imgur.com/Tk1TjcF.jpg",
    "https://i.imgur.com/pJVSIY7.jpg",
    "https://i.imgur.com/VEwYhDY.jpg",
    "https://i.imgur.com/ONTDkr8.jpg",
    "https://i.imgur.com/EbJ4TpA.jpg",
    "https://i.imgur.com/e7XF6Xg.jpg",
    "https://i.imgur.com/kCe6bWn.jpg",
    "https://i.imgur.com/q6QXhLK.jpg",
    "https://i.imgur.com/5LqiXA1.jpg",
    "https://i.imgur.com/Ka3Ax6E.jpg",
    "https://i.imgur.com/FuAAOI5.jpg",
    "https://i.imgur.com/AXxSUKH.jpg",
    "https://i.imgur.com/WqH0T6u.jpg",
    "https://i.imgur.com/8fRFO7e.jpg",
    "https://i.imgur.com/W6GqbkH.jpg",
    "https://i.imgur.com/xhHAUT6.jpg",
    "https://i.imgur.com/xtSPEQd.jpg",
    "https://i.imgur.com/nLmInQh.jpg",
    "https://i.imgur.com/7dckIDF.jpg",
    "https://i.imgur.com/3M0qkVc.jpg",
    "https://i.imgur.com/Iju4uiV.jpg",
    "https://i.imgur.com/T7LMZmd.jpg",
    "https://i.imgur.com/vNSSuhX.jpg",
    "https://i.imgur.com/PZmYbfY.jpg",
    "https://i.imgur.com/zJuX0ey.jpg",
    "https://i.imgur.com/xRMeBS2.jpg",
    "https://i.imgur.com/HYbFX7B.jpg",
    "https://i.imgur.com/kDx2ijr.jpg",
    "https://i.imgur.com/Ip31i67.jpg",
    "https://i.imgur.com/oMG7MK3.jpg",
    "https://i.imgur.com/CytLqxr.jpg",
    "https://i.imgur.com/TuQZ3BT.jpg",
    "https://i.imgur.com/MGNZPDD.jpg",
    "https://i.imgur.com/tmJkd0l.jpg",
    "https://i.imgur.com/DxVZhg9.jpg",
    "https://i.imgur.com/X2He4Mg.jpg",
    "https://i.imgur.com/4cMbstC.jpg",
    "https://i.imgur.com/MURYaDv.jpg",
    "https://i.imgur.com/uTx5lvV.jpg",
    "https://i.imgur.com/RpFRvZ6.jpg",
    "https://i.imgur.com/8Tmechz.jpg",
    "https://i.imgur.com/rjPrI4A.jpg",
    "https://i.imgur.com/aahwHq9.jpg",
    "https://i.imgur.com/Hfhe6UW.jpg",
    "https://i.imgur.com/D82GmNe.jpg",
    "https://i.imgur.com/yRICgGI.jpg",
    "https://i.imgur.com/laJYlyd.jpg",
    "https://i.imgur.com/DdaZEFY.jpg",
    "https://i.imgur.com/Ib6PNB4.jpg",
    "https://i.imgur.com/twxAIbZ.jpg",
    "https://i.imgur.com/vSMmQY4.jpg",
    "https://i.imgur.com/KTeFa0H.jpg",
    "https://i.imgur.com/FBk7AtM.jpg",
    "https://i.imgur.com/GMPFkju.jpg",
    "https://i.imgur.com/4qTriHS.jpg",
    "https://i.imgur.com/fiM0Lb9.jpg",
    "https://i.imgur.com/ELLcYzy.jpg",
    "https://gerarmemes.s3.us-east-2.amazonaws.com/memes/355e2dab.jpg",
    "https://i.pinimg.com/originals/dd/6b/13/dd6b1324aeebf73b5af843c8d593fa01.jpg",
    "https://static.poder360.com.br/2020/05/be7f1072-3674-4918-941f-15e8c216fadd.jpg",
    "https://i.pinimg.com/736x/e1/7f/bb/e17fbbce394d8655fed3ddaee508a96d.jpg",
    "https://uploads.metropoles.com/wp-content/uploads/2021/09/19180509/meme-vulcao-Brasil.jpeg",
    "https://moosemidia.com.br/wp-content/uploads/2019/01/meme4.jpg",
    "https://gerarmemes.s3.us-east-2.amazonaws.com/memes/81fd3758.jpg",
    "https://i.ytimg.com/vi/Pow-OU2sSaA/maxresdefault.jpg",
    "https://i.imgur.com/Ypdq49w.jpg",
    "https://i.imgur.com/o2ctdtu.jpg",
    "https://i.imgur.com/kVGMjzJ.jpg",
    "https://i.imgur.com/mCkPBW4.jpg",
    "https://i.imgur.com/hzHTAnT.jpg",
    "https://i.imgur.com/09KqtVh.jpg",
    "https://i.imgur.com/zslU6BF.jpg",
    "https://i.imgur.com/0ROpB30.jpg",
    "https://i.imgur.com/YhRkUOL.jpg",
    "https://i.imgur.com/jhheNmG.jpg",
    "https://i.imgur.com/kVP6fWL.jpg",
    "https://i.imgur.com/EUNUVIe.jpg",
    "https://i.imgur.com/R4k2dfs.jpg",
    "https://i.imgur.com/berIW8D.jpg",
    "https://i.imgur.com/V35yyrF.jpg",
    "https://i.imgur.com/EdNr0Ri.jpg",
    "https://i.imgur.com/dMKjO8V.jpg",
    "https://i.imgur.com/MxzLtbw.jpg",
    "https://i.imgur.com/L7BEFNO.jpg",
    "https://i.imgur.com/fQl5DqT.jpg",
    "https://i.imgur.com/YuKe4Vn.jpg",
    "https://i1.sndcdn.com/artworks-gDpmiazDpgLfwyBz-E2pGag-t500x500.jpg",
    "https://gerarmemes.s3.us-east-2.amazonaws.com/memes/664134c3.webp",
    "https://imageproxy.ifunny.co/crop:x-20,resize:640x,quality:90x75/images/0deedf902a76c1faf63e0eed362f72fb59552e37603888f3c0da5d496a6f7e1a_1.jpg",
    "https://pm1.narvii.com/7368/901974603479ab884f7f95ab9d94ee7e65ccdf82r1-493-575v2_hq.jpg",
    "https://i.pinimg.com/474x/1f/77/25/1f7725f409acb2bae9f461e217693d9c.jpg",
    "https://i.redd.it/lnes8hpl6pb61.jpg",
    "https://i.pinimg.com/736x/50/72/47/507247b7153c756a15f911438d973080.jpg",
    "https://images3.memedroid.com/images/UPLOADED130/5e944721a7047.jpeg",
    "https://i.kym-cdn.com/entries/icons/original/000/035/767/cover4.jpg",
    "https://images3.memedroid.com/images/UPLOADED453/5e76d775ae2d2.jpeg",
    "https://pbs.twimg.com/media/Ejpco0zXkAEoxTx.jpg",
    "https://img.ifunny.co/images/186b2de27d287ff77897f911a02c3435f08a8dfea729f1a4402569b1053a34d6_1.jpg",
    "https://i.redd.it/0604sp0xy5551.jpg",
    "https://i.pinimg.com/736x/43/f6/96/43f6968985539cba1efa3a42a889bc6f.jpg",
    "https://i.pinimg.com/474x/d9/d3/ef/d9d3efd43f52f3e63fd0905879f3f2aa.jpg",
    "https://conteudo.imguol.com.br/c/entretenimento/fc/2018/02/09/regras-1-1518184300418_v2_450x337.png.webp",
    "https://imageproxy.ifunny.co/crop:x-20,resize:640x,quality:90x75/images/f5572296e840ff2ee24b9e47e3dc901e90318589c8acaaba4137c660cf331094_1.jpg",
    "https://i.redd.it/lahjxh2yab551.jpg",
    "https://i.imgur.com/1xMcF1H.jpg",
    "https://i.imgur.com/lcLpYKe.jpg",
    "https://i.imgur.com/mRuZoxh.jpg",
    "https://i.imgur.com/I3laj0Z.jpg",
    "https://i.imgur.com/1bAJdTr.jpg",
    "https://i.imgur.com/fp6fRTU.jpg",
    "https://i.imgur.com/jHac3Ce.jpg",
    "https://i.imgur.com/2AlDGJ1.jpg",
    "https://i.imgur.com/Lpxl9FF.jpg",
    "https://i.imgur.com/Z1t1K0S.jpg",
    "https://i.imgur.com/o41BO2t.jpg",
    "https://i.imgur.com/NsLE354.jpg",
    "https://i.imgur.com/izk2wVw.jpg",
    "https://i.imgur.com/PsXhoyt.png",
    "https://i.imgur.com/Tlwn8nb.jpg",
    "https://i.imgur.com/431W0bs.jpg",
    "https://i.imgur.com/hUm64tc.jpg",
    "https://i.imgur.com/vb6ltZF.jpg",
    "https://i.imgur.com/MXiA3pr.png",
    "https://i.imgur.com/qV6UkY8.jpg",
    "https://i.imgur.com/IZkLSyl.jpg",
    "https://i.imgur.com/xA5s2e9.jpg",
    "https://i.imgur.com/GmhGcjP.jpg",
    "https://i.imgur.com/kya1omD.jpg",
    "https://i.imgur.com/aAdKyyv.jpg",
    "https://i.imgur.com/5kQ1JWk.jpg",
    "https://i.imgur.com/bks2tK2.jpg",
    "https://i.imgur.com/61MNjus.jpg",
    "https://i.imgur.com/clAV2SX.jpg",
    "https://i.imgur.com/U5UBPtn.jpg",
    "https://i.imgur.com/MyX6rYh.jpg",
    "https://i.imgur.com/Xi4YWzV.jpg",
    "https://i.imgur.com/2XSWBht.jpg",
    "https://i.imgur.com/yUMKuEO.jpg",
    "https://i.imgur.com/uYNEUMy.jpg",
    "https://i.imgur.com/WzS3jrg.jpg",
    "https://i.imgur.com/HoaGiqB.jpg",
    "https://i.imgur.com/SN568ci.jpg",
    "https://i.imgur.com/IQu8TsC.jpg",
    "https://i.imgur.com/aCa7EFx.jpg",
    "https://i.imgur.com/Zij13Zb.jpg",
    "https://i.imgur.com/NCGpZqo.jpg",
    "https://i.imgur.com/x0j2OYZ.jpg",
    "https://i.imgur.com/j3D2uX1.jpg",
    "https://i.imgur.com/YiMeT9z.jpg",
    "https://i.imgur.com/ijT6ZlW.jpg",
    "https://i.imgur.com/yilvBGB.jpg",
    "https://i.imgur.com/TNf4KDe.jpg",
    "https://i.imgur.com/C5H4NCo.jpg",
    "https://i.imgur.com/b1JTOZ3.jpg",
    "https://i.imgur.com/8C9DshY.jpg",
    "https://i.imgur.com/nFZiFdf.jpg",
    "https://i.imgur.com/sorExgC.jpg",
    "https://i.imgur.com/NESaoC4.jpg",
    "https://i.imgur.com/lxJdpQ0.jpg",
    "https://i.imgur.com/V2cnr8e.jpg",
    "https://i.imgur.com/j2i4I70.jpg",
    "https://i.imgur.com/AXQDVHs.jpg",
    "https://i.imgur.com/Gfc9E5j.jpg",
    "https://i.imgur.com/3iNXgge.jpg",
    "https://i.imgur.com/S7etOan.jpg",
    "https://i.imgur.com/UmZxR7i.jpg",
    "https://i.imgur.com/xxgejjy.jpg",
    "https://i.imgur.com/7zWnX4l.jpg",
    "https://i.imgur.com/fIuxlNW.jpg",
    "https://i.imgur.com/Vu7X2wd.jpg",
    "https://i.imgur.com/S5G3VX4.jpg",
    "https://i.imgur.com/6II9MgU.jpg",
    "https://i.imgur.com/sOGmN90.jpg",
    "https://i.imgur.com/k6yDZI2.jpg",
    "https://i.imgur.com/JN7XzpL.jpg",
    "https://i.imgur.com/tfZtY5I.jpg",
    "https://i.imgur.com/gY02bz8.jpg",
    "https://i.imgur.com/tLjVRRb.jpg",
    "https://i.imgur.com/dpd5mGN.jpg",
    "https://i.imgur.com/Iy55Ph2.jpg",
    "https://i.imgur.com/f0NIHXl.jpg",
    "https://i.imgur.com/wQ67ksx.jpg",
    "https://i.imgur.com/C13HKFt.jpg",
    "https://i.imgur.com/LgBye7u.jpg",
    "https://i.imgur.com/kPVRzEk.jpg",
    "https://i.imgur.com/Vw1Jte2.jpg",
    "https://i.imgur.com/DZNOpcm.jpg",
    "https://i.imgur.com/1SCpMtD.jpg",
    "https://i.imgur.com/uCXVNZy.jpg",
    "https://i.imgur.com/erz1GNh.jpg",
    "https://i.imgur.com/xpyDewr.jpg",
    "https://i.imgur.com/qyYXaQI.jpg",
    "https://i.imgur.com/XDNmXB8.jpg",
    "https://i.imgur.com/yVQKTuy.jpg",
    "https://i.imgur.com/II4RsYv.jpg",
    "https://i.imgur.com/x21jmPg.jpg",
    "https://i.imgur.com/hvuwPps.jpg",
    "https://i.imgur.com/UNedBuY.jpg",
    "https://i.imgur.com/OgT3ran.jpg",
    "https://i.imgur.com/CK6WKwq.jpg",
    "https://i.imgur.com/1UPZFMo.png",
    "https://i.imgur.com/PzoicM9.jpg",
    "https://i.imgur.com/Stxtsww.jpg",
    "https://i.imgur.com/oV3g5tt.jpg",
    "https://i.imgur.com/ocncFcL.jpg",
    "https://i.imgur.com/uA1peMb.jpg",
    "https://i.imgur.com/qGH8VNe.jpg",
    "https://i.imgur.com/MaLOmuG.jpg",
    "https://i.imgur.com/YgiUPAl.jpg",
    "https://pics.me.me/send-this-to-a-discord-server-where-people-are-talking-61144859.png"

  ]

  res.json({ images });

  const whClient = new WebhookClient({
    url: process.env.API_LOGS_WEBHOOK,
  });

  const startTime = new Date().getTime();

  const endTime = new Date().getTime();
  const responseTime = endTime - startTime;


  const embedLogs = new EmbedBuilder()
    .setAuthor({
      name: "GroveMemes | User Endpoint",
    })
    .setColor("Blue")
    .setFields(
      {
        name: "🌍 Endereço IP:",
        value: `${req.clientIp}`,
        inline: true,
      },
      {
        name: "⭐ Tempo de Resposta:",
        value: `${responseTime}ms`,
        inline: false,
      }
    );

  whClient.send({ embeds: [embedLogs] });

}

export default {
  method: "get",
  name: "/grovememes",
  execute: userRoute2,
};
