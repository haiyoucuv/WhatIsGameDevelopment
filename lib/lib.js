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

	/**
	 * transform 表示显示对象的变换
	 * @type {{rotate: number, scale: {x: number, y: number}, position: {top: number, left: number}}}
	 */
	transform = {
		position: { top: 0, left: 0 },  // 位置
		scale: { x: 1, y: 1 },          // 缩放
		rotate: 0,                      // 旋转
	}

	constructor(id) {
		this.id = id;
		this.dom = document.getElementById(id); // 在构造函数中绑定dom元素
		this.dom.style.position = "absolute";
	}


	/**
	 * 获得宽高
	 * @returns {{width: number, height: number}}
	 */
	getSize() {
		return {
			width: this.dom.clientWidth,
			height: this.dom.clientHeight,
		}
	}


	/**
	 * 设置Position
	 * @param top
	 * @param left
	 */
	setPosition(top = this.transform.position.top, left = this.transform.position.left) {
		this.transform.position.top = top;
		this.transform.position.left = left;
	}

	/**
	 * 设置Scale
	 * @param x
	 * @param y
	 */
	setScale(x = this.transform.scale.x, y = this.transform.scale.y) {
		this.transform.scale.x = x;
		this.transform.scale.y = y;
	}

	/**
	 * 设置Rotate
	 * @param rotate
	 */
	setRotate(rotate = this.transform.rotate) {
		this.transform.rotate = rotate;
	}

	/**
	 * 获得Position
	 * @returns {{top: number, left: number}}
	 */
	getPosition() {
		return {
			top: this.transform.position.top,
			left: this.transform.position.left,
		}
	}

	/**
	 * 获得Scale
	 * @returns {{x: number, y: number}}
	 */
	getScale() {
		return {
			x: this.transform.scale.x,
			y: this.transform.scale.y,
		}
	}

	/**
	 * 获得Rotate
	 * @returns {number}
	 */
	getRotate() {
		return this.transform.rotate;
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
		const { top, left } = this.getPosition();
		const { x: scaleX, y: scaleY } = this.getScale();
		const rotate = this.getRotate();

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
