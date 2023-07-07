/**
 * 用户登录和注册验证的通用代码
 * 对某一个表单项进行验证的通用函数
 * @class FieldValidator
 */
class FieldValidator {
  /**
   * 构造器
   * @param {*} txtId 文本框的 Id
   * @param {*} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   * @memberof FieldValidator
   */
  constructor(txtId, validatorFunc) {
    this.input = $(`#${txtId}`);
    this.validatorFunc = validatorFunc;
    this.p = this.input.nextElementSibling;
    this.input.onblur = () => {
      this.validate()
    }
  }

  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }
  }

  /**
  * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
  * @param {FieldValidator[]} validators
  */
  static async validate(...validators) {
    const pomps = validators.map(item => item.validate());
    const result = await Promise.all(pomps);
    return result.every(item => item)
  }
}