/*
 * flppyBirdLib.js
 * Created by 还有醋v on 2021/3/10.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

/**
 * 抽象了一个简单的GameObject
 */
class GameObject {
	dom;    // 绑定的dom元素

	children = [];  // 子节点

	parent; // 父节点

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

	constructor(type = "div") {
		this.dom = document.createElement(type); // 基础GameObject为div，Sprite为img
		this.dom.style.position = "absolute";
	}

	/**
	 * 生命周期 start 加入显示列表执行此函数
	 */
	ready() {
	}

	/**
	 * 添加子节点
	 * @param child
	 */
	addChild(child) {

		// 如果是别人的子节点，则先移除再添加到自己下面
		if (child.parent) {
			child.parent.removeChild(child);
		}

		// 执行添加
		this.dom.appendChild(child.dom);
		this.children.push(child);
		child.parent = this;

		// 容错：防止子类重写的start不是async函数
		// TODO dom无法在节点不在渲染树的上的时候拿到clientWidth等属性，故将ready放在这里
		child.ready();

		return child;
	}

	/**
	 * 删除子节点
	 * @param child
	 */
	removeChild(child) {
		// 不是自己的子节点就提示错误
		if (child.parent !== this) {
			console.warn("移除的节点必须是其子集");
			return null;
		}

		// 执行销毁和移除
		child.destroy();
		this.dom.removeChild(child.dom);
		this.children.splice(this.children.indexOf(child), 1);
		child.parent = null;
		return child;
	}

	/**
	 * 抽离数据更新部分，并更新子节点
	 */
	update() {
		this.children.forEach((child) => {
			child.update();
		});
	}

	/**
	 * 抽离渲染部分，并渲染子节点
	 */
	render() {
		const { top, left, scaleX, scaleY, rotate } = this;

		this.dom.style.top = top + "px";
		this.dom.style.left = left + "px";
		this.dom.style.transform = `scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`;

		// 添加渲染子节点部分
		this.children.forEach((child) => {
			child.render();
		});
	}

	/**
	 * 抽离销毁部分
	 */
	destroy() {

	}
}


/**
 * 抽象精灵Sprite
 */
class Sprite extends GameObject {

	constructor(src = "") {
		super("img");

		this.dom.src = src;
	}

}

class GameStage extends GameObject {

	constructor() {
		super();
		document.body.appendChild(this.dom);
		this._gameStart();
		this.loop();
	}

	async _gameStart() {
		await this.reloadRes();
		this.ready();
	}

	/**
	 * 预加载资源
	 * @returns {Promise<void>}
	 */
	async reloadRes() {

	}

	/**
	 * 主循环
	 */
	loop = () => {
		requestAnimationFrame(this.loop);    // 循环调用requestAnimationFrame
		this.update();   // 先数据更新
		this.render();   // 后渲染更新
	}
}

/**
 * 异步加载图片方法
 * @param src 图片路径
 * @returns {Promise<HTMLImageElement | null>}
 */
function loadImgAsync(src) {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => {
			console.error(`加载资源${src}失败`);
			resolve(null);
		};
		img.src = src;
	});
}

/**
 * 一个简单的通用对象池
 */
class ObjectPool {

	static objs = {};

	static put(name, obj) {
		const pool = ObjectPool.objs[name] || (ObjectPool.objs[name] = []);

		pool.push(obj);
	}

	static get(name) {
		const pool = ObjectPool.objs[name] || (ObjectPool.objs[name] = []);

		if (pool.length <= 0) {
			return null;
		}

		return pool.shift();
	}
}
