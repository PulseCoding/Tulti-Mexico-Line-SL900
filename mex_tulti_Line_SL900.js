var fs = require('fs');
var modbus = require('jsmodbus');
var PubNub = require('pubnub');
try{
  var secPubNub=0;
  var Frezzerct = null,
      Frezzerresults = null,
      CntInFrezzer = null,
      CntOutFrezzer = null,
      CntRejFrezzer1 = null,
      Frezzeractual = 0,
      Frezzertime = 0,
      Frezzersec = 0,
      FrezzerflagStopped = false,
      Frezzerstate = 0,
      Frezzerspeed = 0,
      FrezzerspeedTemp = 0,
      FrezzerflagPrint = 0,
      FrezzersecStop = 0,
      FrezzerONS = false,
      FrezzertimeStop = 60, //NOTE: Timestop
      FrezzerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
      FrezzerflagRunning = false;
  var ColdStamperct = null,
      ColdStamperresults = null,
      CntInColdStamper = null,
      CntInColdStamper1 = null,
      CntOutColdStamper = null,
      ColdStamperactual = 0,
      ColdStampertime = 0,
      ColdStampersec = 0,
      ColdStamperflagStopped = false,
      ColdStamperstate = 0,
      ColdStamperspeed = 0,
      ColdStamperspeedTemp = 0,
      ColdStamperflagPrint = 0,
      ColdStampersecStop = 0,
      ColdStamperONS = false,
      ColdStampertimeStop = 60, //NOTE: Timestop
      ColdStamperWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
      ColdStamperflagRunning = false;
  var CaseFormerct = null,
      CaseFormerresults = null,
      CntInCaseFormer = null,
      CntOutCaseFormer = null,
      CaseFormeractual = 0,
      CaseFormertime = 0,
      CaseFormersec = 0,
      CaseFormerflagStopped = false,
      CaseFormerstate = 0,
      CaseFormerspeed = 0,
      CaseFormerspeedTemp = 0,
      CaseFormerflagPrint = 0,
      CaseFormersecStop = 0,
      CaseFormerONS = false,
      CaseFormertimeStop = 60, //NOTE: Timestop
      CaseFormerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
      CaseFormerflagRunning = false;
  var CasePackerct = null,
      CasePackerresults = null,
      CntInCasePacker = null,
      CntOutCasePacker = null,
      CasePackeractual = 0,
      CasePackertime = 0,
      CasePackersec = 0,
      CasePackerflagStopped = false,
      CasePackerstate = 0,
      CasePackerspeed = 0,
      CasePackerspeedTemp = 0,
      CasePackerflagPrint = 0,
      CasePackersecStop = 0,
      CasePackerONS = false,
      CasePackertimeStop = 60, //NOTE: Timestop
      CasePackerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
      CasePackerflagRunning = false;
  var CaseSealerct = null,
      CaseSealerresults = null,
      CntInCaseSealer = null,
      CntOutCaseSealer = null,
      CaseSealeractual = 0,
      CaseSealertime = 0,
      CaseSealersec = 0,
      CaseSealerflagStopped = false,
      CaseSealerstate = 0,
      CaseSealerspeed = 0,
      CaseSealerspeedTemp = 0,
      CaseSealerflagPrint = 0,
      CaseSealersecStop = 0,
      CaseSealerONS = false,
      CaseSealertimeStop = 60, //NOTE: Timestop
      CaseSealerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
      CaseSealerflagRunning = false;
  var Xrayct = null,
      Xrayresults = null,
      CntInXray = null,
      CntOutXray = null,
      Xrayactual = 0,
      Xraytime = 0,
      Xraysec = 0,
      XrayflagStopped = false,
      Xraystate = 0,
      Xrayspeed = 0,
      XrayspeedTemp = 0,
      XrayflagPrint = 0,
      XraysecStop = 0,
      XrayONS = false,
      XraytimeStop = 60, //NOTE: Timestop
      XrayWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
      XrayflagRunning = false;
      var CheckWeigherct = null,
          CheckWeigherresults = null,
          CntInCheckWeigher = null,
          CntOutCheckWeigher = null,
          CheckWeigheractual = 0,
          CheckWeighertime = 0,
          CheckWeighersec = 0,
          CheckWeigherflagStopped = false,
          CheckWeigherstate = 0,
          CheckWeigherspeed = 0,
          CheckWeigherspeedTemp = 0,
          CheckWeigherflagPrint = 0,
          CheckWeighersecStop = 0,
          CheckWeigherONS = false,
          CheckWeighertimeStop = 60, //NOTE: Timestop
          CheckWeigherWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
          CheckWeigherflagRunning = false;
  var CntOutEOL=null,
      secEOL=0;
  var publishConfig;
      var intId1,intId2,intId3;
      var files = fs.readdirSync("C:/PULSE/SL900_LOGS/"); //Leer documentos
      var actualdate = Date.now(); //Fecha actual
      var text2send=[];//Vector a enviar
      var flagInfo2Send=0;
      var i=0;
      var pubnub = new PubNub({
        publishKey:		"pub-c-8d024e5b-23bc-4ce8-ab68-b39b00347dfb",
      subscribeKey: 		"sub-c-c3b3aa54-b44b-11e7-895e-c6a8ff6a3d85",
        uuid: "MEX_TUL_SL900"
      });


      var senderData = function (){
        pubnub.publish(publishConfig, function(status, response) {
      });};

      var client1 = modbus.client.tcp.complete({
        'host': "192.168.10.94",
        'port': 502,
        'autoReconnect': true,
        'timeout': 60000,
        'logEnabled': true,
        'reconnectTimeout' : 30000
      });
      var client2 = modbus.client.tcp.complete({
        'host': "192.168.10.95",
        'port': 502,
        'autoReconnect': true,
        'timeout': 60000,
        'logEnabled': true,
        'reconnectTimeout' : 30000
      });
      var client3 = modbus.client.tcp.complete({
        'host': "192.168.10.96",
        'port': 502,
        'autoReconnect': true,
        'timeout': 60000,
        'logEnabled': true,
        'reconnectTimeout' : 30000
      });
}catch(err){
    fs.appendFileSync("error_declarations.log",err + '\n');
}
try{
  client1.connect();
  client2.connect();
  client3.connect();
}catch(err){
  fs.appendFileSync("error_connection.log",err + '\n');
}
try{
  /*----------------------------------------------------------------------------------function-------------------------------------------------------------------------------------------*/
  var joinWord=function(num1, num2) {
    var bits = "00000000000000000000000000000000";
    var bin1 = num1.toString(2),
      bin2 = num2.toString(2),
      newNum = bits.split("");

    for (i = 0; i < bin1.length; i++) {
      newNum[31 - i] = bin1[(bin1.length - 1) - i];
    }
    for (i = 0; i < bin2.length; i++) {
      newNum[15 - i] = bin2[(bin2.length - 1) - i];
    }
    bits = newNum.join("");
    return parseInt(bits, 2);
  };
//PubNub --------------------------------------------------------------------------------------------------------------------
        if(secPubNub>=60*5){

          var idle=function(){
            i=0;
            text2send=[];
            for (var k=0;k<files.length;k++){//Verificar los archivos
              var stats = fs.statSync("C:/PULSE/SL900_LOGS/"+files[k]);
              var mtime = new Date(stats.mtime).getTime();
              if (mtime< (Date.now() - (3*60*1000))&&files[k].indexOf("serialbox")==-1){
                flagInfo2Send=1;
                text2send[i]=files[k];
                i++;
              }
            }
          };
          secPubNub=0;
          publishConfig = {
            channel : "MEX_TUL_Monitor",
            message : {
                  line: "SL900",
                  tt: Date.now(),
                  machines:text2send

                }
          };
          senderData();
        }
        secPubNub++;
//PubNub --------------------------------------------------------------------------------------------------------------------
client1.on('connect', function(err) {
  intId1 =
    setInterval(function(){
        client1.readHoldingRegisters(0, 16).then(function(resp) {
          CntInFrezzer =  joinWord(resp.register[0], resp.register[1])+joinWord(resp.register[2], resp.register[3]);
          CntRejFrezzer1 = joinWord(resp.register[4], resp.register[5])+joinWord(resp.register[6], resp.register[7]);

          //------------------------------------------Frezzer----------------------------------------------
                Frezzerct = CntInFrezzer // NOTE: igualar al contador de salida
                if (!FrezzerONS && Frezzerct) {
                  FrezzerspeedTemp = Frezzerct
                  Frezzersec = Date.now()
                  FrezzerONS = true
                  Frezzertime = Date.now()
                }
                if(Frezzerct > Frezzeractual){
                  if(FrezzerflagStopped){
                    Frezzerspeed = Frezzerct - FrezzerspeedTemp
                    FrezzerspeedTemp = Frezzerct
                    Frezzersec = Date.now()
                    Frezzertime = Date.now()
                  }
                  FrezzersecStop = 0
                  Frezzerstate = 1
                  FrezzerflagStopped = false
                  FrezzerflagRunning = true
                } else if( Frezzerct == Frezzeractual ){
                  if(FrezzersecStop == 0){
                    Frezzertime = Date.now()
                    FrezzersecStop = Date.now()
                  }
                  if( ( Date.now() - ( FrezzertimeStop * 1000 ) ) >= FrezzersecStop ){
                    Frezzerspeed = 0
                    Frezzerstate = 2
                    FrezzerspeedTemp = Frezzerct
                    FrezzerflagStopped = true
                    FrezzerflagRunning = false
                    FrezzerflagPrint = 1
                  }
                }
                Frezzeractual = Frezzerct
                if(Date.now() - 60000 * FrezzerWorktime >= Frezzersec && FrezzersecStop == 0){
                  if(FrezzerflagRunning && Frezzerct){
                    FrezzerflagPrint = 1
                    FrezzersecStop = 0
                    Frezzerspeed = Frezzerct - FrezzerspeedTemp
                    FrezzerspeedTemp = Frezzerct
                    Frezzersec = Date.now()
                  }
                }
                Frezzerresults = {
                  ST: Frezzerstate,
                  CPQI: CntInFrezzer,
                  CPQR: CntRejFrezzer1,
                  SP: Frezzerspeed
                }
                if (FrezzerflagPrint == 1) {
                  for (var key in Frezzerresults) {
                    if( Frezzerresults[key] != null && ! isNaN(Frezzerresults[key]) )
                    //NOTE: Cambiar path
                    fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_Frezzer_SL900.log', 'tt=' + Frezzertime + ',var=' + key + ',val=' + Frezzerresults[key] + '\n')
                  }
                  FrezzerflagPrint = 0
                  FrezzersecStop = 0
                  Frezzertime = Date.now()
                }
          //------------------------------------------Frezzer----------------------------------------------
        });//Cierre de lectura
      },1000);
  });//Cierre de cliente

  client1.on('error', function(err){
    clearInterval(intId1);
  });
  client1.on('close', function() {
    clearInterval(intId1);
  });
  client2.on('connect', function(err) {
    intId2 =
      setInterval(function(){
          client2.readHoldingRegisters(0, 16).then(function(resp) {
            CntInColdStamper1 =  joinWord(resp.register[0], resp.register[1])+joinWord(resp.register[2], resp.register[3])+joinWord(resp.register[4], resp.register[5]);
            CntInColdStamper = joinWord(resp.register[6], resp.register[7])+joinWord(resp.register[8], resp.register[9])+joinWord(resp.register[10], resp.register[11])+CntInColdStamper1;

            //------------------------------------------ColdStamper----------------------------------------------
                  ColdStamperct = CntInColdStamper // NOTE: igualar al contador de salida
                  if (!ColdStamperONS && ColdStamperct) {
                    ColdStamperspeedTemp = ColdStamperct
                    ColdStampersec = Date.now()
                    ColdStamperONS = true
                    ColdStampertime = Date.now()
                  }
                  if(ColdStamperct > ColdStamperactual){
                    if(ColdStamperflagStopped){
                      ColdStamperspeed = ColdStamperct - ColdStamperspeedTemp
                      ColdStamperspeedTemp = ColdStamperct
                      ColdStampersec = Date.now()
                      ColdStampertime = Date.now()
                    }
                    ColdStampersecStop = 0
                    ColdStamperstate = 1
                    ColdStamperflagStopped = false
                    ColdStamperflagRunning = true
                  } else if( ColdStamperct == ColdStamperactual ){
                    if(ColdStampersecStop == 0){
                      ColdStampertime = Date.now()
                      ColdStampersecStop = Date.now()
                    }
                    if( ( Date.now() - ( ColdStampertimeStop * 1000 ) ) >= ColdStampersecStop ){
                      ColdStamperspeed = 0
                      ColdStamperstate = 2
                      ColdStamperspeedTemp = ColdStamperct
                      ColdStamperflagStopped = true
                      ColdStamperflagRunning = false
                      ColdStamperflagPrint = 1
                    }
                  }
                  ColdStamperactual = ColdStamperct
                  if(Date.now() - 60000 * ColdStamperWorktime >= ColdStampersec && ColdStampersecStop == 0){
                    if(ColdStamperflagRunning && ColdStamperct){
                      ColdStamperflagPrint = 1
                      ColdStampersecStop = 0
                      ColdStamperspeed = ColdStamperct - ColdStamperspeedTemp
                      ColdStamperspeedTemp = ColdStamperct
                      ColdStampersec = Date.now()
                    }
                  }
                  ColdStamperresults = {
                    ST: ColdStamperstate,
                    CPQI: CntInColdStamper,
                    SP: ColdStamperspeed
                  }
                  if (ColdStamperflagPrint == 1) {
                    for (var key in ColdStamperresults) {
                      if( ColdStamperresults[key] != null && ! isNaN(ColdStamperresults[key]) )
                      //NOTE: Cambiar path
                      fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_ColdStamper_SL900.log', 'tt=' + ColdStampertime + ',var=' + key + ',val=' + ColdStamperresults[key] + '\n')
                    }
                    ColdStamperflagPrint = 0
                    ColdStampersecStop = 0
                    ColdStampertime = Date.now()
                  }
            //------------------------------------------ColdStamper----------------------------------------------
          });//Cierre de lectura
        },1000);
    });//Cierre de cliente

    client2.on('error', function(err){
      clearInterval(intId2);
    });
    client2.on('close', function() {
      clearInterval(intId2);
    });
    client3.on('connect', function(err) {
      intId3 =
        setInterval(function(){
            client3.readHoldingRegisters(0, 16).then(function(resp) {
              CntOutCaseFormer =  joinWord(resp.register[0], resp.register[1]);
              CntInCasePacker = joinWord(resp.register[2], resp.register[3]);
              CntInCaseSealer = joinWord(resp.register[4], resp.register[5]);
              CntOutXray = joinWord(resp.register[6], resp.register[7]);
              CntOutCheckWeigher = joinWord(resp.register[8], resp.register[9]);
              CntOutEOL = joinWord(resp.register[8], resp.register[9]);

              //------------------------------------------CaseFormer----------------------------------------------
                    CaseFormerct = CntOutCaseFormer // NOTE: igualar al contador de salida
                    if (!CaseFormerONS && CaseFormerct) {
                      CaseFormerspeedTemp = CaseFormerct
                      CaseFormersec = Date.now()
                      CaseFormerONS = true
                      CaseFormertime = Date.now()
                    }
                    if(CaseFormerct > CaseFormeractual){
                      if(CaseFormerflagStopped){
                        CaseFormerspeed = CaseFormerct - CaseFormerspeedTemp
                        CaseFormerspeedTemp = CaseFormerct
                        CaseFormersec = Date.now()
                        CaseFormertime = Date.now()
                      }
                      CaseFormersecStop = 0
                      CaseFormerstate = 1
                      CaseFormerflagStopped = false
                      CaseFormerflagRunning = true
                    } else if( CaseFormerct == CaseFormeractual ){
                      if(CaseFormersecStop == 0){
                        CaseFormertime = Date.now()
                        CaseFormersecStop = Date.now()
                      }
                      if( ( Date.now() - ( CaseFormertimeStop * 1000 ) ) >= CaseFormersecStop ){
                        CaseFormerspeed = 0
                        CaseFormerstate = 2
                        CaseFormerspeedTemp = CaseFormerct
                        CaseFormerflagStopped = true
                        CaseFormerflagRunning = false
                        CaseFormerflagPrint = 1
                      }
                    }
                    CaseFormeractual = CaseFormerct
                    if(Date.now() - 60000 * CaseFormerWorktime >= CaseFormersec && CaseFormersecStop == 0){
                      if(CaseFormerflagRunning && CaseFormerct){
                        CaseFormerflagPrint = 1
                        CaseFormersecStop = 0
                        CaseFormerspeed = CaseFormerct - CaseFormerspeedTemp
                        CaseFormerspeedTemp = CaseFormerct
                        CaseFormersec = Date.now()
                      }
                    }
                    CaseFormerresults = {
                      ST: CaseFormerstate,
                      CPQO: CntOutCaseFormer,
                      SP: CaseFormerspeed
                    }
                    if (CaseFormerflagPrint == 1) {
                      for (var key in CaseFormerresults) {
                        if( CaseFormerresults[key] != null && ! isNaN(CaseFormerresults[key]) )
                        //NOTE: Cambiar path
                        fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_CaseFormer_SL900.log', 'tt=' + CaseFormertime + ',var=' + key + ',val=' + CaseFormerresults[key] + '\n')
                      }
                      CaseFormerflagPrint = 0
                      CaseFormersecStop = 0
                      CaseFormertime = Date.now()
                    }
              //------------------------------------------CaseFormer----------------------------------------------

              //------------------------------------------CasePacker----------------------------------------------
                    CasePackerct = CntInCasePacker // NOTE: igualar al contador de salida
                    if (!CasePackerONS && CasePackerct) {
                      CasePackerspeedTemp = CasePackerct
                      CasePackersec = Date.now()
                      CasePackerONS = true
                      CasePackertime = Date.now()
                    }
                    if(CasePackerct > CasePackeractual){
                      if(CasePackerflagStopped){
                        CasePackerspeed = CasePackerct - CasePackerspeedTemp
                        CasePackerspeedTemp = CasePackerct
                        CasePackersec = Date.now()
                        CasePackertime = Date.now()
                      }
                      CasePackersecStop = 0
                      CasePackerstate = 1
                      CasePackerflagStopped = false
                      CasePackerflagRunning = true
                    } else if( CasePackerct == CasePackeractual ){
                      if(CasePackersecStop == 0){
                        CasePackertime = Date.now()
                        CasePackersecStop = Date.now()
                      }
                      if( ( Date.now() - ( CasePackertimeStop * 1000 ) ) >= CasePackersecStop ){
                        CasePackerspeed = 0
                        CasePackerstate = 2
                        CasePackerspeedTemp = CasePackerct
                        CasePackerflagStopped = true
                        CasePackerflagRunning = false
                        CasePackerflagPrint = 1
                      }
                    }
                    CasePackeractual = CasePackerct
                    if(Date.now() - 60000 * CasePackerWorktime >= CasePackersec && CasePackersecStop == 0){
                      if(CasePackerflagRunning && CasePackerct){
                        CasePackerflagPrint = 1
                        CasePackersecStop = 0
                        CasePackerspeed = CasePackerct - CasePackerspeedTemp
                        CasePackerspeedTemp = CasePackerct
                        CasePackersec = Date.now()
                      }
                    }
                    CasePackerresults = {
                      ST: CasePackerstate,
                      CPQI: CntInCasePacker,
                      SP: CasePackerspeed
                    }
                    if (CasePackerflagPrint == 1) {
                      for (var key in CasePackerresults) {
                        if( CasePackerresults[key] != null && ! isNaN(CasePackerresults[key]) )
                        //NOTE: Cambiar path
                        fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_CasePacker_SL900.log', 'tt=' + CasePackertime + ',var=' + key + ',val=' + CasePackerresults[key] + '\n')
                      }
                      CasePackerflagPrint = 0
                      CasePackersecStop = 0
                      CasePackertime = Date.now()
                    }
              //------------------------------------------CasePacker----------------------------------------------
              //------------------------------------------CaseSealer----------------------------------------------
                    CaseSealerct = CntInCaseSealer // NOTE: igualar al contador de salida
                    if (!CaseSealerONS && CaseSealerct) {
                      CaseSealerspeedTemp = CaseSealerct
                      CaseSealersec = Date.now()
                      CaseSealerONS = true
                      CaseSealertime = Date.now()
                    }
                    if(CaseSealerct > CaseSealeractual){
                      if(CaseSealerflagStopped){
                        CaseSealerspeed = CaseSealerct - CaseSealerspeedTemp
                        CaseSealerspeedTemp = CaseSealerct
                        CaseSealersec = Date.now()
                        CaseSealertime = Date.now()
                      }
                      CaseSealersecStop = 0
                      CaseSealerstate = 1
                      CaseSealerflagStopped = false
                      CaseSealerflagRunning = true
                    } else if( CaseSealerct == CaseSealeractual ){
                      if(CaseSealersecStop == 0){
                        CaseSealertime = Date.now()
                        CaseSealersecStop = Date.now()
                      }
                      if( ( Date.now() - ( CaseSealertimeStop * 1000 ) ) >= CaseSealersecStop ){
                        CaseSealerspeed = 0
                        CaseSealerstate = 2
                        CaseSealerspeedTemp = CaseSealerct
                        CaseSealerflagStopped = true
                        CaseSealerflagRunning = false
                        CaseSealerflagPrint = 1
                      }
                    }
                    CaseSealeractual = CaseSealerct
                    if(Date.now() - 60000 * CaseSealerWorktime >= CaseSealersec && CaseSealersecStop == 0){
                      if(CaseSealerflagRunning && CaseSealerct){
                        CaseSealerflagPrint = 1
                        CaseSealersecStop = 0
                        CaseSealerspeed = CaseSealerct - CaseSealerspeedTemp
                        CaseSealerspeedTemp = CaseSealerct
                        CaseSealersec = Date.now()
                      }
                    }
                    CaseSealerresults = {
                      ST: CaseSealerstate,
                      CPQI: CntInCaseSealer,
                      SP: CaseSealerspeed
                    }
                    if (CaseSealerflagPrint == 1) {
                      for (var key in CaseSealerresults) {
                        if( CaseSealerresults[key] != null && ! isNaN(CaseSealerresults[key]) )
                        //NOTE: Cambiar path
                        fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_CaseSealer_SL900.log', 'tt=' + CaseSealertime + ',var=' + key + ',val=' + CaseSealerresults[key] + '\n')
                      }
                      CaseSealerflagPrint = 0
                      CaseSealersecStop = 0
                      CaseSealertime = Date.now()
                    }
              //------------------------------------------CaseSealer----------------------------------------------

              //------------------------------------------Xray----------------------------------------------
                    Xrayct = CntOutXray // NOTE: igualar al contador de salida
                    if (!XrayONS && Xrayct) {
                      XrayspeedTemp = Xrayct
                      Xraysec = Date.now()
                      XrayONS = true
                      Xraytime = Date.now()
                    }
                    if(Xrayct > Xrayactual){
                      if(XrayflagStopped){
                        Xrayspeed = Xrayct - XrayspeedTemp
                        XrayspeedTemp = Xrayct
                        Xraysec = Date.now()
                        Xraytime = Date.now()
                      }
                      XraysecStop = 0
                      Xraystate = 1
                      XrayflagStopped = false
                      XrayflagRunning = true
                    } else if( Xrayct == Xrayactual ){
                      if(XraysecStop == 0){
                        Xraytime = Date.now()
                        XraysecStop = Date.now()
                      }
                      if( ( Date.now() - ( XraytimeStop * 1000 ) ) >= XraysecStop ){
                        Xrayspeed = 0
                        Xraystate = 2
                        XrayspeedTemp = Xrayct
                        XrayflagStopped = true
                        XrayflagRunning = false
                        XrayflagPrint = 1
                      }
                    }
                    Xrayactual = Xrayct
                    if(Date.now() - 60000 * XrayWorktime >= Xraysec && XraysecStop == 0){
                      if(XrayflagRunning && Xrayct){
                        XrayflagPrint = 1
                        XraysecStop = 0
                        Xrayspeed = Xrayct - XrayspeedTemp
                        XrayspeedTemp = Xrayct
                        Xraysec = Date.now()
                      }
                    }
                    Xrayresults = {
                      ST: Xraystate,
                      CPQO: CntOutXray,
                      SP: Xrayspeed
                    }
                    if (XrayflagPrint == 1) {
                      for (var key in Xrayresults) {
                        if( Xrayresults[key] != null && ! isNaN(Xrayresults[key]) )
                        //NOTE: Cambiar path
                        fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_Xray_SL900.log', 'tt=' + Xraytime + ',var=' + key + ',val=' + Xrayresults[key] + '\n')
                      }
                      XrayflagPrint = 0
                      XraysecStop = 0
                      Xraytime = Date.now()
                    }
              //------------------------------------------Xray----------------------------------------------

              //------------------------------------------CheckWeigher----------------------------------------------
                    CheckWeigherct = CntOutCheckWeigher // NOTE: igualar al contador de salida
                    if (!CheckWeigherONS && CheckWeigherct) {
                      CheckWeigherspeedTemp = CheckWeigherct
                      CheckWeighersec = Date.now()
                      CheckWeigherONS = true
                      CheckWeighertime = Date.now()
                    }
                    if(CheckWeigherct > CheckWeigheractual){
                      if(CheckWeigherflagStopped){
                        CheckWeigherspeed = CheckWeigherct - CheckWeigherspeedTemp
                        CheckWeigherspeedTemp = CheckWeigherct
                        CheckWeighersec = Date.now()
                        CheckWeighertime = Date.now()
                      }
                      CheckWeighersecStop = 0
                      CheckWeigherstate = 1
                      CheckWeigherflagStopped = false
                      CheckWeigherflagRunning = true
                    } else if( CheckWeigherct == CheckWeigheractual ){
                      if(CheckWeighersecStop == 0){
                        CheckWeighertime = Date.now()
                        CheckWeighersecStop = Date.now()
                      }
                      if( ( Date.now() - ( CheckWeighertimeStop * 1000 ) ) >= CheckWeighersecStop ){
                        CheckWeigherspeed = 0
                        CheckWeigherstate = 2
                        CheckWeigherspeedTemp = CheckWeigherct
                        CheckWeigherflagStopped = true
                        CheckWeigherflagRunning = false
                        CheckWeigherflagPrint = 1
                      }
                    }
                    CheckWeigheractual = CheckWeigherct
                    if(Date.now() - 60000 * CheckWeigherWorktime >= CheckWeighersec && CheckWeighersecStop == 0){
                      if(CheckWeigherflagRunning && CheckWeigherct){
                        CheckWeigherflagPrint = 1
                        CheckWeighersecStop = 0
                        CheckWeigherspeed = CheckWeigherct - CheckWeigherspeedTemp
                        CheckWeigherspeedTemp = CheckWeigherct
                        CheckWeighersec = Date.now()
                      }
                    }
                    CheckWeigherresults = {
                      ST: CheckWeigherstate,
                      CPQO: CntOutCheckWeigher,
                      SP: CheckWeigherspeed
                    }
                    if (CheckWeigherflagPrint == 1) {
                      for (var key in CheckWeigherresults) {
                        if( CheckWeigherresults[key] != null && ! isNaN(CheckWeigherresults[key]) )
                        //NOTE: Cambiar path
                        fs.appendFileSync('C:/Pulse/SL900_LOGS/mex_tul_CheckWeigher_SL900.log', 'tt=' + CheckWeighertime + ',var=' + key + ',val=' + CheckWeigherresults[key] + '\n')
                      }
                      CheckWeigherflagPrint = 0
                      CheckWeighersecStop = 0
                      CheckWeighertime = Date.now()
                    }
              //------------------------------------------CheckWeigher----------------------------------------------
              /*----------------------------------------------------------------------------------EOL----------------------------------------------------------------------------------*/
                   if(secEOL>=60 && CntOutEOL){
                      fs.appendFileSync("C:/PULSE/SL900_LOGS/mex_tul_eol_SL900.log","tt="+Date.now()+",var=EOL"+",val="+CntOutEOL+"\n");
                      secEOL=0;
                    }else{
                      secEOL++;
                    }
              /*----------------------------------------------------------------------------------EOL----------------------------------------------------------------------------------*/

            });//Cierre de lectura
          },1000);
      });//Cierre de cliente

      client3.on('error', function(err){
        clearInterval(intId3);
      });
      client3.on('close', function() {
        clearInterval(intId3);
      });

}catch(err){
    fs.appendFileSync("error_SL900.log",err + '\n');
}
