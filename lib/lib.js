/*
 * lib.js
 * Created by 还有醋v on 2021/3/8.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

/**
 * 抽象了一个简单的GameObject
 */
class GameObject {

	id;     // 绑定的dom元素的id
	dom;    // 绑定的dom元素

	// 位置
	top = 0;
	left = 0;

	// 缩放
	scaleX = 1;
	scaleY = 1;

	// 旋转
	rotate = 0;

	/**
	 * 获得宽高
	 * @returns {{width: number, height: number}}
	 */
	get size() {
		return {
			width: this.dom.clientWidth,
			height: this.dom.clientHeight,
		}
	}

	constructor(id) {
		this.id = id;
		this.dom = document.getElementById(id); // 在构造函数中绑定dom元素
		this.dom.style.position = "absolute";
	}

	/**
	 * 抽离数据更新部分
	 */
	update() {

	}

	/**
	 * 抽离渲染部分
	 */
	render() {
		const { top, left, scaleX, scaleY, rotate } = this;

		this.dom.style.top = top + "px";
		this.dom.style.left = left + "px";
		this.dom.style.transform = `scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`;
	}

	/**
	 * 抽离销毁部分
	 */
	destroy() {

	}

}
