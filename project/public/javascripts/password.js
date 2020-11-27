// 패스워드 변경을 위한 타이머 및 기능

var email = '';
var setTime = 180;		// 최초 설정 시간(기본 : 초)
var nowBtn = 0;         // 버튼 클릭 기록
$('#enter_btn').on('click', () => {
    if($('#email').val() == '') {
        alert("이메일 주소를 입력해 주세요.");
    } else {
        if(nowBtn == 0) {
            let check = fn_emailCheck(); 

            if(check){
                email = $('#email').val();
                fn_mailSend();

                $('#emailText').html('');
                $('#emailCode').html('<input type="text" class="form-control py-4" id="code" placeholder="Code 입력" oninput="fn_codeCheck(this.value)">');
                $('#viewTimer').css('padding', '12px 20px');
                $('#enter_btn').text('인증코드 재발송');
                nowBtn = 1;
                timerStart();
            } else {
                alert("회원이 아닌 이메일 주소 입니다.");
            }
                        
        } else if(nowBtn == 1) {
            fn_mailSend();                    
            email = $('#email').val();				
            timerStop();
            timerStart();

        } else if(nowBtn == 2){
            if(setTime == 180){
                alert("시간이 끝났습니다. 코드를 재발송 하십시오.");
            } else {
                fn_mailCode();
            }
            
        } else if(nowBtn == 3){
            if($('#newPw').val() == $('#rePw').val()) {
                fn_changePw();				
            } else {
                alert("패스워드가 맞지 않습니다.");
            }			
        }
    }
});

function fn_codeCheck(text) {
    if (text == '') {
        $('#enter_btn').text('인증코드 재발송');
        nowBtn = 1;
    } else {
        $('#enter_btn').text('코드 인증');
        nowBtn = 2;
    }
}

function timerStart() { 
    tid=setInterval('msg_time()', 1000);
}

function timerStop() {
    clearInterval(tid);		// 타이머 해제
    setTime = 180;			// 시간 초기화
}

function msg_time() {	// 1초씩 카운트	
    var second = setTime % 60;
    var str = ":";
    
    if(second < 10)
        str = ":0";
    else
        str = ":";
    
    m = Math.floor(setTime / 60) + str + (setTime % 60);	 // 남은 시간 계산
    
    var msg = "<font color='blue'>" + m + "</font>";
    
    document.all.viewTimer.innerHTML = msg;		// div 영역에 보여줌 
            
    setTime--;					// 1초씩 감소
    
    if (setTime < 0) {			// 시간이 종료 되었으면..			
        timerStop();
        alert('시간이 종료되었습니다.');
    }
    
}