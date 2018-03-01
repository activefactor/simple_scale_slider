/**
 *　スライダオブジェクト
 *
 * @param { string } importSelectorName 挿入するセレクタ名
 * @param { object } option オプション設定用データ群
 * @return { object } 挿入するセレクタのDOMオブジェクト
 */
var SimpleScaleSlider = function (importSelectorName, option) {
    'use strict';

    //パラメータ初期値設定
    this.option = option || {};
    this.step = this.option.hasOwnProperty('step') ? option.step : 0;
    this.buttonPositionX = this.option.hasOwnProperty('buttonPositionX') ? option.buttonPositionX : 0;

    //DOM参照
    this.importSelectorName = importSelectorName;
    this.importSelector = document.querySelector(importSelectorName);

    //DOM挿入
    this.importSelector.innerHTML = SimpleScaleSlider.createSliderDom();

    //スライダー設定
    this.applyDraggaleParts('.resizeSlider_button', '.resizeSlider_rail');

    return this.importSelector;
};

/**
 *　レールオブジェクト
 *　
 *　@return { string } スライダDOM要素
 */
SimpleScaleSlider.createSliderDom = function () {
    'use strict';

    var domData = [];
    domData.push('<div class="resizeSlider">');
    domData.push('<div class="resizeSlider_rail"></div>');
    domData.push('<button class="resizeSlider_button"></button>');
    domData.push('</div>');
    return domData.join('');
};

/**
 *　スライダオブジェクト設定
 *
 * @param { string } importSelectorName 挿入するセレクタ名
 * @param { object } option オプション設定用データ群
 * @return { object } 挿入するセレクタのDOMオブジェクト
 */
SimpleScaleSlider.prototype.applyDraggaleParts = function (buttonObjectSelector, railObject) {
    this.slider = document.querySelector(this.importSelectorName + ' ' + railObject);
    this.buttonObject = document.querySelector(this.importSelectorName + ' ' + buttonObjectSelector);

    var slider = this.slider;
    var buttonObject = this.buttonObject;
    this.dragging = false;
    var oparatingWidth = this.slider.clientWidth - this.buttonObject.clientWidth;
    var value = oparatingWidth * this.buttonPositionX;
    var _this = this;
    var detail;


    function setPosition() {
        buttonObject.style.left = value + 'px';
    }
    setPosition();


    buttonObject.onmousedown = function (e) {
        _this.dragging = true;
        oparatingWidth = slider.clientWidth - buttonObject.clientWidth;
        detail = {
            percent: 100 * value / oparatingWidth
        };
        _this.settingCustomEvent(e, 'slideButtonDown', detail);
    };

    document.addEventListener('mouseup', function (e) {
        if (_this.dragging) {
            _this.dragging = false;
            oparatingWidth = slider.clientWidth - buttonObject.clientWidth;
            detail = {
                percent: 100 * value / oparatingWidth
            };
            _this.settingCustomEvent(e, 'slideButtonUp', detail);
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (_this.dragging) {
            if (!e) {
                e = window.event;
            }
            var left = e.clientX - _this.buttonObject.clientWidth / 2;
            var sliderPosX = slider.getBoundingClientRect().left;
            oparatingWidth = slider.clientWidth - buttonObject.clientWidth;
            value = Math.round(left - sliderPosX);
            value = _this.getScalePosition(value, oparatingWidth);
            buttonObject.style.left = value + 'px';
            detail = {
                percent: 100 * value / oparatingWidth
            };
            _this.settingCustomEvent(e, 'slideButtonMove', detail);
            return false;
        }
    });
};

/**
 *　スライダオブジェクト
 *
 * @param { object } currentValue ボタンオブジェクトの座標
 * @param { object } baseValue レールオブジェクトの長さ
 * @return { number } 補正した数値
 */
SimpleScaleSlider.prototype.getScalePosition = function (currentValue, baseValue) {
    var value = currentValue;
    if (value < 0) {
        value = 0;
    } else if (value > baseValue) {
        value = baseValue;
    }

    var step = this.step;
    if (step === 0) {
        return value;
    } else {
        var unit = baseValue / step;
        return Math.round(value / unit) * unit;
    }
};

/**
 *　カスタムイベント作成
 *
 * @param { object } eventObject ボタンオブジェクトの座標
 * @param { string } eventName レールオブジェクトの長さ
 * @param { object } detail イベント送出時に送るオブジェクトデータ
 */
SimpleScaleSlider.prototype.settingCustomEvent = function (eventObject, eventName, detail) {
    var event;
    try {
        event = new CustomEvent(eventName, {
            detail: detail
        });
    } catch (eventObject) {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('eventName', false, false, detail);
    }
    this.importSelector.dispatchEvent(event);
};
