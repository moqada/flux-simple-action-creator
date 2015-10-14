/**
 * handleAction
 *
 * @param {Object} target target class prototype object
 * @param {string} name method name
 * @param {Object} descriptor target method's descriptor
 * @param {string|undefined} [actionType] action type
 * @return {Object}
 */
function handleAction(target, name, descriptor, actionType) {
  const type = actionType === undefined ? Symbol(name) : actionType;
  const types = target.constructor.types || {};
  types[name] = type;

  target.constructor.types = types;
  if (!target.types) {
    Object.defineProperty(target, 'types', {
      get() {
        return this.constructor.types;
      }
    });
  }

  const original = descriptor.value;
  return {
    ...descriptor,
    value(...args) {
      return original.apply(this, [type, ...args]);
    }
  };
}

/**
 * Decorator that register action type to ActionCreator
 *
 * @param {...Object|string|undefined} args decorator arguments
 * @return {Object|Function}
 *
 * @example
 * class SampleAction extends SimpleActionCreator {
 *
 *   // Register action type and insert arguments - Symbol
 *   @action
 *   method1(type, foo) {
 *     this.dispatch(type, {foo});
 *   }
 *
 *   // Register custom action types and insert arguments
 *   @action('foobarActionType')
 *   method2(type, bar) {
 *     this.dispatch(type, {bar});
 *   }
 * }
 *
 * // Action types can access through static variables.
 * SampleAction.types.method1;  // -> Symbol('method1')
 * SampleAction.types.method2;  // -> 'foobarActionType'
 *
 * // instance variables, too.
 * const ins = new SampleAction();
 * assert(ins.types.method1 === SampleAction.types.method1);
 * assert(ins.types.method2 === SampleAction.types.method2);
 *
 * // `type` arg is automatically inserted when execute method.
 * ins.method1('hoge');  // -> received arguments are: Symbol('method1'), 'hoge'
 * ins.method2('fuga');  // -> received arguments are: 'foobarActionType', 'fuga'
 */
export default function action(...args) {
  if (args.length === 1) {
    return (target, name, descriptor) => {
      return handleAction(target, name, descriptor, args[0]);
    };
  }
  return handleAction(...args);
}
