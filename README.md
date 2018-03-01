# simple_scale_slider

簡易スライダー

## Description
要素を指定して、その要素の中に簡易的なスライダーを作成することができます。
スライダーの位置を百分率で返します。

## Usage

CSSのリンク
```html
<link rel="stylesheet" href="css/simple_scale_slider.css">
```

スライダを設定する要素
```html
<div class="slider01"></div>
```

JavaScriptライブラリへのリンク
```html
<script src="js/simple_scale_slider.js"></script>
```

JavaScriptの設定
```JavaScript
    var resizeSlider = new SimpleScaleSlider('.slider01'); 
    
    resizeSlider.addEventListener('slideButtonMove',function(e){
        Console.log(e.detail.percent);
    });
```



## sample

<https://activefactor.github.io/simple_scale_slider/>
