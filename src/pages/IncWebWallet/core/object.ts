// Super Obejct
abstract class Object {}

// Super Action
interface Action {}

// Specific Method
interface AnyMethod extends Function {}

// Specific Method
interface Method extends Action, AnyMethod {
  feature: string;
}

export { Object };
export type { AnyMethod, Method };
