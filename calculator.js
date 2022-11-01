document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key:not(.del,.reset,.ans)')
    const result = document.querySelector('.result')
    const del = document.querySelector('.del')
    const reset = document.querySelector('.reset')
    const answer = document.querySelector('.ans')
    const switchBtn = document.querySelector('.switchBtn')
    let ans = 0
    let movement = 0
    let localTheme = window.localStorage.getItem('theme')
    let theme = document.getElementById('theme')
    function changeTheme(e) {
        (e == 30) ? (theme.setAttribute('href', '/calculator-app-main/whiteTheme.css'))
            : (e == 60) ? (theme.setAttribute('href', ''), theme.setAttribute('href', '/calculator-app-main/purpleTheme.css'))
                : theme.setAttribute('href', '');
    }
    window.onload = () => {
        if (localTheme != null) {
            switchBtn.style.translate = localTheme + 'px';
            changeTheme(localTheme);
            movement = localTheme - movement;
        }
    }
    switchBtn.addEventListener('click', () => {

        (movement < 60) ? movement += 30 : movement = 0;

        switchBtn.style.translate = movement + 'px';
        window.localStorage.setItem('theme', movement);
        changeTheme(movement);
    })
    let calcMethod
    keys.forEach(e => {
        e.addEventListener('click', () => {
            let val = e.textContent;

            ans == 0 ? ans = val :
                ans += val
            result.innerHTML = ans;
            calcMethod = ans.replaceAll('X', '*');
        })
    })
    del.addEventListener('click', () => {
        calcMethod = calcMethod.split('').slice(0, ans.length - 1).join('');
        ans = calcMethod.replaceAll('*', 'X');
        result.innerHTML = ans;
    })
    reset.addEventListener('click', () => {
        ans = 0;
        calcMethod = 0;
        result.innerHTML = '0';
    });

    answer.addEventListener('click', () => {
        let re = /\d*[-+]?(?=\d)\d+/g;
        if (calcMethod.match(re)) {
            ans = eval(calcMethod).toString();
            result.innerHTML = ans;
        } else if (+calcMethod != NaN) {
            result.innerHTML = ans;
        } else {
            result.innerHTML = 'MATHMATICAL ERROR';
            setTimeout(resetVals(), 100)
        }
    })
})