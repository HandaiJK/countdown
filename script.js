/**
 * イベント開始時刻はここで指定する。
 * 背景画像はCSSの方で指定する。
 */
const eventStartTime = new Date('2018/5/28 16:45:00');


class CountdownTimer {
    constructor(elmName, startTime, message) {
        this.elem = document.getElementById(elmName);
        this.startTime = startTime;
        this.message = message;
    }
    countDown() {
        const currentTime = new Date();
        const diff = this.startTime - currentTime;
        const isBeforePerformance = diff > 0;
        if (isBeforePerformance) {
            const day = Math.floor(diff / (24 * 60 * 60 * 1000));
            const hour = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const min = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 1000)) % 60;
            const sec = Math.floor((diff % (24 * 60 * 60 * 1000)) / 1000) % 60 % 60;
            const ms = Math.floor((diff % (24 * 60 * 60 * 1000)) / 10) % 100;

            let htmlString = '<span style="font-size: 70%;">開始まであと</span>';
            if (day) htmlString += day + '日';
            if (hour) htmlString += hour + '時間';
            htmlString += this.zeroPadding(min) + '分' + this.zeroPadding(sec) + '秒' + this.zeroPadding(ms);
            this.elem.innerHTML = htmlString;

            // 10ミリ秒ごとに更新
            setTimeout(() => { this.countDown(); }, 10);
        } else {
            this.elem.innerHTML = this.message;
            return;
        }
    }

    /**
     * 2桁にゼロパディングする (例: 5 -> 05, 30 -> 30)
     * @param {number} ある数
     */
    zeroPadding(num) {
        return ('0' + num).slice(-2);
    }
}

window.onload = function () {
    const timer = new CountdownTimer('rest', eventStartTime, 'まもなく始まります…！');
    timer.countDown();
}
