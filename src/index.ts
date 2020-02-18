declare namespace Types {
  export namespace Command {
    export namespace Detached {
      export type Function<Args = Object> = ( argv: string[], args: Args ) => FunctionReturn
    }
    export type Function<Args = Object> = ( argv: Array<string>, ctx: Config, args: Args ) => FunctionReturn
    export type FunctionReturn = Promise<void> | void
    export namespace Option {
      export type Value = string | boolean | number
    }
    export interface Option<T = ( ctx: Config ) => Option.Value> {
      name: string
      description?: string
      parse?: ( val: string ) => any
      default?: Option.Value | T
    }
  }
  export interface Command<IsDetached extends boolean = false> {
    name: string
    description?: string
    options?: Command.Option<
      IsDetached extends true ? () => Command.Option.Value : ( ctx: Config ) => Command.Option.Value
    >[]
    detached?: IsDetached
    examples?: ( { desc: string, cmd: string } )[]
    pkg?: { name: string, version: string }
    func: IsDetached extends true ? Command.Detached.Function : Command.Function
  }
  export interface Config {
    commands?: Command[]
  }
}

export = Types
